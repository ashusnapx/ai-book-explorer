"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "./FormInputField";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { z } from "zod";
import { toast } from "sonner";

const bookSchema = z.object({
  name: z.string().min(1, "Book name is required"),
  author: z.string().min(1, "Author is required"),
  userRating: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0)
    .max(5)
    .optional()
    .nullable(),
  reviews: z
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .min(0)
    .optional()
    .nullable(),
  price: z
    .number({ invalid_type_error: "Must be a number" })
    .min(0)
    .optional()
    .nullable(),
  year: z
    .number({ invalid_type_error: "Must be a number" })
    .int()
    .min(0)
    .optional()
    .nullable(),
  genre: z.string().optional().nullable(),
});

type BookFormValues = z.infer<typeof bookSchema>;

const fields = [
  {
    name: "name",
    label: "Book Name",
    placeholder: "Enter book name",
  },
  {
    name: "author",
    label: "Author",
    placeholder: "Enter author name",
  },
  {
    name: "userRating",
    label: "User Rating (0–5)",
    placeholder: "e.g. 4.3",
    type: "number",
    step: 0.1,
    min: 0,
    max: 5,
  },
  {
    name: "reviews",
    label: "Reviews",
    placeholder: "e.g. 12047",
    type: "number",
    step: 1,
    min: 0,
  },
  {
    name: "price",
    label: "Price (USD)",
    placeholder: "e.g. 25",
    type: "number",
    step: 0.01,
    min: 0,
  },
  {
    name: "year",
    label: "Year",
    placeholder: "e.g. 2015",
    type: "number",
    step: 1,
    min: 0,
  },
  {
    name: "genre",
    label: "Genre",
    placeholder: "e.g. Fiction",
  },
] as const;

export function AddBookForm() {
  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      name: "",
      author: "",
      userRating: undefined,
      reviews: undefined,
      price: undefined,
      year: undefined,
      genre: "",
    },
  });

  async function onSubmit(data: BookFormValues) {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error("❌ Failed to add book", {
          description: error.message || "Something went wrong",
        });
        return;
      }

      toast.success("✅ Book added successfully");
      form.reset();
    } catch (err) {
      toast.error("🚨 Unexpected error");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 max-w-2xl mx-auto w-full px-4'
      >
        {fields.map((field) => (
          <FormInputField
            key={field.name}
            control={form.control}
            name={field.name as keyof BookFormValues}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            isNumber={field.type === "number"}
            step={field.step}
            min={field.min}
            max={field.max}
          />
        ))}
        <div className='flex justify-center'>
          <Button type='submit' size='lg' className='w-full sm:w-auto'>
            ➕ Add Book
          </Button>
        </div>
      </form>
    </Form>
  );
}
