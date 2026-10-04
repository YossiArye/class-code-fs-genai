/*
=============================================================================
   DEMONSTRATION: SQL INDEX PERFORMANCE & MECHANICS
=============================================================================
   Goal: Compare query performance between a Full Table Scan and an Index Scan.

   PREREQUISITE:
   We need a large dataset. searching 1,000 rows is too fast for modern CPUs.
   We will generate approx 1,000,000 rows using the "Doubling" technique.
*/

-- 1. Setup: Create a clean table
DROP TABLE IF EXISTS huge_customers;

CREATE TABLE huge_customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    state VARCHAR(50)
);

-- 2. Seed: Insert a few initial rows
INSERT INTO huge_customers (name, state) VALUES
('Yossi', 'CA'), ('Danny', 'NY'), ('Dana', 'IL'), ('Roni', 'CA'), ('Gal', 'TX');

-- 3. Data Explosion: Double the data repeatedly
-- Run the following block about 18-20 times to reach ~1,000,000 rows.
-- (5 -> 10 -> 20 -> 40 -> ... -> 1,000,000+)
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;
INSERT INTO huge_customers (name, state) SELECT name, state FROM huge_customers;

-- Verify row count (Should be around 500k - 1.3M)
SELECT COUNT(*) FROM huge_customers;


/* =============================================================================
   IMPORTANT SETUP NOTE: WHY WE NEED A "RARE" VALUE
=============================================================================
   The "Doubling" technique only ever copies the table onto itself, so it
   PRESERVES the original proportions. We started with 5 rows containing
   CA, NY, IL, CA, TX -> that means after doubling to ~1.3M rows, 'NY' still
   matches roughly 1/5 of the whole table (~20%)!

   An index cannot make a query fast if the query still matches 20% of the
   table -- there is nothing to skip. To see a REAL improvement we need a
   value that matches only a tiny sliver of the data, so we hand-inject one:
*/

-- NOTE: we use ORDER BY + LIMIT rather than "WHERE id BETWEEN 1 AND 50".
-- InnoDB hands out AUTO_INCREMENT values in batches during bulk INSERT...SELECT,
-- so the id column has GAPS -- "BETWEEN 1 AND 50" would hit fewer than 50 rows.
UPDATE huge_customers SET state = 'WY' ORDER BY id LIMIT 50;

-- Now 'WY' matches only 50 rows out of ~1,300,000 (about 0.004% of the table),
-- while 'NY' still matches roughly 20% of the table. We'll compare both.


/* =============================================================================
   TEST 1: QUERY WITHOUT INDEX (The "Slow" Way)
=============================================================================
*/

-- 1A. Low-selectivity query (matches ~20% of the table)
SELECT * FROM huge_customers WHERE state = 'NY';
EXPLAIN SELECT * FROM huge_customers WHERE state = 'NY';

-- 1B. High-selectivity query (matches ~0.004% of the table)
SELECT * FROM huge_customers WHERE state = 'WY';
EXPLAIN SELECT * FROM huge_customers WHERE state = 'WY';

/* --- EXPLANATION: DURATION vs. FETCH (READ THIS CAREFULLY!) ---

   Workbench shows two separate time metrics, and confusing them is the #1
   reason this demo "looks broken".

   1. Duration (Execution Time):
      - How long the SERVER worked to execute the statement.
      - Without an index this is a "Full Table Scan": read row #1, check the
        condition, read row #2 ... all the way to row #1,300,000.

   2. Fetch (Network/Transport Time):
      - How long it took to ship the result rows from the server to Workbench.
      - This tracks the NUMBER OF ROWS RETURNED, not how hard they were to
        find. Indexes do not improve it.

   --- THE TRAP: MySQL STREAMS RESULTS ---

   Typical numbers you will actually see in Test 1 (both are full scans):

      state = 'NY'  -> 262,136 rows   Duration 0.0055 sec   Fetch 0.264   sec
      state = 'WY'  ->      50 rows   Duration 0.243  sec   Fetch 0.00003 sec

   Why is the Duration INVERTED from what you'd expect?

   - For 'NY', row #2 of the table is already a match, so the server streams
     the first batch back immediately -> Duration looks tiny. The real scanning
     work happens WHILE Workbench downloads rows, so it hides inside Fetch.

   - For 'WY', the server cannot return anything until it has scanned the WHOLE
     table to be certain it found every match -> the full-scan cost shows up
     honestly in Duration, and Fetch is ~0 because only 50 rows travel back.

   CONCLUSION: to measure what the SEARCH costs, watch the 'WY' query's
   DURATION. That is the number the index is about to destroy.
*/


/* =============================================================================
   CREATE THE INDEX
=============================================================================
*/

CREATE INDEX idx_state ON huge_customers(state);

