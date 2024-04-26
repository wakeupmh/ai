import { PrismaClient } from '@prisma/client'

const prismaSingleton = () => {
  return new PrismaClient()
}

type PrismaSingleton = ReturnType<typeof prismaSingleton>

const globalForPrisma = globalThis as unknown as { prisma: PrismaSingleton | undefined }

const prisma = globalForPrisma.prisma || prismaSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}