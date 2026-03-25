import "dotenv/config";
import { resolver } from "./platform/forge-app.js";

const required = ["HYBRIQ_API_KEY", "ANTHROPIC_API_KEY"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) { console.error(`Missing: ${missing.join(", ")}. See .env.example.`); process.exit(1); }

export { resolver };
console.log("HybrIQ Confluence Integration loaded. Deploy with: forge deploy");
