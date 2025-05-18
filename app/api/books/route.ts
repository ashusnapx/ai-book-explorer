import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Zod schema for book validation
const bookSchema = z.object({
  name: z.string().min(1, "Book name is required"),
  author: z.string().min(1, "Author is required"),
  userRating: z.number().nullable().optional(),
  reviews: z.number().nullable().optional(),
  price: z.number().nullable().optional(),
  year: z.number().nullable().optional(),
  genre: z.string().nullable().optional(),
});

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate and parse input using Zod schema
    // Also transform nullables if strings come from client (optional)
    const parsed = bookSchema.parse({
      name: body.name,
      author: body.author,
      userRating:
        typeof body.userRating === "number"
          ? body.userRating
          : body.userRating
          ? parseFloat(body.userRating)
          : null,
      reviews:
        typeof body.reviews === "number"
          ? body.reviews
          : body.reviews
          ? parseInt(body.reviews)
          : null,
      price:
        typeof body.price === "number"
          ? body.price
          : body.price
          ? parseFloat(body.price)
          : null,
      year:
        typeof body.year === "number"
          ? body.year
          : body.year
          ? parseInt(body.year)
          : null,
      genre: body.genre || null,
    });

    const newBook = await prisma.book.create({
      data: parsed,
    });

    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
