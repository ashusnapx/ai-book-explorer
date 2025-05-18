"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputField } from "./FormInputField";
import { Form } from "./ui/form";
import { Button } from "./ui/button";
import { z } from "zod";

const bookSchema = z.object({
  name: z.string().min(1, "Book name is required"),
  author: z.string().min(1, "Author is required"),
  userRating: z.number().min(0).max(5).optional().nullable(),
  reviews: z.number().int().min(0).optional().nullable(),
  price: z.number().min(0).optional().nullable(),
  year: z.number().int().min(0).optional().nullable(),
  genre: z.string().optional().nullable(),
});

type BookFormValues = z.infer<typeof bookSchema>;

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
        const err = await res.json();
        alert("Failed: " + JSON.stringify(err));
        return;
      }

      alert("Book added!");
      form.reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      alert("Unexpected error");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 max-w-md mx-auto'
      >
        <FormInputField
          control={form.control}
          name='name'
          label='Book Name'
          placeholder='Enter book name'
        />
        <FormInputField
          control={form.control}
          name='author'
          label='Author'
          placeholder='Enter author name'
        />
        <FormInputField
          control={form.control}
          name='userRating'
          label='User Rating (0-5)'
          placeholder='e.g. 4.3'
          type='number'
          isNumber
          step={0.1}
          min={0}
          max={5}
        />
        <FormInputField
          control={form.control}
          name='reviews'
          label='Reviews (integer)'
          placeholder='e.g. 10247'
          type='number'
          isNumber
          step={1}
          min={0}
        />
        <FormInputField
          control={form.control}
          name='price'
          label='Price (USD)'
          placeholder='e.g. 25'
          type='number'
          isNumber
          step={0.01}
          min={0}
        />
        <FormInputField
          control={form.control}
          name='year'
          label='Year'
          placeholder='e.g. 2015'
          type='number'
          isNumber
          step={1}
          min={0}
        />
        <FormInputField
          control={form.control}
          name='genre'
          label='Genre'
          placeholder='e.g. Fiction'
        />
        <Button type='submit'>Add Book</Button>
      </form>
    </Form>
  );
}
