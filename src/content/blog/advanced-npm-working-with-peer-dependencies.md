---
title: "Advanced NPM: Working with Peer Dependencies"
description: "A peer dependency asks the consuming project for a version npm will not install, so declare the range, install the peer and read the warning."
pubDate: 2024-04-25
tags: ["nodejs", "npm", "tooling", "javascript"]
---

A regular dependency says "install this for me". A peer dependency says "the project using me must already have this, and in a version I can work with". The difference explains both the warnings and the failures around them.

## The Five Things to Get Straight

What follows, in order:

1. 📚 **What Are Peer Dependencies?** – Understanding the basics.
2. 🤔 **When and Why to Use Them** – Knowing when peer dependencies are your best friend.
3. 🛠️ **Managing Peer Dependencies in Your Projects** – Practical tips and tools.
4. 🚨 **Common Pitfalls and How to Avoid Them** – Keeping your projects error-free.
5. 📝 **Best Practices for Using Peer Dependencies** – Tips to maintain a healthy codebase.

## 📚 What Are Peer Dependencies?

A peer dependency is how a package states that it needs another package to be present, without shipping a copy of it. In `package.json`, a dependency goes in `dependencies` and is installed for you; a peer dependency goes in `peerDependencies` and is expected to come from the project.

Take a library that works with `React`. It needs `React` to run, but it should not decide which version the project uses, because the project already has one and two copies of `React` in one page do not coexist. The library declares the range it supports:

```json
{
  "peerDependencies": {
    "react": "^17.0.0"
  }
}
```

That tells anyone installing the package that `React` 17 is required for it to work.

## 🤔 When and Why to Use Them

### When to Use Peer Dependencies

1. **Plugin Ecosystems**: If you’re building a plugin for a framework (like `React` or `Vue`), you want to ensure that your plugin works with the user’s version of the framework.
2. **Library Compatibility**: When your library is designed to work alongside another library, but you don’t want to include that library directly in your dependencies.
3. **Avoiding Duplicate Instances**: In cases where having multiple instances of a package (like `React`) could cause issues in your project, peer dependencies ensure that the end-user installs and manages that dependency themselves.

### Why Use Peer Dependencies

- **Flexibility**: Peer dependencies give end-users the flexibility to choose which version of a dependency to use, ensuring compatibility with their existing setup.
- **Avoiding Conflicts**: By not bundling the dependency yourself, you reduce the risk of version conflicts that can lead to hard-to-diagnose bugs.
- **Simplifying Upgrades**: If a new major version of a library comes out, your users can upgrade to it without waiting for your package to update its dependencies.

## 🛠️ Managing Peer Dependencies in Your Projects

### Adding Peer Dependencies

Peers are declared by hand in the `"peerDependencies"` section:

```json
{
  "peerDependencies": {
    "react": "^17.0.0",
    "react-dom": "^17.0.0"
  }
}
```

### Installing Peer Dependencies

NPM does not install peer dependencies automatically. If the package you just installed lists peers, you install them in the project yourself:

```bash
npm install react react-dom
```

### Dealing with Peer Dependency Warnings

The yellow warnings during installation mean a peer is missing or outside the declared range. They are warnings, not errors, and they are worth reading in production because the package was built against a version the project does not have.

### Using `-legacy-peer-deps`

NPM 7 and later resolve peers during installation. The `--legacy-peer-deps` flag restores the old behaviour and skips peer resolution:

```bash
npm install --legacy-peer-deps
```

It unblocks an install, and it also hides the mismatch that the warning was reporting.

## 🚨 Common Pitfalls and How to Avoid Them

### Pitfall 1: Ignoring Peer Dependency Warnings

A warning left alone becomes a runtime error later, usually in a place that does not name the dependency. Read it when it appears, while the install is still fresh.

### Pitfall 2: Multiple Versions of a Peer Dependency

Two copies of `React` in one build produce bugs that look like anything except a duplicate dependency. `npm ls` shows what is actually installed and where each copy came from.

### Pitfall 3: Incompatible Peer Dependencies

Sometimes two packages require ranges of the same peer that do not overlap. At that point the choice is which package to keep, or finding an alternative for one of them; no flag resolves it cleanly.

### Pitfall 4: Not Specifying Peer Dependencies Properly

A peer range that is too narrow breaks installs on valid versions; one that is too wide promises compatibility you have not tested. Cover the majors you actually support.

## 📝 Best Practices for Using Peer Dependencies

1. **Document Everything**: Make sure your documentation clearly states which peer dependencies are required and why.
2. **Stay Up-to-Date**: Keep an eye on the packages you use as peer dependencies and update your supported versions as new releases come out.
3. **Test Across Versions**: If your package supports multiple versions of a peer dependency, test it thoroughly across those versions to ensure compatibility.
4. **Communicate with Users**: If you’re building a package that others will use, be proactive about communicating peer dependency requirements to avoid confusion and support issues.
5. **Use ****`peerDependenciesMeta`**: In cases where a peer dependency is optional, you can use `peerDependenciesMeta` to specify this in your `package.json`, reducing unnecessary warnings.

```json
{
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  }
}
```

## Wrapping It All Up

Peer dependencies put the version decision where it belongs: with the project that consumes the package. Declare the range you support, install the peer in the project, and read the warning when npm raises it, because the flag that silences it also silences the information.
