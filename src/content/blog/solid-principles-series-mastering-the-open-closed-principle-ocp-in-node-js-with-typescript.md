---
title: "SOLID Principles Series: Mastering the Open-Closed Principle (OCP) in Node.js with TypeScript"
description: "Welcome back to the “SOLID Principles Series,” where we’re unraveling the SOLID principles to help you write robust and maintainable code."
pubDate: 2023-12-28
tags:
  - solid
  - architecture
  - typescript
canonical: https://medium.com/@ruben.alapont/solid-principles-series-mastering-the-open-closed-principle-ocp-in-node-js-with-typescript-b346d3567191
---

Welcome back to the “SOLID Principles Series,” where we’re unraveling the SOLID principles to help you write robust and maintainable code. In this article, we’ll delve into the Open-Closed Principle (OCP) and demonstrate how to apply it effectively in Node.js using TypeScript.

## Understanding the Open-Closed Principle (OCP)

The Open-Closed Principle, represented by the “O” in SOLID, posits that software entities (classes, modules, functions, etc.) should be open for extension but closed for modification. In simpler terms, you should be able to add new functionality to existing code without altering its source.

## The Problem: Violating the Open-Closed Principle

To illustrate the violation of the OCP, let’s consider a complex e-commerce system. We have an `Order` class that handles various types of orders, including international orders. Here's the initial implementation:

```
class Order {
  constructor(private items: CartItem[]) {}

  calculateTotal() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }
}

class CartItem {
  constructor(public name: string, public price: number) {}
}
```

Now, imagine your application grows, and you need to introduce a discount system. Without adhering to the OCP, you might be tempted to modify the `Order` class:

```
class Order {
  constructor(private items: CartItem[], private discount: number = 0) {}

  calculateTotal() {
    const subtotal = this.items.reduce((total, item) => total + item.price, 0);
    return subtotal - subtotal * (this.discount / 100);
  }
}
```

By adding the `discount` property directly to the `Order` class, you've modified it and violated the OCP.

## The Solution: Applying the Open-Closed Principle

To follow the OCP, you should extend your code rather than modify it. Let’s create a new class, `DiscountedOrder`, which extends the `Order` class:

```
class DiscountedOrder extends Order {
  constructor(items: CartItem[], private discount: number) {
    super(items);
  }

  applyDiscount() {
    return this.calculateTotal() * (1 - this.discount / 100);
  }
}
```

Now, you have a `DiscountedOrder` class that inherits the behavior of the base `Order` class and includes the discount calculation. This adheres to the OCP.

## Benefits of Adhering to the OCP

By applying the Open-Closed Principle correctly in your Node.js and TypeScript projects, you gain several advantages:

1. **Stability**: Existing, tested code remains untouched, reducing the risk of introducing bugs when adding new features.
2. **Scalability**: You can easily expand your codebase with new functionality without affecting its core components.
3. **Maintainability**: Code that adheres to the OCP is more straightforward to maintain and extend over time.
4. **Reusability**: You can reuse existing classes and modules in different contexts, maximizing code reuse.

## Conclusion

The Open-Closed Principle (OCP) is a valuable guideline for writing adaptable and scalable software. Violating it by modifying existing code can lead to maintenance nightmares and unexpected bugs. Instead, extend your code to accommodate new functionality, as demonstrated in our e-commerce example.

In our next article, we’ll explore the “L” in SOLID: the Liskov Substitution Principle (LSP). Stay tuned to continue your journey toward writing SOLID code in Node.js with TypeScript.
