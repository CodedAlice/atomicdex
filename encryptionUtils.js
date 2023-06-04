const crypto = require("crypto");
const { SHA256 } = require("crypto-js");

function generateRandomNumber() {
  const number = crypto.randomBytes(16);
  return SHA256(number).toString();
}

function encrypt(text) {
  const salt = generateRandomNumber();
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv("aes-256-cbc", salt, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return [encrypted, salt, iv.toString("hex")];
}

function decrypt(encryptedText, salt, iv) {
  const decipher = crypto.createDecipheriv("aes-256-cbc", salt, Buffer.from(iv, "hex"));
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
