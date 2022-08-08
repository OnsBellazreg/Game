import React from 'react';

export default function OptionButtons() {
  return (
    <footer className="text-center lg:text-left bg-[#0A3847] text-white fixed bottom-0 w-full">
    <div className="flex justify-center items-center lg:justify-between p-6  border-gray-300">
      <div className="mr-12 hidden lg:block">
        <img src='/src/assets/JET.svg' alt='Logo'/>
      </div>
      <div className="flex justify-center">
        <a href="#" className="mr-6 text-white text-sm">
        Cookie statement
        </a>
        <a href="#" className="mr-6 text-gray-600 text-sm">
        © 2021 Takeaway.com
        </a>
      </div>
    </div>
       </footer>
  
    
  )
}
