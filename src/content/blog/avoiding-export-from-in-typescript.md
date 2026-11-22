---
title: "Avoiding ‘export * from…’ in TypeScript"
description: "In TypeScript development, we always strive to improve the readability, maintainability, and long-term viability of our code."
pubDate: 2023-12-29
tags:
  - typescript
  - javascript
---

![](https://cdn-images-1.medium.com/max/800/0*35Fw67CJJL6TK_xM)

In TypeScript development, we always strive to improve the readability, maintainability, and long-term viability of our code. In this article, we will explore a best practice that you should consider adopting: avoiding the use of `export *` in your codebase. By understanding the drawbacks and alternatives, we can write cleaner and more maintainable TypeScript code. Let's dive in!

## The Pitfalls of `export *`

The `export *` syntax allows us to export multiple entities from a module in a single statement. While it may seem convenient at first, it can lead to several issues down the line:

## 1. Unintentional Exports

Using `export *` can inadvertently export symbols that you didn't intend to expose from your module. This can lead to namespace pollution and make it difficult to track the origin of exported entities. Consider the following example:

```
// animals.ts
export * from './dogs';
export * from './cats';
```

In this case, using `export *` to aggregate exports from `dogs.ts` and `cats.ts` can result in unintended exports that may conflict with other parts of your codebase.

## 2. Lack of Control and Visibility

With `export *`, you lose control over which entities are being exported and how they are accessed. It becomes challenging to explicitly define the public API of your module and provide clear documentation for consumers. This lack of control can lead to confusion and make it harder for other developers to understand and use your code.

## 3. Potential Circular Dependencies

Using `export *` can introduce circular dependencies between modules. When two or more modules mutually `export *` from each other, it creates a circular reference that can cause issues during compilation and runtime. These circular dependencies can be difficult to debug and can negatively impact the stability of your application.

## Alternatives to `export *`

To overcome the issues associated with `export *`, consider adopting these alternatives:

## 1. Explicitly Export Individual Entities

Rather than using `export *` to export all entities from a module, explicitly export each entity that you want to expose. This provides clear visibility into the module's public API and allows you to control what is accessible to consumers.

```
// animals.ts
export { Dog } from './dogs';
export { Cat } from './cats';
```

By explicitly exporting each entity, you have granular control over what is exposed and avoid unintended exports.

## 2. Use Barrel Files for Convenience

To simplify importing multiple entities from different modules, consider using barrel files. A barrel file acts as a central export point that re-exports entities from other modules, providing a more organized and convenient way to import them.

```
// dogs.ts
export class Dog { ... }

// cats.ts
export class Cat { ... }

// index.ts (barrel file)
export * from './dogs';
export * from './cats';
```

By using barrel files, you can maintain explicit exports while still offering a single import point for consumers.

## 3. Create Named Exports

Instead of relying solely on default exports or using `export *`, consider using named exports. Named exports allow you to export specific entities with meaningful names, making it easier for consumers to understand and import the desired functionality.

```
// animals.ts
export { Dog, Cat } from './animals';
```

With named exports, you provide clear visibility and granular control over what entities are available for import.

## Conclusion

By avoiding the use of `export *` in TypeScript, we can improve the maintainability and clarity of our code. Explicitly exporting individual entities, using barrel files, and leveraging named exports offer better control
over the public API, reduce namespace pollution, and mitigate circular dependencies.

And hey, if you enjoyed this dive into the world of Node.js and want more insights into product thinking and development, swing by [ProductThinkers.com](http://productthinkers.com/). It’s a treasure trove of ideas, tips, and tricks for the modern developer. See you there!

Until next time, happy coding, and may your data streams always flow smoothly and your pipes never leak! 🌊🔧🚀
