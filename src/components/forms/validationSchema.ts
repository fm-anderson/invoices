import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Invalid email address" });

const customerNameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must contain at least 2 characters" })
  .max(30, { message: "Name must be 30 characters or fewer" });

const addressSchema = z
  .string()
  .trim()
  .regex(
    /^(\d+) ([A-Za-z0-9\s]+), ([A-Za-z\s]+), ([A-Z]{2}) (\d{5})$/,
    "Address must be in the format: '## Main St, City, MA #####'",
  );

const unitSchema = z
  .string()
  .trim()
  .regex(
    /^\((?:Apt|Unit) \d+\)$/,
    "Unit must be in the format: '(Apt #)' or '(Unit #)'",
  )
  .or(z.literal(""));

const phoneSchema = z
  .string()
  .trim()
  .min(10, {
    message: "Phone number must be at least 10 characters: (555) 123-4567",
  })
  .max(18, {
    message: "Phone number must be no more than 18 characters: (555) 123-4567",
  });

const itemNameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must contain at least 2 characters" })
  .max(50, { message: "Name must be 50 characters or fewer" });

const priceSchema = z
  .string()
  .trim()
  .regex(/^\d+(,\d{3})*(\.\d{1,2})?$/, {
    message:
      "Price must be a valid number format with up to two decimal places",
  });

const descSchema = z
  .string()
  .trim()
  .min(10, { message: "Description must contain at least 10 characters" })
  .max(200, { message: "Description must be 200 characters or fewer" });

const skuSchema = z
  .string()
  .trim()
  .regex(
    /^[A-Z0-9]{6}$/,
    "SKU must be 6 characters long, consisting of uppercase letters and numbers",
  );

export const customerSchema = {
  name: customerNameSchema,
  address: addressSchema,
  unit: unitSchema,
  email: emailSchema,
  phone: phoneSchema,
};

export const itemSchema = {
  name: itemNameSchema,
  desc: descSchema,
  price: priceSchema,
  sku: skuSchema,
};
