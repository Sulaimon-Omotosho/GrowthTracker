'use server'

import db from '@/prisma/db'
import { CurrentState, FormModalProps } from '@/types'
import { Announcement } from '@prisma/client'
import { MemberFormValidation } from '../validation'
import { saltAndHashPassword } from '@/utils/helper'

// await prisma.post.create({
//   data: {
//     slug: 'cell-week-25-report',
//     title: 'Week 25 Outreach Summary',
//     body: 'This week, we visited 3 homes...',
//     authorId: 'user_id',
//     cellId: 'cell_id',
//     weekStart: new Date('2025-06-22'), // start of the week
//     tags: ['evangelism', 'outreach'],
//     type: 'WEEKLY_REPORT',
//   },
// })

// const startOfWeek = new Date('2025-06-22') // you can calculate this dynamically
// const posts = await prisma.post.findMany({
//   where: {
//     cellId: 'your-cell-id',
//     weekStart: startOfWeek,
//   },
//   include: { author: true },
// })

// await prisma.post.create({
//   data: {
//     slug: 'district-28-report',
//     title: 'District June Activity',
//     body: 'We held a crusade and had 15 new converts.',
//     authorId: 'user_id',
//     districtId: 'district_id',
//     targetType: 'DISTRICT',
//     type: 'WEEKLY_REPORT',
//     weekStart: new Date('2025-06-02'),
//   },
// })

//  Example Logic When Creating a Post
// ts
// Copy
// Edit
// const postData = {
//   slug: 'weekly-report-1',
//   title: 'Cell Weekly Report',
//   body: 'This week we did...',
//   authorId: 'userObjectId',
//   scope: 'CELL',
//   scopeId: 'cellObjectIdFromFrontendForm',
// }
// await prisma.post.create({ data: postData })

//  When Querying Posts
// You'll need to dynamically resolve the scope like:

// ts
// Copy
// Edit
// const posts = await prisma.post.findMany({
//   where: {
//     scope: 'CELL',
//     scopeId: '65b9...abc'
//   },
// })
// Or, to fetch the related entity (you'll need custom logic):

// ts
// Copy
// Edit
// if (post.scope === 'CELL') {
//   const cell = await prisma.cell.findUnique({ where: { id: post.scopeId } })
// }

export const getUserData = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    })
    if (user) {
      return user
    }
  } catch (error) {
    console.error('User not found:', error)
    return { success: false, error: true }
  } finally {
    await db.$disconnect()
  }
}

// USER ACTION
// CREATE USER
export const createUser = async (data: FormData) => {
  try {
    // Validate Data
    const validated = MemberFormValidation.parse(data)

    // Hash Password
    // const hashedPassword = await saltAndHashPassword(validated.password)

    // Prepare Data
    const {
      name,
      firstName,
      lastName,
      email,
      phone,
      birthDate,
      gender,
      occupation,
      maritalStatus,
      newConvert,
      formerReligion,
      notes,
      privacyConsent,
      contactConsent,
      disclosureConsent,
      address,
    } = validated

    // Check Existing User
    const existingEmail = await db.user.findUnique({
      where: { email },
    })
    if (existingEmail) {
      return { success: false, error: 'Email already exists' }
    }
    const existingPhone = await db.user.findFirst({
      where: { phone },
    })
    if (existingPhone) {
      return { success: false, error: 'Phone number already exists' }
    }

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        firstName,
        lastName,
        email,
        phone,
        birthDate: new Date(birthDate),
        gender,
        occupation,
        maritalStatus,
        newConvert,
        formerReligion,
        notes,
        address,
        privacyConsent,
        contactConsent,
        disclosureConsent,
        // hashedPassword,
      },
    })

    return { success: true, user, error: false }
  } catch (error) {
    console.error('Error creating User:', error)
    return { success: false, error: true }
  } finally {
    await db.$disconnect()
  }
}

// UPDATE USER
export const updateUser = async (data: FormData, image?: any) => {
  try {
    // Validate Data
    const validated = MemberFormValidation.parse(data)

    // Prepare Data
    const {
      id,
      name,
      firstName,
      lastName,
      email,
      phone,
      // password,
      birthDate,
      gender,
      occupation,
      maritalStatus,
      newConvert,
      formerReligion,
      notes,
      address,
      privacyConsent,
      contactConsent,
      disclosureConsent,
    } = validated

    const updateData = {
      name,
      firstName,
      lastName,
      email,
      phone,
      image,
      birthDate: new Date(birthDate),
      gender,
      occupation,
      maritalStatus,
      newConvert,
      formerReligion,
      notes,
      address,
      privacyConsent,
      contactConsent,
      disclosureConsent,
    }

    // Check Existing User
    const existingEmail = await db.user.findUnique({
      where: { email, NOT: { id } },
    })
    if (existingEmail) {
      return { success: false, error: 'Email already exists' }
    }
    const existingPhone = await db.user.findFirst({
      where: { phone, NOT: { id } },
    })
    if (existingPhone) {
      return { success: false, error: 'Phone number already exists' }
    }

    // Update User
    const updatedUser = await db.user.update({
      where: { id },
      data: updateData,
    })

    return { success: true, user: updatedUser, error: false }
  } catch (error) {
    console.error('Error updating use:', error)
    return { success: false, error: true }
  } finally {
    await db.$disconnect
  }
}

// DELETE USER
export const deleteUser = async (currentState: any, data: FormData) => {
  const id = data.get('id') as string

  if (id) {
    try {
      await db.user.delete({
        where: {
          id,
        },
      })

      return { success: true, error: false } as any
    } catch (error) {
      console.log(error)
      return { success: false, error: true } as any
    }
  }
}

// ANNOUNCEMENT ACTIONS
// CREATE ANNOUNCEMENT
export const createAnnouncement = async (
  currentState: CurrentState,
  data: Announcement
) => {
  try {
    await db.announcement.create({
      data: {
        title: data.title,
        from: data.from,
        desc: data.desc,
        img: data.img,
        districtId: data.districtId,
      },
    })
  } catch (error) {
    console.error(error)
    return { success: false, error: true }
  }
}

// UPDATE ANNOUNCEMENT
export const updateAnnouncement = async (
  currentState: CurrentState,
  data: Announcement
) => {
  try {
    await db.announcement.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        from: data.from,
        desc: data.desc,
        img: data.img,
        districtId: data.districtId,
      },
    })
  } catch (error) {
    console.error(error)
    return { success: false, error: true }
  }
}

// DELETE ANNOUNCEMENT
export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData
) => {
  const id = data.get('id') as string

  if (id) {
    try {
      await db.announcement.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      console.error(error)
      return { success: false, error: true }
    }
  }
}
function async(arg0: any) {
  throw new Error('Function not implemented.')
}
