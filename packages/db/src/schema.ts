import { createId } from "@paralleldrive/cuid2";
import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

const updatedAndCreatedAt = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),
};

export const Post = sqliteTable("post", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => createId()),
  title: text("title", { length: 256 }).notNull(),
  content: text("content").notNull(),

  ...updatedAndCreatedAt,
});

export const zCreatePost = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Auth tables
export const User = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false),
  password: text("password"),
  name: text("name"),
  image: text("image"),
  ...updatedAndCreatedAt,
});

export const Session = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => User.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  ...updatedAndCreatedAt,
});

export const Account = sqliteTable(
  "accounts",
  {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => User.id, { onDelete: "cascade" }),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp",
    }),
    scope: text("scope"),
    idToken: text("id_token"),
    password: text("password"),
    ...updatedAndCreatedAt,
  },
  (table) => [unique().on(table.providerId, table.accountId)],
);

export const Verification = sqliteTable("verifications", {
  id: text("id").notNull().primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),

  ...updatedAndCreatedAt,
});

// Relations
export const UsersRelations = relations(User, ({ many }) => ({
  // posts: many(Post),
  sessions: many(Session),
  oauthAccounts: many(Account),
}));

export const SessionsRelations = relations(Session, ({ one }) => ({
  user: one(User, {
    fields: [Session.userId],
    references: [User.id],
  }),
}));

export const OauthAccountsRelations = relations(Account, ({ one }) => ({
  user: one(User, {
    fields: [Account.userId],
    references: [User.id],
  }),
}));
