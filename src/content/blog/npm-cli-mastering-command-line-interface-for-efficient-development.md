---
title: "NPM CLI: Mastering Command Line Interface for Efficient Development"
description: "The npm commands worth knowing by heart: install, uninstall, update, scripts, listing, init, dependency flags, npx and config."
pubDate: 2024-03-26
tags: ["nodejs", "npm", "tooling", "javascript"]
---

The npm command line is the part of the toolchain you use most and look up least. There are a dozen commands that cover nearly every daily task, and knowing them by shape saves a trip to the documentation every time.

## What Is the NPM CLI?

The npm CLI talks to the registry and manages the packages in a project from the terminal. It installs, removes, updates and publishes, and it runs the scripts defined in `package.json`.

### Why Use the NPM CLI?

Three reasons it beats a graphical tool:

1. **Speed**: Commands can be executed rapidly in the terminal without the need for navigating through a graphical user interface. This efficiency is particularly beneficial for repetitive tasks.
2. **Automation**: Automating tasks with scripts can help streamline your workflow, reducing the potential for human error.
3. **Flexibility**: The CLI provides a greater number of options and configurations than many GUI tools, giving you complete control over your project environment.

## Essential NPM CLI Commands

The commands that come up daily:

### 1. Installing Packages

```
npm install package-name
```

The package arrives in `node_modules` and is recorded as a dependency. For a tool you want available in every project, install it globally with `-g`:

```
npm install -g package-name
```

### 2. Uninstalling Packages

```
npm uninstall package-name
```

The package leaves `node_modules` and its entry leaves `package.json`.

### 3. Updating Packages

Version drift is where vulnerabilities and incompatibilities come from, so updating is routine rather than occasional:

```
npm update
```

For one package only, name it:

```
npm update package-name
```

### 4. Running Scripts

A script in `package.json` runs without you remembering the command behind it. With `"start": "node index.js"` defined:

```
npm start
```

Custom tasks work the same way:

```
"scripts": {
  "test": "jest",
  "build": "webpack"
}
```

```
npm run test
npm run build
```

### 5. Checking Installed Packages

```
npm list
```

To see the global packages at the top level instead of the whole tree:

```
npm list -g --depth=0
```

### 6. Creating a New Package

```
npm init
```

It asks for the fields and writes `package.json`. Accepting every default does the same thing without the questions:

```
npm init -y
```

## Advanced NPM CLI Features

### 1. Managing Dependencies

`--save` records a package as a runtime dependency and `--save-dev` records it as a development one:

```
npm install package-name --save
npm install package-name --save-dev
```

The distinction decides what gets installed in production, so it belongs in `package.json` rather than in someone's memory.

### 2. Using npx

Since npm 5.2, `npx` runs a binary from `node_modules` without a global install. `create-react-app` is the usual example:

```
npx create-react-app my-app
```

The package is fetched and executed in one step, and nothing permanent lands in the global namespace.

### 3. Configuring NPM

Configuration lives behind one command:

```
npm config set key value
```

A proxy, for instance:

```
npm config set proxy http://your-proxy.com:8080
```

And to read back what is set:

```
npm config list
```

## What to Memorize

Six commands cover the daily work — install, uninstall, update, run, list, init — and three flags cover the rest: `-g` for global, `--save-dev` for development dependencies, and `npx` for running a binary once. Everything else is in `npm help` when you need it.
