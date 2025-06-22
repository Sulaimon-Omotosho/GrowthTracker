'use server'

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
