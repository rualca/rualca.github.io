---
title: "Installing Your First Package with NPM: A Step-by-Step Tutorial"
description: "Installing a package takes a handful of commands. This installment of the \"NPM Package Handler\" series runs them end to end on a real project, from npm init to the first HTTP request."
pubDate: 2024-02-01
tags: ["nodejs", "npm", "tooling", "javascript"]
---

Adding a library to a Node project takes a handful of commands, and the commands do not change between the first package and the fortieth. This installment of the "NPM Package Handler" series runs the sequence end to end: an empty directory, `npm init`, `npm install axios`, and a script that uses it. The steps are the same whether you are installing your first package or refreshing what you already know.

## Understanding NPM Packages

Packages are reusable code modules you add to a project. They range from utility libraries like Lodash to frameworks like React, and they give you functionality you would otherwise have to write yourself. Installing one is how that code becomes available to your project.

### Step 1: Setting Up Your Project

If the project does not exist yet, create a directory for it and move into it:

```bash
mkdir my-npm-project
cd my-npm-project
```

`npm init` writes the `package.json` file that tracks the installed packages and the project metadata:

```bash
npm init -y
```

The `-y` flag accepts the default answer for every prompt, so the command writes `package.json` without asking questions.

### Step 2: Choosing Your First Package

The package used here is `axios`, an HTTP client for making requests to external services. It is widely used for its small API and promise-based architecture, which makes it a good fit for a first installation.

### Step 3: Installing the Package

Install `axios` from the project directory:

```bash
npm install axios
```

The command does three things:

- Fetches the `axios` package from the NPM registry.
- Puts it in the `node_modules` directory, where the installed packages live.
- Records it in `package.json` as a dependency, so anyone else working on the project installs the same package.

### Step 4: Verifying the Installation

After the install finishes, two checks confirm it worked:

- The `node_modules/axios` directory exists.
- `package.json` lists `axios` under `dependencies`.

### Step 5: Using the Installed Package

Create a JavaScript file (for example `index.js`) and add this code to send a GET request:

```js
const axios = require('axios');

axios.get('<https://jsonplaceholder.typicode.com/posts/1>')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

Run the script with Node.js:

```bash
node index.js
```

### Conclusion: Empowering Your Projects with NPM

The commands do not change as the project grows: one `npm install` per package, one entry per package in `package.json`. What changes is how many of them you keep track of.
