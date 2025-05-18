import React from "react";
import { Button } from "./ui/button";
import { add_book_button, login_button, website_name } from "@/constants";

const Navbar = () => {
  return (
    <div className='flex flex-row items-center justify-between m-3'>
      <h1 className='text-2xl'>{website_name}</h1>
      <div>
        <Button>{login_button}</Button>
        <Button className='capitalize ml-2 '>{add_book_button}</Button>
      </div>
    </div>
  );
};

export default Navbar;
