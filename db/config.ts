import { defineDb, defineTable, column, NOW } from "astro:db";

const Customers = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    name: column.text(),
    address: column.text(),
    email: column.text(),
    phone: column.text(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

const Items = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    sku: column.text({ optional: true }),
    name: column.text(),
    desc: column.text({ optional: true }),
    price: column.number(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
});

const Invoices = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    url: column.text(),
    customer: column.text(),
    date: column.date(),
    dueDate: column.date(),
    total: column.number(),
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  },
  foreignKeys: [
    {
      columns: ["customer"],
      references: () => [Customers.columns.id],
    },
  ],
});

const InvoiceItems = defineTable({
  columns: {
    invoiceId: column.text(),
    itemId: column.text(),
    quantity: column.number(),
  },
  foreignKeys: [
    {
      columns: ["invoiceId"],
      references: () => [Invoices.columns.id],
    },
    {
      columns: ["itemId"],
      references: () => [Items.columns.id],
    },
  ],
});

export default defineDb({
  tables: { Customers, Items, Invoices, InvoiceItems },
});
