import { relations, sql } from 'drizzle-orm';
import * as t from 'drizzle-orm/pg-core';

export const timestamp = {
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const userRole = t.pgEnum('userRole', ['admin', 'customer']);
export const productStatus = t.pgEnum('productStatus', [
  'draft',
  'published',
  'out-of-stock',
]);
export const orderStatus = t.pgEnum('orderStatus', [
  'pending',
  'paid',
  'cancelled',
]);
export const userGender = t.pgEnum('userGender', [
  'male',
  'female',
  'prefer-not-to-answer',
]);

// Tables
export const UserTable = t.pgTable(
  'users',
  {
    id: t.uuid('id').defaultRandom().primaryKey(),
    firstName: t.varchar('firstname', { length: 255 }).notNull(),
    lastName: t.varchar('lastname', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull(),
    phone: t.varchar('phone', { length: 255 }),
    clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    gender: userGender('gender'),
    imageUrl: t.varchar('image_url', { length: 255 }),
    isActive: t.boolean().default(true),
    ...timestamp,
  },
  (table) => [t.uniqueIndex('clerk_user_id_idx').on(table.clerkUserId)],
);

export const AddressTable = t.pgTable('addresses', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  address1: t.varchar('address1', { length: 255 }).notNull(),
  address2: t.varchar('address2', { length: 255 }),
  city: t.varchar('city', { length: 255 }).notNull(),
  state: t.varchar('state', { length: 255 }).notNull(),
  zip: t.varchar('zip', { length: 255 }).notNull(),
  country: t.varchar('country', { length: 255 }).notNull(),
  ...timestamp,
});

export const ProductTable = t.pgTable(
  'products',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull(),
    sanityId: t.varchar('sanity_id', { length: 255 }).notNull().unique(),
    sanitySlug: t.varchar('sanity_slug', { length: 255 }).notNull().unique(),
    sanitySku: t.varchar('sanity_sku', { length: 255 }).notNull().unique(),
    priceInCents: t.integer('price_in_cents').notNull(),
    productInStock: t.integer('product_in_stock').notNull(),
    status: productStatus('status').notNull().default('published'),
    imageUrl: t.varchar('image_url', { length: 255 }),
    isDeleted: t.boolean('is_deleted').default(false).notNull(),
    ...timestamp,
  },
  (table) => [t.uniqueIndex('sanity_slug_idx').on(table.sanitySlug)],
);

export const OrderTable = t.pgTable(
  'orders',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    stripeCheckoutSessionId: t
      .varchar('stripe_checkout_session_id', {
        length: 255,
      })
      .unique(),
    stripePaymentIntentId: t.varchar('stripe_payment_intent_id', {
      length: 255,
    }),
    status: orderStatus('status').default('pending').notNull(),
    totalInCentsSnapshot: t.integer('total_in_cents_snapshot').notNull(),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('orders_user_created_idx').on(table.userId, table.createdAt),
  ],
);

export const OrderItemTable = t.pgTable(
  'order_items',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    orderId: t
      .uuid('order_id')
      .references(() => OrderTable.id, { onDelete: 'cascade' })
      .notNull(),
    priceInCentsSnapShot: t.integer('price_in_cents_snapshot').notNull(),
    quantity: t.integer('quantity').notNull().default(1),
    ...timestamp,
  },
  (table) => [
    t
      .uniqueIndex('order_products_created_idx')
      .on(table.productId, table.createdAt),
  ],
);

export const ReviewTable = t.pgTable(
  'reviews',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    reviewAt: t
      .timestamp('review_at', { withTimezone: true })
      .notNull()
      .defaultNow(),
    productId: t
      .uuid('product_id')
      .references(() => ProductTable.id, { onDelete: 'cascade' })
      .notNull(),
    title: t.varchar('title', { length: 255 }).notNull(),
    body: t.text('body'),
    rating: t.integer('rating').notNull().default(1),
    imageUrl: t.varchar('image_url', { length: 255 }),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('user_product_review_idx').on(table.userId, table.productId),
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);

export const NewsletterSubscriptionsTable = t.pgTable(
  'newsletter_subscriptions',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull(),
    email: t.varchar('email', { length: 255 }).notNull().unique(),
    ...timestamp,
  },
);

export const ContactTable = t.pgTable('contacts', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  name: t.varchar('name', { length: 255 }).notNull(),
  email: t.varchar('email', { length: 255 }).notNull(),
  phone: t.varchar('phone', { length: 255 }).notNull(),
  subject: t.text().notNull(),
  message: t.text().notNull(),
  ...timestamp,
});

// relations
export const UserTableRelations = relations(UserTable, ({ many }) => ({
  addresses: many(AddressTable),
  orders: many(OrderTable),
  reviews: many(ReviewTable),
}));

export const AddressTableRelations = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
}));

export const ProductTableRelations = relations(ProductTable, ({ many }) => ({
  orderItems: many(OrderItemTable),
  reviews: many(ReviewTable),
}));

export const OrderTableRelations = relations(OrderTable, ({ one, many }) => ({
  orderItems: many(OrderItemTable),
  user: one(UserTable, {
    fields: [OrderTable.userId],
    references: [UserTable.id],
  }),
}));

export const OrderItemTableRelations = relations(OrderItemTable, ({ one }) => ({
  product: one(ProductTable, {
    fields: [OrderItemTable.productId],
    references: [ProductTable.id],
  }),
  order: one(OrderTable, {
    fields: [OrderItemTable.orderId],
    references: [OrderTable.id],
  }),
}));

export const ReviewTableRelations = relations(ReviewTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ReviewTable.userId],
    references: [UserTable.id],
  }),
  product: one(ProductTable, {
    fields: [ReviewTable.productId],
    references: [ProductTable.id],
  }),
}));
