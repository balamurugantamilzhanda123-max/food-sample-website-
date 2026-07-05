import { z } from "zod";

export const emailSchema = z.string().email("Enter a valid email address");

export const signupSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: emailSchema,
  mobile: z.string().min(10, "Enter a valid mobile number")
});

export const addressSchema = z.object({
  label: z.string().min(2),
  recipientName: z.string().min(2),
  mobile: z.string().min(10),
  line1: z.string().min(4),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(5)
});

export const productSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().positive(),
  offerPrice: z.coerce.number().nonnegative().optional(),
  categoryId: z.string().min(1),
  stockQuantity: z.coerce.number().int().nonnegative(),
  description: z.string().min(10),
  variant: z.string().min(1),
  active: z.boolean().default(true)
});

export const returnRequestSchema = z.object({
  orderId: z.string().min(1),
  reason: z.string().min(3)
});

export const refundRequestSchema = z.object({
  orderId: z.string().min(1),
  reason: z.string().min(3)
});
