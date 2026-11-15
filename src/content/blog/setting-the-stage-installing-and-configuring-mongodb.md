---
title: "Setting the Stage: Installing and Configuring MongoDB"
description: "Installing MongoDB on Windows, macOS and Linux, creating its data directory, and turning on authentication before you put anything in it."
pubDate: 2024-07-01
tags: ["mongodb", "database", "backend", "nosql"]
---

MongoDB runs on Windows, macOS and Linux. Installation and configuration are separate jobs, and configuration is the one that decides whether the database is usable and whether it is safe. Check the system requirements for your platform before you start, then follow the section for your operating system.

## Before You Install

Each platform has its own install path. Confirm that your machine meets the system requirements for the version you intend to run, and that your account can install a service and create a data directory.

### Installation Steps by Platform

### On Windows

1. **Download the MongoDB installer**: Go to the [official download page](https://www.mongodb.com/try/download/community) and choose the version for Windows.
2. **Run the installer**: Double-click the file you downloaded and follow the installation wizard.
3. **Choose the setup type**: "Complete" installs every MongoDB component. "Custom" lets you pick the ones you want.
4. **Service Configuration**: Install MongoDB as a service so it starts with the machine and does not need launching by hand.

### On macOS

1. **Install with Homebrew**: With Homebrew installed, open a terminal and run `brew tap mongodb/brew`, then `brew install mongodb-community`.
2. **Start the MongoDB service**: Run `brew services start mongodb-community`. The service starts now and again at login.

### On Linux

1. **Choose your distribution**: Every Linux distribution packages MongoDB differently. The MongoDB [official documentation](https://docs.mongodb.com/manual/administration/install-on-linux/) lists the commands for yours.
2. **Update your system**: Refresh the package database first with `sudo apt-get update` on Ubuntu and Debian, or the equivalent command for your distribution.
3. **Install MongoDB**: Run the installation command for your distribution and version.

### Configuring MongoDB

After installation, create the directory where MongoDB stores its data files. `/data/db` is the path MongoDB expects by default. Any other location works as long as you tell MongoDB where it is.

### Securing the Instance

An unauthenticated MongoDB accepts every client that can reach its port. Enable authentication so that only connections with valid credentials get in.

1. **Open the MongoDB configuration file** (`mongod.conf`). It usually sits at `/etc/mongod.conf`, or inside your MongoDB installation directory.
2. **Enable authentication**: Add the `security` option and set `authorization` to `enabled`.
3. **Restart MongoDB**: Restart the service for the change to take effect. On macOS that is `brew services restart mongodb-community`; other systems use their own service command.
4. **Create an admin user**: Connect through the MongoDB shell and create an administrative user. That account grants and revokes access for everyone else.

### After the Install

With the service installed, the data directory in place and authentication enabled, the database is ready to hold data. Create a database, add collections to it, and start working with documents.
