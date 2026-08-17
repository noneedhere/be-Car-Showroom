import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

async function createManager() {
  try {
    const existing = await prisma.user.findFirst({ where: { role: "MANAGER" } });
    if (existing) {
      console.log("Manager user already exists:", existing.email);
      return;
    }

    const manager = await prisma.user.create({
      data: {
        uuid: uuidv4(),
        name: "Manager",
        email: "manager@example.com",
        password: md5("manager123"),
        role: "MANAGER",
        profilePicture: ""
      }
    });

    console.log("Created manager:", manager.email);
  } catch (err) {
    console.error("Error creating manager:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createManager();
