import { PrismaClient } from "@prisma/client";

class PrismaService {
  private static prisma: PrismaClient;

  private constructor() {}

  public static getPrismaClient(): PrismaClient {
    if (!PrismaService.prisma) {
      PrismaService.prisma = new PrismaClient({
        log: ["error", "query", "info", "warn"],
      });
    }
    return PrismaService.prisma;
  }
}

export default PrismaService;
