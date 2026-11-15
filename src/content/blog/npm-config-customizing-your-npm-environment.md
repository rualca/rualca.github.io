---
title: "NPM Config: Customizing Your NPM Environment"
description: "npm config: setting, reading and deleting values, which file each level writes to, and what belongs in a project rather than in your home directory."
pubDate: 2024-03-31
tags: ["nodejs", "npm", "tooling", "javascript"]
---

Welcome back to the **NPM Package Handler** series! 🎉 Today, we’re going to dive into something that every developer should know: customizing your NPM environment using `npm config`. Whether you’re a seasoned Node.js wizard or just getting started, understanding how to tweak your NPM settings can make your life a whole lot easier.

In this article, I’ll walk you through the basics of NPM configuration, how to set custom values, and share some pro tips to optimize your workflow. By the end, you’ll be wielding `npm config` like a true command-line champion! 💪

## What We’ll Cover Today

Here’s a sneak peek at what we’ll be discussing:

1. 🛠️ **What is NPM Config?** – Understanding the basics.
2. 🔧 **Configuring NPM with CLI Commands** – How to set and get configuration values.
3. 🗂️ **Using ****`.npmrc`**** Files** – Customizing your environment on different levels.
4. 🌐 **Common NPM Config Options** – Useful settings you should know about.
5. 📝 **Best Practices** – Tips for managing your NPM config like a pro.

Ready to take control of your NPM environment? Let’s jump right in! 🚀

## 🛠️ What is NPM Config?

Before we get our hands dirty, let’s quickly cover what `npm config` is all about. Simply put, NPM (Node Package Manager) uses a set of configuration options that dictate how it behaves. These configurations can be anything from specifying the registry NPM should use, to setting up proxies, to defining default package authors.

NPM config allows you to customize these settings to better fit your development environment. Whether you’re working on multiple projects, dealing with different registries, or just want to streamline your workflow, `npm config` is the tool you need.

## 🔧 Configuring NPM with CLI Commands

NPM makes it super easy to view and modify your configuration using command-line interface (CLI) commands. Let’s look at some of the basics.

### Viewing Your Current Configurations

To see all your current NPM configurations, simply run:

```bash
npm config list
```

This command will display all the configurations that NPM is currently using, including both default values and any custom settings you’ve applied.

### Setting Configuration Values

You can set a configuration value using the following command:

```bash
npm config set <key> <value>
```

For example, if you want to set your preferred package registry to a custom one, you can do:

```bash
npm config set registry <https://registry.yourcompany.com/>
```

This command tells NPM to use your specified registry instead of the default one.

### Getting Configuration Values

To check the value of a specific configuration, use:

```bash
npm config get <key>
```

For instance:

```bash
npm config get registry
```

This will return the current registry that NPM is using.

### Deleting Configuration Values

If you want to remove a custom configuration and revert to the default, you can use:

```bash
npm config delete <key>
```

For example:

```bash
npm config delete registry
```

This will remove the custom registry setting and NPM will revert to using its default registry.

## 🗂️ Using `.npmrc` Files

While using CLI commands is great, `.npmrc` files give you even more control by allowing you to store your configurations in a file. These files can be applied globally, per user, or even per project.

### Types of `.npmrc` Files

1. **Global ****`.npmrc`**: Located at `~/.npmrc`, this file applies to all NPM projects on your machine.
2. **User ****`.npmrc`**: Also at `~/.npmrc`, but specifically for the current user.
3. **Project ****`.npmrc`**: Located in your project’s root directory, this file applies only to that specific project.
4. **Per-Project Local ****`.npmrc`**: These can also exist within any folder in a project to apply settings to just that folder and its subdirectories.

### Creating and Editing `.npmrc` Files

You can create or edit an `.npmrc` file using any text editor. Here’s how to set a custom registry in a `.npmrc` file:

```
registry=https://registry.yourcompany.com/
```

Just save the file, and NPM will automatically apply these settings whenever you’re in the corresponding scope (global, user, or project).

### Example: Setting Different Registries for Different Projects

Let’s say you’re working on two projects: one for a company with a private registry and another that uses the public NPM registry. You can create a `.npmrc` file in each project’s root directory:

- **Project A (****`project-a/.npmrc`****)**:

```
registry=https://registry.company.com/
```

- **Project B (****`project-b/.npmrc`****)**:

```
registry=https://registry.npmjs.org/
```

This way, when you run `npm install` in each project, NPM will automatically use the correct registry.

## 🌐 Common NPM Config Options

Now that we’ve covered how to configure NPM, let’s take a look at some common and useful configuration options that can make your development life easier.

### `registry`

Specifies the registry that NPM should use.

```bash
npm config set registry <https://registry.npmjs.org/>
```

### `save-exact`

Forces NPM to save the exact version of a package in `package.json` (i.e., without a caret `^` or tilde `~` prefix).

```bash
npm config set save-exact true
```

### `package-lock`

Controls the creation of `package-lock.json` files. Setting this to false prevents the lock file from being generated.

```bash
npm config set package-lock false
```

### `proxy` and `https-proxy`

If you’re behind a corporate proxy, you can set these options to specify the proxy server.

```bash
npm config set proxy <http://proxy.company.com:8080>
npm config set https-proxy <http://proxy.company.com:8080>
```

### `init-author-name` and `init-license`

These options set default values for the `npm init` command, making it faster to create new projects.

```bash
npm config set init-author-name "Your Name"
npm config set init-license "MIT"
```

## 📝 Best Practices for Managing NPM Configurations

Finally, let’s go over some best practices to help you manage your NPM configurations effectively:

### 1. **Keep Project Configurations Isolated**

Use project-specific `.npmrc` files to avoid conflicts between different projects. This keeps your settings tailored to each project’s needs.

### 2. **Use Environment Variables**

For sensitive configurations like authentication tokens, consider using environment variables instead of hardcoding them in `.npmrc` files. This reduces the risk of accidentally exposing sensitive data.

### 3. **Check Your Configurations into Version Control**

When using project-specific `.npmrc` files, check them into version control so that your team shares the same environment. Be careful not to include any sensitive information.

### 4. **Regularly Audit Your Configurations**

As your projects evolve, your NPM configurations might need updating. Regularly audit your `.npmrc` files and global settings to ensure they’re still relevant and optimized.

## Wrapping It All Up

And there you have it! 🎉 You’re now equipped with the knowledge to customize your NPM environment like a pro. Whether you’re working on a solo project or managing a team, tweaking your NPM settings can streamline your workflow, reduce friction, and ultimately make development more enjoyable.

Happy coding, and may your NPM configurations always be in sync! 🧑‍💻✨
