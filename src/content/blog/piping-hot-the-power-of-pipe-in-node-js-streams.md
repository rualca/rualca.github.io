---
title: "Piping Hot: The Power of Pipe() in Node.js Streams"
description: "pipe() in Node.js: connecting a readable to a writable, the backpressure it handles for you, and a transform stream inserted in the middle of a chain."
pubDate: 2024-01-06
tags: ["nodejs", "streams", "backend", "javascript"]
---

`pipe()` moves data from a readable stream to a writable one. It is the shortest way to connect two streams in Node.js, and the one that deals with backpressure for you.

## Why Pipe()? The Plumbing of Node.js

Without it you wire streams by hand: listen for `data`, write each chunk to the destination, and pause the source when the destination cannot keep up. `pipe()` performs that wiring, and it performs it correctly, which is the part that is easy to get wrong.

### Pipe() in Action: A Symphony of Data Flow

Reading one file and writing it to another is the canonical case. The source produces chunks, the destination consumes them, and `pipe()` moves each chunk across as fast as the destination accepts it.

### Connecting Two Streams

Given a readable stream (the source) and a writable stream (the destination), this connects them:

```js
const fs = require('fs');

// Creating a readable stream from a file
const readableStream = fs.createReadStream('input.txt');

// Creating a writable stream to a file
const writableStream = fs.createWriteStream('output.txt');

// Magic happens here!
readableStream.pipe(writableStream);

console.log('Piping complete! Check out output.txt.');
```

The contents of `input.txt` end up in `output.txt`.

### The Benefits: Why We’re Hot for Pipe()

1. **Efficiency**: Pipe() handles backpressure (data clogs) internally, so your data doesn’t overflow or get jammed.
2. **Simplicity**: It turns complex stream handling into a one-liner.
3. **Elegance**: It makes your code look clean and professional, like a well-tailored suit.

### Advanced Piping: Adding Filters

A transform stream in the middle of the chain changes each chunk as it passes through. This one upper-cases the data:

```js
const { Transform } = require('stream');

// Creating a transform stream to uppercase data
const upperCaseTr = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
});

// Now with our transform stream
readableStream.pipe(upperCaseTr).pipe(writableStream);
```

The data is capitalized on its way from the source to the destination.

### Conclusion: Keep Calm and Pipe On

`pipe()` covers the common case: move data from one stream to another and stop the source when the destination is full. Longer chains keep the same shape, one stage at a time.
