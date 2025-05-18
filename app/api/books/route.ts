import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const books = await prisma.book.findMany();
  return NextResponse.json(books);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newBook = await prisma.book.create({
    data: {
      name: body.name,
      author: body.author,
      userRating: body.userRating || null,
      reviews: body.reviews || null,
      price: body.price || null,
      year: body.year || null,
      genre: body.genre || null,
    },
  });

  return NextResponse.json(newBook, { status: 201 });
}
