---
title: "Indexing in MongoDB: Speeding Up Your Searches"
description: "How MongoDB indexes cut query time, when to add one, and what each index costs you on writes."
pubDate: 2024-07-10
tags: ["mongodb", "database", "backend", "nosql"]
---

Without an index, MongoDB reads every document in the collection to answer a query. On a collection of a few thousand records that is invisible; on a few million it is the difference between a fast endpoint and a timeout. An index is the structure that lets the server jump to the matching documents instead of walking the whole collection.

## The Need for Speed: Why Index Matters

A query that has no supporting index is a collection scan. The server still returns the right answer, it just gets there the slow way, and the cost grows with the collection rather than with the size of the result. Adding the right index turns that scan into a lookup.

### Crafting Your First Index: The Basics

A single-field index is the starting point. This creates one on `fieldName`:

```js
db.collection.createIndex({ fieldName: 1 });
```

The `1` is the sort order for the index. If a query sorts the other way, `-1` builds a descending index instead.

### Multi-Field Indexes: The Art of Combination

Some queries filter on more than one field. A compound index covers both in one structure:

```js
db.collection.createIndex({ fieldOne: 1, fieldTwo: -1 });
```

The field order matters. The index is usable as a prefix: queries on `fieldOne` alone can use it, queries on `fieldTwo` alone cannot. Put the field you filter on most, or the one with the highest cardinality, first.

### The Text Index: Searching Inside Strings

When the query is about the words inside a document rather than an exact value, a text index is the tool:

```js
db.collection.createIndex({ textField: "text" });
```

With that in place, `$text` queries match across the indexed field instead of running a regular expression over every document.

### What an Index Costs

Every index is a second copy of part of your data. It takes disk space and memory, and every write has to update it, so an insert that touches five indexes does five extra writes. Read speed goes up and write speed comes down; the skill is deciding which trade matters for a given collection.

### Index Maintenance: Keeping Your Indexes in Check

Indexes accumulate. Ones that were added for a query nobody runs any more keep costing writes. `db.collection.getIndexes()` lists what exists and `db.collection.dropIndex()` removes one that is no longer earning its keep. Going through that list periodically is cheaper than discovering at scale that half of it is dead weight.

### Where to Look Next

Run `explain()` on the queries that matter and read the plan: it tells you whether an index was used and how many documents the server had to examine. That number, not intuition, is what says whether indexing is still the problem.
