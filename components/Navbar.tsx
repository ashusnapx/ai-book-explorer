import React from "react";

const Navbar = () => {
  return (
    <div className='flex flex-row items-center justify-center m-3'>
      <h1 className='text-4xl font-semibold'>
        <span>AI</span>
        <span className='italic text-primary'>Book.</span>
        <span>Explorer</span>
      </h1>
    </div>
  );
};

export default Navbar;
