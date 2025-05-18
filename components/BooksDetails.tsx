"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchBooks } from "@/store/slices/booksSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Book {
  id: number;
  name: string;
  author: string;
  userRating?: number;
  reviews?: number;
  price?: number;
  year?: number;
  genre?: string;
}

const PAGE_SIZE = 5;

export default function BooksDetails() {
  const dispatch = useAppDispatch();
  const books = useAppSelector((state) => state.books.books) as Book[];

  // State to track how many books to show
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Show only first visibleCount books
  const visibleBooks = books.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>All Books</h1>
      <Table>
        <TableCaption>
          A list of all available books with full details.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className='text-right'>Rating</TableHead>
            <TableHead className='text-right'>Reviews</TableHead>
            <TableHead className='text-right'>Price ($)</TableHead>
            <TableHead className='text-right'>Year</TableHead>
            <TableHead>Genre</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleBooks.map((book) => (
            <TableRow key={book.id}>
              <TableCell className='font-medium'>{book.id}</TableCell>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell className='text-right'>
                {book.userRating !== undefined
                  ? book.userRating.toFixed(1)
                  : "—"}
              </TableCell>
              <TableCell className='text-right'>
                {book.reviews ?? "—"}
              </TableCell>
              <TableCell className='text-right'>
                {book.price !== undefined ? `$${book.price.toFixed(2)}` : "—"}
              </TableCell>
              <TableCell className='text-right'>{book.year ?? "—"}</TableCell>
              <TableCell>{book.genre ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>
              Total Books: <span className='font-semibold'>{books.length}</span>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Load More button */}
      {visibleCount < books.length && (
        <div className='mt-4 text-center'>
          <button
            onClick={handleLoadMore}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
