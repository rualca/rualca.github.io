---
title: "Getting Started with NPM: An Introductory Guide"
description: "Welcome to the inaugural article of our \"NPM Package Handler\" series, where we embark on a journey to unravel the intricacies of Node Package Manager (NPM), the backbone of Node.js and JavaScript…"
pubDate: 2024-02-06
tags: ["nodejs", "npm", "tooling", "javascript"]
---

Node Package Manager is the backbone of Node.js and JavaScript development, and it is the subject of this first article in the "NPM Package Handler" series. The guide lays the foundation for beginners and seasoned developers alike, and keeps to the essentials. NPM exists so that a modern web application can be assembled from code other people have already written, with the tool keeping the books on which package came from where.

## What is NPM?

NPM stands for Node Package Manager, and it is the default package manager for the Node.js runtime environment. It has two parts: a command-line client (`npm`) and an online database of public and private packages called the NPM registry. Sharing and reusing code gets simpler with it, because the registry holds a wide repository of software libraries and tools that projects integrate directly.

### Setting Up NPM

Node.js is what you install first, and npm comes with it. Visit the [official Node.js website](https://nodejs.org/) and download the version that matches your operating system. Then open a terminal or command prompt and check that both arrived:

```bash
node -v
npm -v
```

Each command prints a version number. Two numbers mean the setup worked.

### Your First NPM Command

With npm installed, the terminal or command prompt is where you work. Start a project:

```bash
mkdir my-first-npm-project
cd my-first-npm-project
npm init -y
```

The first command creates a directory for the project, and `cd` moves into it. `npm init -y` then writes a default `package.json`, the file that holds the project metadata and manages its dependencies.

### Installing Packages

The registry is large, and adding one of its packages to a project takes a single command. Express, a web application framework for Node.js, is the example here:

```bash
npm install express
```

That command fetches Express from the NPM registry into the project's `node_modules` directory, and `package.json` gains Express as a dependency.

### Exploring NPM Scripts

Scripts automate the repetitive parts of a project, from running the test suite to building and deploying the application. They live in the `package.json` file under the "scripts" property. A start script for the application looks like this:

```json
"scripts": {
  "start": "node app.js"
}
```

`npm start` runs that script, so the command it holds, `node app.js`, starts the application.

### Conclusion: Embarking on the NPM Journey

The next articles in the "NPM Package Handler" series go past the basics, into advanced package management and custom build processes.