/*
   --- EXPLANATION: HOW THE INDEX WORKS INTERNALLY ---

   1. The B-Tree Structure:
      MySQL creates a separate data structure (usually a B-Tree).
      Think of it like the index at the back of a textbook. It is a sorted list.

   2. Sorted Data:
      Inside the index, the states are stored alphabetically:
      'CA', 'CA', 'CA' ... 'IL' ... 'NY', 'NY' ... 'TX' ... 'WY'

   3. Binary Search (O(log n)):
      Because the data is sorted, MySQL doesn't check every row.
      It jumps to the middle. Is the target higher or lower?
      It jumps to the middle of the remaining half.

      To find a record in 1,300,000 rows:
      - Without Index: Up to 1,300,000 checks.
      - With Index: Approx 21 checks (2^21 > 1,300,000).

   4. Pointers:
      The index contains the value (e.g. 'WY') and a pointer (Primary Key ID)
      to the actual row in the table. Once it finds the value in the index,
      it grabs the specific rows immediately.

   5. SELECTIVITY -- the part that matters most in practice:
      Finding the STARTING point in the B-Tree is always ~21 fast jumps.
      But once found, MySQL still has to fetch every matching row, and for a
      non-covering index (like this one) each fetch is a separate random-access
      lookup back into the table.
      - For 'WY' (50 matches): ~21 jumps + 50 cheap lookups -> huge win.
      - For 'NY' (~260,000 matches): ~21 jumps + 260,000 random lookups
        -> can be AS SLOW OR SLOWER than just reading the table in order!
      This is why the optimizer (and EXPLAIN's "rows" estimate) may still
      choose a full scan, or use the index and see little/no benefit, for
      low-selectivity conditions.
*/


/* =============================================================================
   TEST 2: QUERY WITH INDEX (The "Fast" Way -- when selectivity is good)
=============================================================================
*/

-- 2A. Low-selectivity query again (still ~20% of the table)
SELECT * FROM huge_customers WHERE state = 'NY';
EXPLAIN SELECT * FROM huge_customers WHERE state = 'NY';

-- 2B. High-selectivity query again (still only 50 rows)
SELECT * FROM huge_customers WHERE state = 'WY';
EXPLAIN SELECT * FROM huge_customers WHERE state = 'WY';

/*
   --- EXPECTED RESULT ---

   2A ('NY', ~20% of table): Duration stays roughly the SAME as Test 1 --
      sometimes even a touch worse. This is expected and is the whole point:
      indexing a low-selectivity condition doesn't help.

   2B ('WY', ~0.004% of table): THIS IS THE MONEY SHOT. Duration should
      collapse from ~0.243 sec down to ~0.000x sec -- instead of scanning
      ~1.3M rows, the engine jumped straight to the 'WY' section of the
      B-Tree and grabbed 50 rows. EXPLAIN flips from "Table scan" to an
      index lookup on idx_state.

   Fetch time in both cases stays about the same as Test 1 (same row counts) --
   indexes don't change how much data has to travel over the network.

   RULE OF THUMB: an index helps when a query filters out MOST of the table.
   If a WHERE clause still matches a large chunk of the rows (rough rule:
   more than ~10-15%), a full table scan is often just as fast, or faster.
*/

-- Cleanup (Optional)
-- DROP TABLE huge_customers;


/*
   =============================================================================
   MASTER CLASS: WHY B-TREE INDEXING IS FAST?
   =============================================================================

   PART 1: THE STRUCTURE (HEIGHT MATTERS)
   -----------------------------------------------------------------------------
   In Computer Science, we talk about O(log N). But in Databases, the BASE
   of the log is what determines speed.

   Scenario: Searching 1,000,000 rows (N=1,000,000).

   A. Standard Binary Tree (Base 2)
      - Splits into 2 branches.
      - Height = log2(1,000,000) approx 20 levels.
      - Result: You need ~20 Disk Jumps to find data.

            [Root]
             /  \
           [N]  [N]   <-- 20 Levels Deep! (High I/O cost)
           / \  / \
         [N][N][N][N]
          .  .  .  .

   B. B-Tree Index (Base ~1,000)
      - Splits into ~1,000 branches (The tree is "Fat").
      - Height = log1000(1,000,000) = 2 levels.
      - Result: You need only 2 Disk Jumps.

            [ ROOT: 1,000 Pointers ]
           /      |       |      \
       [Page]  [Page]  [Page]  [Page]  <-- Only 2 Levels Deep!
          |
       [DATA]


   PART 2: THE MATHEMATICAL SECRET (CPU vs. DISK)
   -----------------------------------------------------------------------------
   You might ask: "If we search 1,000 items inside the Node, isn't that slow?"

   The Math:
   Total CPU Work = log2(B) + log2(N/B) = log2(N)

   This proves that the TOTAL CPU COMPARISONS are exactly the same (~20 ops)
   for both Binary Trees and B-Trees!

   The Difference is "Batching":

   1. Binary Tree approach:
      [Jump to Disk] -> [Compare 1 item] -> [Jump to Disk] -> [Compare 1 item]...
      (Repeats 20 times. 20 expensive IO operations).

   2. B-Tree approach:
      [Jump to Disk] -> [Compare 10 items in RAM] -> [Jump to Disk] -> [Compare 10 items in RAM]
      (Repeats only 2 times. 2 expensive IO operations).

   CONCLUSION:
   We prefer the CPU to work harder in RAM (which is free/fast)
   to save us from going to the Disk (which is expensive/slow).

   PART 3: THE CATCH -- SELECTIVITY
   -----------------------------------------------------------------------------
   Everything above describes finding the STARTING POINT of a match. It says
   nothing about how many matching rows you then have to fetch.

   - A highly selective condition (few matching rows) fetches only a handful
     of rows after that fast B-Tree lookup -> the index wins big (see 'WY' above).
   - A low-selectivity condition (many matching rows, e.g. 20% of the table)
     still needs to fetch hundreds of thousands of rows one by one via random
     lookups -> the "savings" from the fast B-Tree lookup are wiped out, and
     a plain sequential full scan can win instead (see 'NY' above).
   =============================================================================
*/
