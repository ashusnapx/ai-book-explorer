"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AddBookForm } from "@/components/AddBookForm";
import BooksDetails from "@/components/BooksDetails";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <main className='min-h-screen bg-muted text-muted-foreground antialiased'>
      {/* Hero Section */}
      <section className='relative isolate z-0 px-6 py-20 lg:py-32 text-center max-w-5xl mx-auto'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-4xl md:text-6xl font-extrabold text-foreground mb-4'
        >
          Discover books <span className='text-primary'>intelligently</span>.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className='text-lg md:text-xl max-w-2xl mx-auto text-muted-foreground'
        >
          AI Book Explorer helps you find, recommend, and manage your favorite
          books with the power of artificial intelligence.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className='mt-8'
        >
          <a href='#explore'>
            <Button
              size='lg'
              className='rounded-full px-6 py-4 text-lg shadow-md hover:shadow-lg transition'
            >
              🚀 Start Exploring
            </Button>
          </a>
        </motion.div>

        {/* Soft blur / glass effect */}
        <div className='absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl opacity-30 pointer-events-none'>
          <div className='aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-primary/20 to-transparent rounded-full'></div>
        </div>
      </section>

      {/* Features Section */}
      <section className='max-w-6xl mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              emoji: "🤖",
              title: "Smart Chat Assistant",
              desc: "Ask for recommendations or summaries in real time.",
            },
            {
              emoji: "➕",
              title: "Add Personal Books",
              desc: "Keep track of your own favorites and reading list.",
            },
            {
              emoji: "📚",
              title: "Explore & Discover",
              desc: "Get curated AI-powered book suggestions and get is saved.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <Card className='shadow-md hover:shadow-xl transition rounded-2xl bg-background/80 backdrop-blur-md border'>
                <CardContent className='p-6 space-y-3'>
                  <div className='text-3xl'>{feature.emoji}</div>
                  <h3 className='text-xl font-semibold text-foreground'>
                    {feature.title}
                  </h3>
                  <p className='text-sm text-muted-foreground'>
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tabs Section */}
      <section
        id='explore'
        className='max-w-6xl mx-auto px-4 py-20 scroll-mt-24'
      >
        <Tabs defaultValue='chat' className='w-full'>
          <TabsList className='grid grid-cols-3 rounded-xl bg-background/80 backdrop-blur-sm border mb-8'>
            <TabsTrigger value='chat'>💬 Chat Assistant</TabsTrigger>
            <TabsTrigger value='add'>➕ Add Book</TabsTrigger>
            <TabsTrigger value='list'>📖 Book List</TabsTrigger>
          </TabsList>

          <TabsContent value='chat'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='rounded-2xl border bg-background p-6 shadow-md'
            >
              <Chat />
            </motion.div>
          </TabsContent>

          <TabsContent value='add'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='rounded-2xl border bg-background p-6 shadow-md'
            >
              <h2 className='text-2xl font-semibold mb-4 text-center'>
                ➕ Add a Book
              </h2>
              <AddBookForm />
            </motion.div>
          </TabsContent>

          <TabsContent value='list'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='rounded-2xl border bg-background p-6 shadow-md'
            >
              <h2 className='text-2xl font-semibold mb-4 text-center'>
                📖 Book List
              </h2>
              <BooksDetails />
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className='border-t py-8 px-4 text-sm text-muted-foreground text-center'>
        <div className='flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto gap-4'>
          <p>
            &copy; {new Date().getFullYear()} AI Book Explorer. All rights
            reserved.
          </p>
          <div className='flex gap-4'>
            <a href='#' className='hover:underline'>
              Twitter
            </a>
            <a href='#' className='hover:underline'>
              GitHub
            </a>
            <a href='#' className='hover:underline'>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
