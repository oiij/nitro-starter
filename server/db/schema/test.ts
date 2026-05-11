import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { nanoid } from 'nanoid'

export const test = pgTable('test', {
  id: serial('id'),
  nanoid: text('nanoid').primaryKey().$defaultFn(() => `nanoid_${nanoid()}`),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
