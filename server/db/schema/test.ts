import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const test = pgTable('test', {
  id: serial('id'),
  uuid: text('uuid').primaryKey().$defaultFn(() => `uuid_${nanoid()}`),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
