'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // CREATE USERS
  await prisma.user.create({
    data: {
      firstName: FormData.name,
      lastName: FormData.name,
      email: FormData.name,
      userName: FormData.name,
      phone: FormData.name,
      hashedPassword: FormData.name,
      birthDate: FormData.name,
      image: FormData.name,
      gender: FormData.name,
      occupation: FormData.name,
      maritalStatus: FormData.name,
      newConvert: FormData.name,
      formerReligion: FormData.name,
      notes: FormData.name,
      privacyConsent: FormData.name as any,
      contactConsent: FormData.name as any,
      disclosureConsent: FormData.name as any,
      // address: FormData.name,
    },
  })

  // FETCH ALL USERS
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .catch(async (e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
