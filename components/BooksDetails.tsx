"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

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
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSearchChange = debounce((value: string) => {
    setSearch(value.toLowerCase());
    setVisibleCount(PAGE_SIZE); // reset pagination on new search
  }, 300);

  const filteredBooks = useMemo(() => {
    return books.filter(
      (book) =>
        book.name.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search)
    );
  }, [books, search]);

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>📚 Search & Explore Books</h1>

      <Input
        type='text'
        placeholder='Search by title or author...'
        className='mb-6 max-w-md'
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      <Table>
        <TableCaption>List of available books</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[60px]'>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className='text-right'>Rating</TableHead>
            <TableHead className='text-right'>Reviews</TableHead>
            <TableHead className='text-right'>Price</TableHead>
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
                {book.userRating?.toFixed(1) ?? "—"}
              </TableCell>
              <TableCell className='text-right'>
                {book.reviews ?? "—"}
              </TableCell>
              <TableCell className='text-right'>
                {book.price ? `$${book.price.toFixed(2)}` : "—"}
              </TableCell>
              <TableCell className='text-right'>{book.year ?? "—"}</TableCell>
              <TableCell>{book.genre ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>
              Showing {visibleBooks.length} of {filteredBooks.length} result(s)
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {visibleCount < filteredBooks.length && (
        <div className='mt-4 text-center'>
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition'
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
