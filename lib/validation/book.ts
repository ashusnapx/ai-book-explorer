import { z } from "zod";

export const bookSchema = z.object({
  name: z.string().min(1, "Book name is required"),
  author: z.string().min(1, "Author is required"),
  userRating: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : null))
    .refine((val) => val === null || (val >= 0 && val <= 5), {
      message: "User rating must be between 0 and 5",
    }),
  reviews: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : null)),
  price: z
    .string()
    .optional()
    .transform((val) => (val ? parseFloat(val) : null)),
  year: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : null)),
  genre: z.string().optional().nullable(),
});

export type BookFormValues = z.infer<typeof bookSchema>;
