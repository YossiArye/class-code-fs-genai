# Homework — SQL (SELECT, JOIN, UNION, INSERT, UPDATE, Aggregate Functions)

> Based on: /Users/yossiarye/workspace/full-stack-lectures/14-SQL

---

## Exercise 1 — Top priced books
**Type:** Write

You have a `books` table with columns: `book_id, title, author, price, published_year, genre`.

Write a query that:
1. Selects `title`, `author`, and `price`
2. Only for books where `price` is **between** 20 and 50
3. Ordered by `price`, highest first
4. Showing only the top 5 results

```sql
-- your query here
```

---

## Exercise 2 — Predict the join result
**Type:** Predict

Here are two small tables:

**members**

| member_id | first_name |
|---|---|
| 1 | Dana |
| 2 | Omer |
| 3 | Liat |

**loans**

| loan_id | member_id | book_id |
|---|---|---|
| 100 | 1 | 7 |
| 101 | 1 | 9 |
| 102 | 3 | 7 |

Given this query:

```sql
select m.first_name, l.loan_id, l.book_id
from members m
join loans l
	on m.member_id = l.member_id;
```

Write out exactly what rows will be returned (how many rows, and their values). Which member does **not** appear in the result, and why?

---

## Exercise 3 — Fix the bug
**Type:** Fix

This query is supposed to list every loan together with the book's title, but it throws an error. Find the bug and fix it.

```sql
select loan_id, book_id, title
from loans
join books
	on book_id = book_id;
```

---

## Exercise 4 — Fill in the blanks
**Type:** Fill

Complete this `UPDATE` statement so it raises the price of the book with `book_id = 3` by 10% (i.e. multiplies the current price by 1.1).

```sql
update books
set price = ??? -- ???
where ???;
```

---

## Exercise 5 — Loan statistics
**Type:** Write

Using the `loans` table (`loan_id, member_id, book_id, loan_date, return_date`), write a single query that returns:
- the total number of loan records (`count(*)`)
- the number of **distinct** members who took a loan
- the number of loans that have **not** been returned yet (`return_date` is `null`) — hint: you'll need a `count()` on a column that is `null` for those rows, or a `where` clause, depending on how you choose to solve it

```sql
-- your query here
```
