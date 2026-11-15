---
title: "Aggregation Framework: Advanced Data Analysis in MongoDB"
description: "How the MongoDB aggregation pipeline works: stages, the core operators, $lookup and $unwind, and a first pipeline you can run."
pubDate: 2024-07-08
tags: ["mongodb", "database", "backend", "nosql"]
---

The Aggregation Framework is the part of MongoDB that turns stored documents into analysis. You describe a sequence of processing steps and the server runs them over the collection, so the reduction happens next to the data rather than in your application. That makes it the tool for the questions a plain query cannot answer.

## What the Aggregation Framework Does

MongoDB's Aggregation Framework handles transformation and analysis that would otherwise be application code. It runs that complex data processing on the server, and it works like a set of pipes and filters: documents enter at one end and refined results leave at the other.

### The Aggregation Pipeline

The pipeline is the heart of the framework: an ordered series of stages that the data flows through. Each stage transforms what it receives and passes the result on, so the document that leaves the last stage carries the shape you asked for.

### A First Pipeline

A first pipeline that groups documents and counts them:

```js
db.collection.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } }
]);
```

The first stage filters on status with `$match`. The second groups what survives by category and counts the members of each group with `$group`.

### The Core Operators

These are the operators most pipelines are built from:

- **`$match`**: Filters documents, the way a query filter does.
- **`$group`**: Groups documents by a key and computes aggregates over each group.
- **`$sort`**: Orders the results.
- **`$project`**: Selects fields and reshapes them on the way out.

### Beyond the Basics

Aggregation handles harder shapes than filtering and counting:

- **`$lookup`**: Joins documents from another collection, which is how you combine data that lives apart.
- **`$unwind`**: Deconstructs an array field so that each element becomes its own document, which is what per-element analysis needs.

### Aggregation in Action

Say you have a collection of documents and you want the creatures they mention most frequently. The pipeline unwinds the mentions array with `$unwind`, groups the resulting documents by creature name with `$group`, and sorts by mention count with `$sort`. The top of that result is your answer.

### Conclusion: When to Reach for It

Aggregation pays off wherever the answer needs more than one pass over the data, whether that is counts per group, a join across collections or per-element analysis of an array. Once the pipeline stages are familiar, the analysis stays in the database and out of your application code.
