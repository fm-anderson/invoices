import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email({ message: "Invalid email address" });

const nameSchema = z
  .string()
  .trim()
  .min(2, { message: "Name must contain at least 2 characters" })
  .max(30, { message: "Name must be 30 characters or fewer" });

const addressSchema = z
  .string()
  .trim()
  .regex(
    /^(\d+) ([A-Za-z0-9\s]+), ([A-Za-z\s]+), ([A-Z]{2}) (\d{5})$/,
    "Address must be in the format: 'Number Street, City, State Abbreviation Zipcode'",
  );

const phoneSchema = z
  .string()
  .trim()
  .min(10, {
    message: "Phone number must be at least 10 characters: (555) 123-4567",
  })
  .max(18, {
    message: "Phone number must be no more than 18 characters: (555) 123-4567",
  });

export const customerSchema = {
  name: nameSchema,
  address: addressSchema,
  email: emailSchema,
  phone: phoneSchema,
};
