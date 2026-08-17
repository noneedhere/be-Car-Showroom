import { PrismaClient } from "@prisma/client";
import md5 from "md5";

const prisma = new PrismaClient();

async function resetPasswords() {
  try {
    const managers = await prisma.user.findMany({ where: { role: "MANAGER" } });
    if (managers.length === 0) {
      console.log("No manager users found.");
      return;
    }

    for (const m of managers) {
      await prisma.user.update({
        where: { id_user: m.id_user },
        data: { password: md5("manager123") }
      });
      console.log(`Updated password for: ${m.email}`);
    }

    console.log("All manager passwords have been reset to 'manager123'.");
  } catch (err) {
    console.error("Error resetting manager passwords:", err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetPasswords();
