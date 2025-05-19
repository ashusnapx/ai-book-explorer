"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { CopilotChat, CopilotKitCSSProperties } from "@copilotkit/react-ui";
import { useCopilotAction } from "@copilotkit/react-core";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { BadgeCheck } from "lucide-react";

interface BookRecommendation {
  name: string;
  author: string;
  userRating: number;
  reviews: number;
  price: number;
  year: number;
  genre: string;
}

export default function ChatInterface() {
  const [bookRecommendations, setBookRecommendations] = useState<
    BookRecommendation[]
  >([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useCopilotAction({
    name: "showBookRecommendation",
    description:
      "Display one or more book recommendations with option to save each",
    parameters: [
      { name: "name", type: "string", required: true },
      { name: "author", type: "string", required: true },
      { name: "userRating", type: "number", required: true },
      { name: "reviews", type: "number", required: true },
      { name: "price", type: "number", required: true },
      { name: "year", type: "number", required: true },
      { name: "genre", type: "string", required: true },
    ],
    handler: async (book) => {
      setBookRecommendations((prev) => [...prev, book]);
    },
  });

  const saveBook = async (book: BookRecommendation, index: number) => {
    try {
      await axios.post("/api/books", book);
      toast.success(`"${book.name}" saved to your library.`);
      setBookRecommendations((prev) => prev.filter((_, i) => i !== index));
    } catch {
      toast.error("Failed to save the book. Please try again.");
    }
  };

  // Auto scroll to bottom when new book recommendation added
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [bookRecommendations]);

  const customStyles: CopilotKitCSSProperties = {
    "--copilot-kit-primary-color": "#10B981",
    "--copilot-kit-contrast-color": "white",
    "--copilot-kit-background-color": "#F9FAFB",
    "--copilot-kit-secondary-color": "white",
    "--copilot-kit-secondary-contrast-color": "#111827",
    "--copilot-kit-separator-color": "#E5E7EB",
    "--copilot-kit-muted-color": "#6B7280",
  };

  return (
    <div
      className='min-h-screen bg-gray-50 flex items-center justify-center p-4'
      style={customStyles}
    >
      <Card className='w-full max-w-2xl h-[90vh] rounded-2xl shadow-xl flex flex-col border border-gray-200'>
        <CardHeader className='bg-white rounded-t-2xl px-6 py-4 flex items-center justify-between border-b border-gray-200'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold select-none'>
              AI
            </div>
            <div className='flex flex-col'>
              <CardTitle className='text-base font-semibold'>
                AI Book Assistant
              </CardTitle>
              <span className='text-xs text-gray-500 flex items-center gap-1 select-none'>
                <BadgeCheck className='w-3 h-3 text-emerald-500' />
                Online
              </span>
            </div>
          </div>
        </CardHeader>

        {/* ScrollArea with ref for auto scroll */}
        <ScrollArea
          className='flex-1 px-6 py-4 space-y-6 overflow-y-auto'
          ref={scrollRef}
        >
          <CopilotChat
            instructions={`You're a helpful book assistant. When you recommend a book, call the \`showBookRecommendation\` action for each book.`}
            labels={{
              initial: "Hi there! Ask me to recommend or summarize books.",
              title: "AI Book Assistant",
              placeholder: "Type your question here...",
              stopGenerating: "Stop",
              regenerateResponse: "Regenerate",
            }}
            className='copilotKitChat'
          />

          {bookRecommendations.length > 0 && (
            <div className='space-y-4'>
              {bookRecommendations.map((book, idx) => (
                <div
                  key={`${book.name}-${idx}`}
                  className='bg-gray-100 border border-gray-300 rounded-2xl px-5 py-4 shadow-sm'
                >
                  <div className='text-sm font-semibold text-gray-600'>
                    📚 Recommended:{" "}
                    <span className='text-gray-900 font-semibold'>
                      {book.name}
                    </span>{" "}
                    by {book.author}
                  </div>

                  <div className='text-xs grid grid-cols-2 gap-x-4 gap-y-1 text-gray-700'>
                    <span>⭐ Rating: {book.userRating}</span>
                    <span>💬 Reviews: {book.reviews}</span>
                    <span>💲 Price: {book.price}</span>
                    <span>📅 Year: {book.year}</span>
                    <span>🏷️ Genre: {book.genre}</span>
                  </div>

                  <Button
                    size='sm'
                    onClick={() => saveBook(book, idx)}
                    className='mt-2'
                  >
                    💾 Save to Library
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <CardContent className='border-t px-6 py-3 text-center text-xs text-gray-500 select-none'>
          Powered by CopilotKit · Styled with Tailwind & shadcn/ui
        </CardContent>
      </Card>
    </div>
  );
}
