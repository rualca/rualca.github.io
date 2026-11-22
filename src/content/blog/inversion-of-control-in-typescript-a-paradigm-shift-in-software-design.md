---
title: "Inversion of Control in TypeScript: A Paradigm Shift in Software Design"
description: "In this article, we will explore the concept of Inversion of Control and how it can benefit our TypeScript projects."
pubDate: 2024-01-04
tags:
  - typescript
  - javascript
canonical: https://medium.com/@ruben.alapont/inversion-of-control-in-typescript-a-paradigm-shift-in-software-design-d86b4ffd5dd1
---

In this article, we will explore the concept of Inversion of Control (IoC) and how it can benefit our TypeScript projects.

## What is Inversion of Control?

Inversion of Control is a design principle that promotes decoupling of components and shifting the control of dependencies from the consumer to an external entity. Instead of explicitly creating and managing dependencies within a component, the responsibility is delegated to a framework, container, or a higher-level component.

By applying IoC, we improve the extensibility and flexibility of our codebase, making it easier to introduce new features, modify existing behavior, and test our components in isolation.

## Dependency Injection as an IoC Technique

Dependency Injection (DI) is a popular technique used to implement IoC. It involves providing the dependencies of a component from an external source, rather than having the component create them itself.

Consider the following example:

```
class Logger {
  log(message: string) {
    console.log(`[INFO]: ${message}`);
  }
}

class UserService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
    // Logic for creating the user...
  }
}

// Creating instances manually
const logger = new Logger();
const userService = new UserService(logger);

userService.createUser('John Doe');
```

In this example, the `UserService` class depends on the `Logger` class. Without applying IoC, the `UserService` creates its own instance of `Logger`. However, by using DI, we can invert the control and provide the `Logger` instance from the outside, making the `UserService` more flexible and testable.

## Using an IoC Container

In larger applications, managing dependencies manually can become cumbersome. This is where an IoC container comes into play. An IoC container is responsible for creating and managing instances of classes and resolving their dependencies.

Here’s an example using the popular `InversifyJS` library as our IoC container:

```
import { injectable, inject, Container } from 'inversify';

@injectable()
class Logger {
  log(message: string) {
    console.log(`[INFO]: ${message}`);
  }
}

@injectable()
class UserService {
  private logger: Logger;

  constructor(@inject(Logger) logger: Logger) {
    this.logger = logger;
  }

  createUser(name: string) {
    this.logger.log(`Creating user: ${name}`);
    // Logic for creating the user...
  }
}

// Creating instances using an IoC container
const container = new Container();

container.bind<Logger>(Logger).to(Logger);
container.bind<UserService>(UserService).to(UserService);

const userService = container.get<UserService>(UserService);

userService.createUser('John Doe');
```

In this example, we define our classes with `@injectable()` decorators, indicating that they are managed by the container. We also use the `@inject()` decorator to specify the dependencies of each class. The container takes care of creating instances and resolving the dependencies automatically.

## Conclusion

By applying Dependency Injection and utilizing an IoC container, we can achieve loose coupling between components, improve code maintainability, and simplify unit testing.

Remember, IoC is not a silver bullet and should be used judiciously. Proper design considerations and identifying appropriate boundaries for inversion are crucial for achieving the desired benefits.

Stay tuned for more articles on advanced TypeScript
