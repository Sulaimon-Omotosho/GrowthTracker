'use server'

import db from '@/prisma/db'
import { CurrentState, FormModalProps } from '@/types'

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

// USER ACTION
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
