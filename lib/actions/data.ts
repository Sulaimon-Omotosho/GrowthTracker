'use server'

import db from '@/prisma/db'

// Get Members COUNT
export const getUsersCount = async () => {
  try {
    const count = await db.user.count()
    return { success: true, count }
  } catch (error) {
    console.error('Error getting user count:', error)
    return { success: false, error: 'Failed to fetch user count' }
  } finally {
    await db.$disconnect()
  }
}

// Get Leaders Count
export const getLeadersCount = async () => {
  try {
    const count = await db.user.count({
      where: {
        OR: [
          { cellLeader: { isNot: null } },
          { zonalLeader: { isNot: null } },
          { districtPastor: { isNot: null } },
          { communityPastor: { isNot: null } },
          { TeamPastor: { isNot: null } },
          { hod: { isNot: null } },
        ],
      },
    })
    return { success: true, count }
  } catch (error) {
    console.error('Error getting leaders count:', error)
    return { success: false, error: 'Failed to fetch leaders count' }
  } finally {
    await db.$disconnect()
  }

  // Use Set to filter duplicates (if someone holds more than one role)
  // const uniqueCount = new Set(uniqueLeaders.map((u) => u.id)).size
}

// Get Counts By Role
export const getLeaderCountsByRole = async () => {
  try {
    const [
      cellLeaderCount,
      zonalLeaderCount,
      communityPastorCount,
      TeamPastorCount,
      districtPastorCount,
      hodCount,
    ] = await Promise.all([
      db.user.count({ where: { cellLeader: { isNot: null } } }),
      db.user.count({ where: { zonalLeader: { isNot: null } } }),
      db.user.count({ where: { communityPastor: { isNot: null } } }),
      db.user.count({ where: { districtPastor: { isNot: null } } }),
      db.user.count({ where: { TeamPastor: { isNot: null } } }),
      db.user.count({ where: { hod: { isNot: null } } }),
    ])

    return {
      success: true,
      counts: {
        cellLeaderCount,
        zonalLeaderCount,
        communityPastorCount,
        TeamPastorCount,
        districtPastorCount,
        hodCount,
      },
    }
  } catch (error) {
    console.error('Error getting leader counts:', error)
    return { success: false, error: 'Failed to fetch leader counts' }
  } finally {
    await db.$disconnect()
  }
}

// Get Workers Count
export const getWorkersCount = async () => {
  try {
    const count = await db.user.count({
      where: {
        OR: [
          { department: { isNot: null } },
          { districtPastor: { isNot: null } },
          { communityPastor: { isNot: null } },
          { TeamPastor: { isNot: null } },
          { hod: { isNot: null } },
          { zonalLeader: { isNot: null } },
          { cellLeader: { isNot: null } },
        ],
      },
    })
    return { success: true, count }
  } catch (error) {
    console.error('Error getting workers count:', error)
    return { success: false, error: 'Failed to fetch workers count' }
  } finally {
    await db.$disconnect()
  }

  // Use Set to filter duplicates (if someone holds more than one role)
  // const uniqueCount = new Set(uniqueLeaders.map((u) => u.id)).size
}

// const count = await db.user.count({
//   where: {
//     role: 'USER',
//     contactConsent: true,
//   },
// })
