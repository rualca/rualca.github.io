---
title: "NPM Link: Developing and Testing Local NPM Packages"
description: "Welcome back to the NPM Package Handler series! 🎉 Today, we’re diving into a tool that’s often overlooked but incredibly handy for developers working with multiple local projects: npm link."
pubDate: 2024-03-12
tags: ["nodejs", "npm", "tooling", "javascript"]
---

Welcome back to the NPM Package Handler series! 🎉 Today, we’re diving into a tool that’s often overlooked but incredibly handy for developers working with multiple local projects: `npm link`. If you’ve ever found yourself switching back and forth between your own packages and the projects that use them, this article is for you. We’re going to explore how `npm link` can make your life easier when developing and testing local NPM packages.

## What We’ll Cover Today

Here’s a quick overview of what we’re going to talk about:

1. 🧩 **What is NPM Link?** – The basics of `npm link` and why it’s useful.
2. 🚀 **Setting Up NPM Link** – How to create a symlink between your local package and your project.
3. 🛠️ **Developing and Testing** – Tips for using `npm link` in your development workflow.
4. ❌ **Unlinking** – How to clean up once you’re done testing.
5. 📋 **Best Practices** – Some advice to keep your development smooth and organized.

So, let’s get linked up! 🔗

## 🧩 What is NPM Link?

Let’s start with the basics: what exactly is `npm link`? In a nutshell, `npm link` is a command that creates a symbolic link between your local package and a project that depends on it. This means that instead of constantly reinstalling your package every time you make a change, you can link it directly into your project’s `node_modules` folder. It’s like having a direct pipeline from your package’s source code to the project you’re testing it in.

This is super useful when you’re developing a package locally and you want to test how it integrates with another project. Instead of publishing your package to the NPM registry every time you want to test a change (which would be a nightmare), `npm link` lets you use your local, unpublished version right away.

## 🚀 Setting Up NPM Link

Setting up `npm link` is pretty straightforward, but there are a couple of steps you need to follow.

### Step 1: Link the Package

First, navigate to the root directory of your package (the one you’re developing) in your terminal and run:

```bash
npm link
```

This command creates a global symlink for your package. Think of this as “registering” your package globally on your machine, so other projects can link to it.

### Step 2: Link the Package to Your Project

Next, navigate to the project where you want to use this package and run:

```bash
npm link <your-package-name>
```

Replace `<your-package-name>` with the name of your package as defined in its `package.json`. This will create a symlink in the `node_modules` of your project, pointing to the local version of your package.

And that’s it! Your project is now using the local version of your package, and any changes you make to your package code will be instantly reflected in your project.

## 🛠️ Developing and Testing

Now that you’re linked up, let’s talk about how to use this setup effectively in your development workflow.

### Instant Feedback Loop

One of the biggest advantages of using `npm link` is the instant feedback loop it creates. You can make changes in your package and immediately see the effects in your project without having to re-install or rebuild. This is a game-changer when you’re iterating quickly and need to see how your changes impact the overall project.

### Debugging

Debugging is also easier with `npm link`. Since you’re working with the actual source files and not a packaged version, you can step through your code in a debugger with full access to the original code. This can save you tons of time when trying to track down elusive bugs.

### Handling Dependencies

One thing to be aware of is how dependencies are handled. When you link a package, it doesn’t automatically link its dependencies. If your package depends on something that’s not installed in your project, you might need to run `npm install` in your linked package directory to ensure everything works smoothly.

## ❌ Unlinking

Once you’re done developing and testing, it’s a good idea to clean up the symlinks to avoid any confusion or conflicts later.

### Unlink the Package from the Project

To unlink your package from your project, navigate to your project’s directory and run:

```bash
npm unlink <your-package-name>
```

This will remove the symlink from your project’s `node_modules` folder. Your project will no longer use the local version of the package.

### Unlink Globally

If you want to remove the global symlink you created initially, go back to your package’s directory and run:

```bash
npm unlink
```

This cleans up the global symlink, effectively unregistering your package.

## 📋 Best Practices

Using `npm link` can be incredibly powerful, but like any tool, it’s important to use it wisely. Here are some best practices to keep in mind:

### 1. **Use Git for Version Control**

Before you start linking and making changes, make sure your package is under version control. This way, you can easily roll back if something goes wrong.

### 2. **Document Your Links**

If you’re working on a team, document the fact that you’re using `npm link`. This will help your teammates understand the setup and avoid confusion when someone else tries to run the project.

### 3. **Unlink When Done**

Don’t forget to unlink your package when you’re done testing. Leaving a project linked to a local package can cause confusion down the road, especially if the project is moved to a different environment or shared with others.

### 4. **Testing in Isolation**

While `npm link` is great for development, make sure you also test your package in isolation by installing it the traditional way (`npm install <your-package>`). This helps ensure that everything works as expected when it’s published.

## Wrapping It All Up

And there you have it! A deep dive into the world of `npm link` and how it can streamline your development process. Whether you’re working on a small utility package or a massive library, `npm link` is a tool that can save you time and make testing your local packages a breeze.

Happy coding, and stay linked! 🔗
