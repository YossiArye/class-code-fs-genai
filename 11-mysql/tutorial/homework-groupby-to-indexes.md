# Homework — SQL (GROUP BY, Subqueries, Views, DDL, Indexes)

> Based on: 8-group-by.sql, 9-subqueries.sql, 10-views.sql, 11-ddl.sql, 12-indexes.sql

---

## Exercise 1 — Vet clinic spending by state and species
**Type:** Write

You have three tables:
- `owners(owner_id, name, city, state)`
- `pets(pet_id, owner_id, name, species)`
- `visits(visit_id, pet_id, vet_id, visit_date, cost)`

Write a query that:
1. Joins `visits` to `pets` to `owners`
2. Groups the results by `state` and `species`
3. Shows the total cost (`SUM`) and number of visits (`COUNT`) per group
4. Keeps only the groups where total cost is greater than `500` **and** the visit count is greater than `3`

Remember: any column used in `HAVING` that isn't an aggregate must also appear in your `SELECT` list.

```sql
-- your query here
```

---

## Exercise 2 — Predict the result
**Type:** Predict

Here is a small `visits` table:

| visit_id | cost |
|---|---|
| 1 | 80 |
| 2 | 220 |
| 3 | 150 |
| 4 | 300 |
| 5 | 50 |

And this query:

```sql
SELECT visit_id, cost
FROM visits
WHERE cost > (SELECT AVG(cost) FROM visits);
```

Which `visit_id` values does this query return? Show your work — what is the value of the scalar subquery, and which rows pass the `WHERE` condition?

---

## Exercise 3 — Fix the bug
**Type:** Fix

This DDL script has **two** bugs — one is a keyword typo, the other is a constraint conflict just like the one called out in the lesson ("You have defined a SET NULL condition though some of the columns are defined as NOT NULL"). Find and fix both so the script runs.

```sql
CREATE TABLE IF NOT EXISTS vets (
    vet_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS visits (
    visit_id INT PRIMARY KEY,
    vet_id INT NOT NULL,
    cost INT NOT NULL DEFAULT 0,
    FOREIGN KEY (vet_id)
        REFERENCE vets (vet_id)
        ON UPDATE CASCADE ON DELETE SET NULL
);
```

---

## Exercise 4 — Fill in the blanks
**Type:** Fill

Complete this view so that it shows every visit's `cost`, the `average` cost across **all** visits, and the `diff` between the two — reusing the `average` alias inside the same `SELECT`, exactly like the lesson's `invoices_summary` view did.

```sql
CREATE OR REPLACE VIEW visits_summary AS
    SELECT
        visit_id,
        cost,
        (SELECT
                // ???
            FROM
                visits) AS average,
        (cost - (SELECT // ???)) AS diff
    FROM
        // ???;
```

---

## Exercise 5 — Owners with expensive visits
**Type:** Write

Using `owners`, `pets`, and `visits` (schema above), write a query using `EXISTS` (not `IN`) that returns the `owner_id` of every owner who has **at least one** pet with a visit costing more than `300`. Use a correlated subquery that references the outer `owners` row by its `owner_id` — the same pattern the lesson used with `client_id = c.client_id`.

```sql
-- your query here
```

**Bonus (one sentence):** if `pet_id` in `visits` only has a handful of distinct values relative to the table's total row count, would adding an index on `pet_id` make this query meaningfully faster? Why or why not?
