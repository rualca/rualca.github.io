---
title: "Installing Your First Package with NPM: A Step-by-Step Tutorial"
description: "Welcome back to our \"NPM Package Handler\" series, where we delve into the practical aspects of using Node Package Manager (NPM) to elevate your development workflow."
pubDate: 2024-02-01
tags: ["nodejs", "npm", "tooling", "javascript"]
---

Welcome back to our "NPM Package Handler" series, where we delve into the practical aspects of using Node Package Manager (NPM) to elevate your development workflow. In this installment, "Installing Your First Package with NPM: A Step-by-Step Tutorial," we guide you through the process of adding external libraries to your project, enhancing its functionality and efficiency. Whether you're a budding developer or looking to brush up on your NPM skills, this tutorial is tailored to provide you with a clear, actionable approach to package installation.

## Understanding NPM Packages

Before we dive into the installation process, it's essential to understand what NPM packages are. In essence, packages are reusable code modules that you can include in your projects. They range from utility libraries like Lodash to frameworks like React, offering a wide array of functionalities that you can leverage without having to reinvent the wheel.

### Step 1: Setting Up Your Project

If you haven't already set up an NPM project, start by creating a directory for your project and navigate into it:

```bash
mkdir my-npm-project
cd my-npm-project
```

Initialize your project with NPM to create a `package.json` file, which will keep track of your installed packages and project metadata:

```bash
npm init -y
```

The `-y` flag automatically fills in the default values for your `package.json` file, streamlining the setup process.

### Step 2: Choosing Your First Package

For this tutorial, let's install `axios`, a popular HTTP client for making requests to external services. Axios is widely used for its simple API and promise-based architecture, making it an excellent choice for your first package installation.

### Step 3: Installing the Package

To install `axios`, run the following command in your project directory:

```bash
npm install axios
```

This command performs several actions behind the scenes:

- Fetches the `axios` package from the NPM registry.
- Adds it to the `node_modules` directory in your project, where all your installed packages reside.
- Updates your `package.json` file to include `axios` as a dependency, ensuring that anyone else working with your project can install the same dependencies.

### Step 4: Verifying the Installation

Once the installation completes, you can verify it by checking the `node_modules` directory and the `package.json` file:

- Ensure that the `node_modules/axios` directory exists.
- Check your `package.json` file to see if `axios` is listed under the `dependencies` section.

### Step 5: Using the Installed Package

With `axios` installed, you can now use it in your project. Create a new JavaScript file (e.g., `index.js`) and add the following code to make a simple HTTP GET request:

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

Run your script with Node.js to see `axios` in action:

```bash
node index.js
```

### Conclusion: Empowering Your Projects with NPM

Congratulations! You've successfully installed your first NPM package and integrated it into your project. This foundational skill unlocks a world of possibilities, allowing you to tap into the vast ecosystem of JavaScript libraries and frameworks to build robust, feature-rich applications.

Stay tuned for more tutorials in our "NPM Package Handler" series, and continue to enhance your development prowess with the power of NPM. 🚀📦👩‍💻
