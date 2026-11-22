---
title: "SOLID Principles Series: The Dependency Inversion Principle (DIP) in TypeScript"
description: "Welcome back to our exploration of SOLID principles in TypeScript."
pubDate: 2024-01-09
tags:
  - solid
  - architecture
  - typescript
canonical: https://medium.com/@ruben.alapont/solid-principles-series-the-dependency-inversion-principle-dip-in-typescript-424a9cb0820e
---

Welcome back to our exploration of SOLID principles in TypeScript. In this article, we’ll delve into the Dependency Inversion Principle (DIP) and discover how it can lead us to write flexible and maintainable code.

## Understanding the Dependency Inversion Principle (DIP)

The Dependency Inversion Principle is the final principle in the SOLID acronym, and it focuses on the relationships between high-level modules and low-level modules. DIP states that high-level modules should not depend on low-level modules. Both should depend on abstractions. In addition, abstractions should not depend on details, but details should depend on abstractions.

In simpler terms, DIP encourages us to design our systems in a way that reduces coupling between different parts of our codebase, making it more adaptable to change.

## The Problem: High Coupling and Rigidity

Let’s start with a common problem: tightly coupled code. Consider a scenario where we have a `LightBulb` class and a `Switch` class in TypeScript:

```
class LightBulb {
  turnOn() {
    // Implementation for turning on the light bulb
  }

  turnOff() {
    // Implementation for turning off the light bulb
  }
}

class Switch {
  private bulb: LightBulb;

  constructor() {
    this.bulb = new LightBulb();
  }

  operate() {
    // Operate the switch to turn the light on or off
    this.bulb.turnOn();
  }
}
```

In this code, the `Switch` class directly depends on the `LightBulb` class. If we ever wanted to change or extend the behavior of the `Switch`, we'd have to modify the `Switch` class directly, leading to rigid and inflexible code.

## The Solution: Embracing the Dependency Inversion Principle

To embrace the Dependency Inversion Principle, we need to invert the dependencies. Instead of the `Switch` depending on the concrete `LightBulb` class, it should depend on an abstraction or interface. This way, the high-level module (`Switch`) won't be tightly coupled to the low-level module (`LightBulb`).

Let’s refactor our code to apply DIP:

```
interface Switchable {
  turnOn(): void;
  turnOff(): void;
}

class LightBulb implements Switchable {
  turnOn() {
    // Implementation for turning on the light bulb
  }

  turnOff() {
    // Implementation for turning off the light bulb
  }
}

class Switch {
  private device: Switchable;

  constructor(device: Switchable) {
    this.device = device;
  }

  operate() {
    // Operate the switch to turn the device on or off
    this.device.turnOn();
  }
}
```

In this refactored code, we’ve introduced the `Switchable` interface, which defines the behavior expected from any device that can be switched on or off. Both the `LightBulb` and the `Switch` now depend on this abstraction.

This adheres to the Dependency Inversion Principle, as high-level modules (like `Switch`) depend on abstractions (like `Switchable`) rather than concrete implementations (like `LightBulb`). Now, if we want to introduce a new switchable device, we can do so without modifying the `Switch` class, promoting code extensibility and maintainability.

## Benefits of Embracing the Dependency Inversion Principle

Embracing the DIP in your TypeScript projects offers several advantages:

1. **Reduced Coupling**: By depending on abstractions, you reduce the coupling between different parts of your codebase, making it easier to change or extend functionality.
2. **Code Extensibility**: You can introduce new implementations of abstractions without modifying existing high-level modules, promoting code extensibility.
3. **Ease of Testing**: Dependency injection becomes straightforward, making it easier to test components in isolation.
4. **Improved Collaboration**: Teams can work on different parts of the codebase without stepping on each other’s toes.

## Conclusion

The Dependency Inversion Principle (DIP) is a crucial principle in SOLID that advocates for loosely coupled, flexible, and maintainable code. By adhering to DIP, you can significantly improve the quality and longevity of your TypeScript projects.

In the next article of our SOLID Principles Series, we’ll explore real-world examples of SOLID principles in action, demonstrating how they lead to robust and adaptable software. Stay tuned for more insights!
