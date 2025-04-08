import 'server-only'
import { db } from '@/db/db'
import { attendees, events, rsvps } from '@/db/schema'
import { eq, sql, asc } from 'drizzle-orm'
import { delay } from './delay'

export const getEventForDashboard = async (userId: string) => {
  await delay()

  const data = db.query.events.findMany({
    where: eq(events.createdById, userId),
    columns: { id: true, name: true, startOn: true, status: true },
    with: {
      rsvps: true,
    },
    limit: 5,
    orderBy: [asc(events.startOn)],
  })

  return data ?? []
}
