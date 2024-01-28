const crypto = require("crypto");
const fs = require("fs");

// Generate a key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});

// Save keys to files or set environment variables
fs.writeFileSync("access_token_public_key.pem", publicKey);
fs.writeFileSync("access_token_private_key.pem", privateKey);
fs.writeFileSync("refresh_token_public_key.pem", publicKey);
fs.writeFileSync("refresh_token_private_key.pem", privateKey);

// Display the generated keys
console.log("Access Token Public Key:\n", publicKey);
console.log("\nAccess Token Private Key:\n", privateKey);
console.log("\nRefresh Token Public Key:\n", publicKey);
console.log("\nRefresh Token Private Key:\n", privateKey);
