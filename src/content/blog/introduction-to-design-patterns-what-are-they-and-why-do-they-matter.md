---
title: "Introduction to Design Patterns: What Are They and Why Do They Matter?"
description: "What a design pattern actually is, where the Gang of Four catalogue came from, and how to tell when a pattern earns its place in your code."
pubDate: 2024-10-01
tags: ["patterns", "design", "architecture", "javascript"]
---

## Gangs of Four: Introduction to Design Patterns – What Are They and Why Do They Matter?

![](/images/blog/introduction-to-design-patterns-what-are-they-and-why-do-they-matter/image-1.jpg)

Every project reaches the point where the code no longer fits in your head. You know what it does, you cannot explain why it is arranged that way, and the next change means touching four files that have nothing to do with each other. Patterns are the vocabulary for that problem, and this article covers what they are and when they are worth reaching for.

### What We’ll Cover:

- 👾 **What are design patterns, and why should you care?**
- 🧠 **A brief history of design patterns: The Gangs of Four**
- 🛠 **How design patterns simplify complex problems**
- 🚦 **When to use design patterns (and when not to!)**
- 📚 **Some of the most popular design patterns in action**

### What Are Design Patterns, and Why Should You Care? 🤔

A **design pattern** is a reusable solution to a recurring problem in software design. Not a library and not a piece of code you import: a description of how to arrange objects and responsibilities so the problem stops reappearing in a new shape.

The reason to care is scale. Small projects survive without structure because you can hold the whole thing in your head. Once several people work on the same code, the arrangement matters more than any single function, and patterns are the names that arrangement already has.

They also make a conversation shorter. Instead of describing a restructuring from scratch, you can say "we need an Observer here" and the other person knows what moves and what stays.

### A Brief History of Design Patterns: The Gangs of Four 🧑‍🤝‍🧑

The **Gang of Four** is four software engineers — **Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides** — who wrote the book that made patterns a discipline.

_"Design Patterns: Elements of Reusable Object-Oriented Software,"_ published in 1994, catalogued 23 patterns in three groups:

1. **Creational Patterns**: How objects are created
2. **Structural Patterns**: How objects are composed
3. **Behavioral Patterns**: How objects communicate

The catalogue gave developers a shared set of names, which is most of why it lasted: the patterns were not new, the naming was.

### How Design Patterns Simplify Complex Problems 🛠

Take a large application without structure. You get duplicated logic, components that cannot be tested alone, and behaviour scattered across the codebase in ways nobody can trace.

The **Singleton Pattern** is a small example of a pattern solving one specific problem: a class with exactly one instance and one point of access to it. That is what you want for a database connection or a logging mechanism, and what you do not want is that object being constructed again somewhere else.

The **Factory Pattern** solves a different one: object creation moves into a factory, so the code that needs an object does not have to know which class to construct.

The saving is not cleverness. It is that both problems have been solved before, in public, with the arguments already had.

### When to Use Design Patterns (And When Not To!) 🚦

Patterns are tools, and a tool applied where it does not fit makes the code worse by adding indirection to a problem that had none.

**Use design patterns when:**

- You encounter a **recurring problem** in your code that a pattern can solve.
- Your code is growing in complexity, and you need a clear structure.
- You’re working in a team where consistent coding practices are important.

**Don’t use design patterns when:**

- Your problem is so specific that no pattern truly fits.
- You’re writing small, simple code that doesn’t need the added complexity.
- You’re just using a pattern for the sake of it—patterns are tools, not rules!

### Popular Design Patterns in Action 📚

Four that come up constantly.

### 1. **The Singleton Pattern**

One instance, one access point. A single connection pool or a single logger, and no second copy created by accident.

### 2. **The Observer Pattern**

One object holds a list of listeners and notifies them when its state changes. Event emitters and subscription models are this pattern with different names.

### 3. **The Strategy Pattern**

A family of algorithms behind one interface, chosen at runtime. The caller picks a strategy; the calling code does not branch on which one it got.

### 4. **The Factory Method Pattern**

An interface for creating an object, with the concrete type decided by the implementation. The code that uses the object does not name the class it constructs.

### Wrapping Up: Why Design Patterns Matter 🎉

A pattern is worth its indirection when the problem it names is the problem you have. Learn the catalogue, use the names in conversation, and apply one where a second occurrence shows up rather than where it might.

_If you enjoyed this article and want to support my work, feel free to buy me a coffee! You can find me here: _[_buymeacoffee.com/rubenalap_](http://buymeacoffee.com/rubenalap)_._ ☕
