---
title: "Tactical Design Patterns in DDD: Modeling Complex Domains Effectively"
description: "Welcome back to our Domain-Driven Design series."
pubDate: 2024-02-02
tags:
  - ddd
  - architecture
  - patterns
canonical: https://medium.com/@ruben.alapont/tactical-design-patterns-in-ddd-modeling-complex-domains-effectively-60ce1a044cdf
---

Welcome back to our Domain-Driven Design (DDD) series. In this article, we’ll dive into the tactical side of DDD by exploring design patterns that help us model complex domains effectively. If you missed our earlier articles, we introduced you to DDD’s core concepts and discussed strategic design principles. Now, let’s get tactical!

## Entities, Value Objects, and Aggregates

At the heart of DDD’s tactical design are three fundamental building blocks: Entities, Value Objects, and Aggregates. These concepts provide us with powerful tools to represent and organize domain logic.

## 1. Entities

Entities are objects with a distinct identity that runs through time and different states. Think of them as nouns in your domain. Entities are often the most critical elements within your domain model. They have a lifecycle and can change over time while preserving their identity.

For example, in an e-commerce system, a “Customer” can be an Entity. Customers have a unique identity (e.g., a customer ID), and their data, such as name and contact details, can change without changing their identity.

```
class Customer {
  constructor(public id: string, public name: string, public email: string) {}
}
```

## 2. Value Objects

Value Objects, on the other hand, are objects without a distinct identity. They derive their equality from their attributes. Value Objects represent concepts like dates, money, addresses, and more. They are immutable, meaning their attributes cannot change once set.

For instance, a “Money” Value Object can be defined as follows:

```
class Money {
  constructor(public amount: number, public currency: string) {}

  // Other methods for arithmetic operations, conversions, etc.
}
```

Value Objects are ideal for modeling parts of your domain where identity doesn’t matter, and you need to ensure immutability and consistency.

## 3. Aggregates

Aggregates are clusters of related Entities and Value Objects treated as a single unit. They ensure transactional consistency within a part of your domain. An Aggregate has an Aggregate Root, which is the primary entry point and the only member accessible from outside the Aggregate.

Consider an e-commerce system with Orders and Order Items. An “Order” Aggregate could include the Order Entity as the Aggregate Root and related Order Items as Entities or Value Objects.

```
class Order {
  private items: OrderItem[] = [];

  constructor(public id: string, public customerId: string) {}

  addItem(product: Product, quantity: number) {
    // Business logic for adding items
  }

  // Other methods for order operations
}

class OrderItem {
  constructor(public productId: string, public quantity: number) {}
}
```

By using Aggregates, you ensure that changes to related domain objects within the Aggregate are consistent and atomic.

## When to Use Which?

Choosing between Entities, Value Objects, and Aggregates depends on your domain’s needs:

- Use **Entities** for objects with a distinct identity that changes over time.
- Use **Value Objects** for concepts without identity where immutability and consistency are essential.
- Use **Aggregates** to group related objects and enforce transactional consistency.

In complex domains, you’ll often find a mix of these building blocks. The key is to understand your domain deeply and model it in a way that reflects its intricacies.

In the next article, we’ll explore the Repository and Unit of Work patterns, which help manage domain objects and transactions seamlessly.

Stay tuned for more tactical insights into DDD!
