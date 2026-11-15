---
title: "Securing Node.js Projects: An Introduction to NPM Audit"
description: "npm audit: running it, reading the report by severity and dependency path, when the automatic fix is not the fix, and habits that keep it clean."
pubDate: 2024-03-17
tags: ["nodejs", "npm", "tooling", "javascript"]
---

Installing a package means running someone else's code with your permissions. `npm audit` is the check that tells you whether any of that code has a known vulnerability, and which dependency in your tree brought it in.

## The Five Parts of an Audit

What this covers, in order:

1. 🔍 **What is NPM Audit?** – Understand what `npm audit` does and why it’s essential.
2. 🚀 **How to Run NPM Audit** – A step-by-step guide on scanning your project.
3. 🛠️ **Decoding the Audit Report** – Learn how to interpret the results.
4. 🔒 **Fixing Vulnerabilities** – Tips and tricks to patch up those pesky security holes.
5. 🧰 **Best Practices for Security** – How to keep your Node.js projects secure in the long run.

## 🔍 What is NPM Audit?

`npm audit` compares the packages in your dependency tree against a database of known vulnerabilities. It does not read your code; it matches versions. Every package you install comes from someone else, and a version listed in that database is a version with a published problem.

## 🚀 How to Run NPM Audit

From the project directory:

```bash
npm audit
```

The command checks the dependencies listed in `package-lock.json` and prints a report for whatever it matched. On a large tree it takes a few seconds to a minute, depending on how many packages there are.

## 🛠️ Decoding the Audit Report

The report has three parts, and they answer different questions.

### 1. **Summary**

The summary counts vulnerabilities by severity: low, moderate, high and critical. It tells you how much of the report needs attention before the rest of the work.

### 2. **Detailed Vulnerability Info**

Each entry lists:

- **Vulnerable Packages**: The specific package (or packages) affected.
- **Severity**: How serious the vulnerability is.
- **Description**: A brief explanation of the issue.
- **Path**: The dependency chain that led to the vulnerable package.
- **Recommendation**: Suggested actions to resolve the issue, like updating the package to a fixed version.

The path is the useful field. It says whether you depend on the vulnerable package directly or whether something three levels down brought it along.

### 3. **Actions Required**

This part names what has to change: a patch bump, a major upgrade, or a package that no longer has a fixed version to move to.

## 🔒 Fixing Vulnerabilities

### Automatically Fixing Issues

For the vulnerabilities that have a safe version inside the ranges you already allow:

```bash
npm audit fix
```

It updates the affected packages to a version without the reported issue.

### Manual Fixes

Not everything can be fixed that way. The remaining cases are:

- **Update a specific package manually**: This is often necessary when `npm audit fix` can’t find a safe version to upgrade to within your dependency tree.
- **Review breaking changes**: When a vulnerability is in a package that requires a major version update, you’ll need to manually check the changelog for breaking changes and adjust your code accordingly.
- **Consider alternative packages**: If a package is no longer maintained and has unresolved vulnerabilities, it might be time to look for alternatives that are more secure and actively supported.

## 🧰 Best Practices for Security

### 1. **Regular Audits**

Make `npm audit` a regular part of your development process. Incorporate it into your CI/CD pipeline so that vulnerabilities are caught early, ideally before they make it into production.

### 2. **Keep Dependencies Updated**

Outdated dependencies are a common source of vulnerabilities. Regularly check for updates and apply them to ensure your project is using the latest, most secure versions of its dependencies.

### 3. **Use Trusted Packages**

Before adding a new package, do some due diligence. Check the package’s popularity, maintenance activity, and community support. Packages that are actively maintained and widely used are generally safer bets.

### 4. **Lock Dependency Versions**

Use a `package-lock.json` file to lock down your dependency versions. This prevents unexpected updates from introducing new vulnerabilities into your project.

### 5. **Educate Your Team**

Security is everyone’s responsibility. Make sure your team is aware of best practices and knows how to use tools like `npm audit` to keep projects secure.

## Wrapping It All Up

The audit is a version check, so it is only as current as the report you run. Wire it into CI, read the dependency path when a vulnerability appears, and treat the ones that need a major upgrade as a decision rather than a chore.
