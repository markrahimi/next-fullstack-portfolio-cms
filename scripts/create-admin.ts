import mongoose from "mongoose";
import * as readline from "readline";

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  try {
    
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const User = (await import("../src/models/User")).default;

    console.log("\n🔐 Create Admin User\n");

    const name = await question("Admin Name: ");
    const email = await question("Admin Email: ");
    const password = await question("Admin Password: ");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("\n❌ User with this email already exists!");
      process.exit(1);
    }

    const admin = await User.create({
      name,
      email,
      password,
      role: "admin",
    });

    console.log("\n✅ Admin user created successfully!");
    console.log(`\nName: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);

    await mongoose.disconnect();
    rl.close();
  } catch (error) {
    console.error("\n❌ Error creating admin:", error);
    process.exit(1);
  }
}

createAdmin();
