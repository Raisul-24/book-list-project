// Star.tsx
import React from "react";
import booksData from "../../data/bookData.json";

interface StarProps {
   onSelect: (id: number) => void;
}

const Star: React.FC<StarProps> = ({ onSelect }) => {
   const firstBook = (booksData as any[])[0];

   if (!firstBook) return <p>No books available</p>;

   return (
      <div>
         <button
            className="w-full p-2 text-right hover:border-b btn btn-xs md:btn-sm btn-ghost "
            onClick={() => onSelect(firstBook.id)}
         >
            {firstBook.title} <span> -</span>
         </button>
      </div>
   );
};

export default Star;