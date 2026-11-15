---
title: "MongoDB Security Essentials: Protecting Your Data"
description: "Five MongoDB controls in the order that closes the biggest holes first: authentication, authorization, encryption, network exposure and auditing."
pubDate: 2024-07-29
tags: ["mongodb", "database", "backend", "nosql"]
---

A default MongoDB install is built to be reachable, not to be safe. If the port answers and no authentication is configured, anyone who finds it can read and write. The five controls below are the ones that matter, roughly in the order they close the biggest holes.

## The Bedrock of MongoDB Security

Security on MongoDB is not a flag you set at the end of a project. It is a set of independent controls — authentication, authorization, encryption, network limits and auditing — and each one closes a different hole. Leaving one at its default leaves that hole open.

### 1. Authentication: Who Gets In

Authentication decides whether a connection is allowed at all. MongoDB supports SCRAM, x.509 certificates and LDAP. Picking one and turning it on is the highest-value change available to a deployment.

### Enabling Authentication:

In your MongoDB configuration file (`mongod.conf`), these lines enable SCRAM authentication:

```yaml
security:
  authorization: enabled
```

Without them, every client that can reach the port is trusted by default.

### 2. Authorization: What Each User Can Do

Once a client is authenticated, authorization decides what it can read and write. MongoDB uses Role-Based Access Control (RBAC): roles are assigned to users, and the role carries the privileges.

### Crafting Roles:

Write roles for the job rather than for convenience. An application needs read and write on its own database and nothing else. An administrator needs broader privileges, but it should not be the account the application runs as.

### 3. Encryption: At Rest and in Transit

Encryption covers two separate problems. TLS protects data while it moves between the application and the server. An encrypted storage engine protects the files on disk.

### Enforcing TLS:

Ensure your `mongod.conf` includes TLS settings, so every incoming connection has to use them:

```yaml
net:
  tls:
    mode: requireTLS
    certificateKeyFile: /etc/ssl/mongodb.pem
```

### 4. Network Exposure: Limit the Perimeter

The cheapest way to protect a database is to make it hard to reach. Bind MongoDB to a local or internal network interface, and use a firewall or security group to decide who can connect.

### Binding to Local Interface:

In `mongod.conf`, set the `bindIp` option to `127.0.0.1` or an internal network interface so the server is not listening on a public one:

```yaml
net:
  bindIp: 127.0.0.1
```

### 5. Regular Audits: Track What Happens

Auditing records who accessed what and what changed. Without it, an incident is guesswork: you can see that data is gone, but not who took it.

### Enabling Auditing:

Configure auditing in your `mongod.conf` to record activity on the server:

```yaml
auditLog:
  destination: file
  format: BSON
  path: /var/log/mongodb/audit.bson
```

### Where the Defaults Leave You

With those five controls configured, a deployment is private by default instead of open by default. Keep the configuration in version control and diff it after an upgrade: a file copied forward keeps whatever it said, including the parts that were convenient at the time.
