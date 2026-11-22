---
title: "SOLID Principles Series: Demystifying the Liskov Substitution Principle (LSP) in Node.js"
description: "Welcome back to our SOLID Principles Series."
pubDate: 2024-01-06
tags:
  - solid
  - architecture
  - typescript
canonical: https://medium.com/@ruben.alapont/solid-principles-series-demystifying-the-liskov-substitution-principle-lsp-in-node-js-1ab376a4ccba
---

## SOLID Principles Series: Demystifying the Liskov Substitution Principle (LSP) in Node.js with TypeScript

![](https://cdn-images-1.medium.com/max/800/0*4byuhmGjEGW0em1D)

Welcome back to our SOLID Principles Series. In this installment, we’ll unravel the Liskov Substitution Principle (LSP) and explore how to apply it effectively in Node.js using TypeScript.

## LSP: The Cornerstone of Classy Coding

The Liskov Substitution Principle, named after computer scientist Barbara Liskov, might sound like an arcane spell from the wizarding world, but it’s actually a fundamental concept in object-oriented programming. In simple terms, LSP states that objects of a superclass should be replaceable with objects of its subclasses without altering the correctness of the program.

## Why LSP in Node.js with TypeScript?

Node.js, known for its JavaScript prowess, gets even more powerful with TypeScript. TypeScript adds a layer of types and interfaces, making it a perfect playground to implement and understand LSP.

## Understanding LSP with a Node.js Example

Let’s dive into an example that illustrates LSP in action, using Node.js and TypeScript:

### Step 1: Define a Superclass

First, we create a superclass that our subclasses will extend.

```
// vehicle.ts
export class Vehicle {
  startEngine(): string {
    return 'Engine started';
  }
}
```

### Step 2: Create a Subclass

Now, let’s create a subclass that extends `Vehicle`.

```
// car.ts
import { Vehicle } from './vehicle';

export class Car extends Vehicle {
  startEngine(): string {
    return 'Car engine started';
  }
}
```

### Step 3: Another Subclass, With a Twist

Let’s add another subclass, but this time with a slight modification.

```
// electricCar.ts
import { Vehicle } from './vehicle';

export class ElectricCar extends Vehicle {
  startEngine(): string {
    return 'Electric Car engine started quietly';
  }

  chargeBattery(): string {
    return 'Battery charging';
  }
}
```

## The LSP Test

Now, let’s test if `ElectricCar` and `Car` can be substituted for `Vehicle` without issues.

```
// app.ts
import { Vehicle } from './vehicle';
import { Car } from './car';
import { ElectricCar } from './electricCar';
```

```
function startVehicleEngine(vehicle: Vehicle) {
  console.log(vehicle.startEngine());
}
```

```
const myCar = new Car();
const myElectricCar = new ElectricCar();
```

```
startVehicleEngine(myCar); // 'Car engine started'
startVehicleEngine(myElectricCar); // 'Electric Car engine started quietly'
```

## The Catch: When LSP is at Risk

However, suppose we introduce a function that specifically uses `ElectricCar`'s `chargeBattery` method:

```
function chargeElectricCarBattery(car: ElectricCar) {
  console.log(car.chargeBattery());
}
```

If we try to pass a `Car` object to this function, we're violating LSP, as `Car` doesn't have the `chargeBattery` method. LSP reminds us to design our classes and hierarchies so that such situations are avoided or handled gracefully.

## Conclusion: Embracing LSP in Your Node.js Endeavors

LSP encourages robust and maintainable object-oriented design. By adhering to LSP in Node.js with TypeScript, we ensure our code is flexible, intuitive, and less prone to errors.

And for those eager to continue unraveling the mysteries of coding principles, head over to [ProductThinkers.com](http://productthinkers.com/). It’s a fantastic resource where you can explore, learn, and discuss all things related to product development and programming.

So, happy coding, and may your TypeScript adventures in Node.js be as smooth and error-free as an LSP-compliant superclass-subclass relationship! 🧩💻🚀

In the next article of our SOLID Principles Series, we’ll dive into the “I” in SOLID: the Interface Segregation Principle (ISP). Stay tuned to continue your journey toward writing SOLID code in Node.js with TypeScript.
