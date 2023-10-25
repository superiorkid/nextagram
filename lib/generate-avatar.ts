import crypto from "crypto";

export default function generateAvatar(email: string) {
  const digest = crypto.createHash("md5").update(email).digest("hex");
  return `https://www.gravatar.com/avatar/${digest}?d=identicon&s=36'`;
}
