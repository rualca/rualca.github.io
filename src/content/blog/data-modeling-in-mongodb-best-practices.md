---
title: "Data Modeling in MongoDB: Best Practices"
description: "Embed or reference each relationship, duplicate data only where reads justify it, keep indexes few, and let document validation enforce the shape."
pubDate: 2024-07-06
tags: ["mongodb", "database", "backend", "nosql"]
---

MongoDB does not require a schema, which means the model is a decision you make rather than something the database enforces for you. Most of those decisions come down to one question: which data lives inside a document, and which lives somewhere else with a pointer to it.

## The Art and Science of Data Modeling in MongoDB

There is no single correct model, only one that fits how the application reads and writes. The five points below are the ones that decide most of it.

### 1. To Embed or to Reference? That Is the Question

The first decision is whether related data sits inside the parent document or in its own collection with a reference.

- **Embedding**: works when the data is read together with its parent and does not change often. One read returns the whole document.

```json
{
  "name": "William Shakespeare",
  "plays": [
    { "title": "Hamlet", "year": 1600 },
    { "title": "Macbeth", "year": 1606 }
  ]
}
```

- **Referencing**: works when the related data is large, changes independently, or is read on its own. Each document stays small and the reference is resolved with a second query or a lookup.

```json
// Author document
{
  "name": "William Shakespeare"
}

// Separate Play documents
{
  "author_id": "Shakespeare's ID",
  "title": "Hamlet",
  "year": 1600
}
```

### 2. Think Big, But Start Small

Model the features you have. A schema that anticipates every future requirement usually carries fields nothing reads, and each one costs storage and makes writes more awkward. Extending a document later is cheap in MongoDB; carrying dead weight is not.

### 3. Normalize for Power, Denormalize for Speed

Normalization removes duplication and the inconsistency that comes with it. Denormalization copies data so a read needs fewer documents. The trade is fixed: copies are faster to read and must be kept in sync on every write.

### 4. Index Smartly: The Keys to the Kingdom

An index decides whether a query scans a collection or jumps to the matching documents. It also adds a structure to maintain on every write, so the count stays low and targeted at the queries the application actually runs.

### 5. Embrace the Power of Document Validation

MongoDB can enforce part of your model at the database level, instead of trusting every code path that writes.

```js
db.createCollection("plays", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "year"],
      properties: {
        title: {
          bsonType: "string",
          description: "must be a string and is required"
        },
        year: {
          bsonType: "int",
          minimum: 1500,
          description: "must be an integer and is required"
        }
      }
    }
  }
});
```

Documents that do not match are rejected on insert, which turns a schema decision into a rule the server enforces.

### Conclusion: Crafting Masterpieces with MongoDB

A data model in MongoDB is judged by the queries it serves. Decide embed or reference per relationship, duplicate only where the read justifies keeping two copies, and let validation hold the shape that the rest of the model assumes.
