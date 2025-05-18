import { AddBookForm } from "@/components/AddBookForm";
import BooksDetails from "@/components/BooksDetails";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <>
      <Chat/>
      <AddBookForm/>
      <BooksDetails />
    </>
  );
}
