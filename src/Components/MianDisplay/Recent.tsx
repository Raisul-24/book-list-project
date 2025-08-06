"use client";
import booksData from "../../data/bookData.json";

interface Book {
   id: number;
   title: string;
}

interface Props {
   recentBookIds: number[];
   onSelect: (id: number) => void;
}

const Recent = ({ recentBookIds, onSelect }: Props) => {
   const recentBooks = (booksData as Book[]).filter((book) =>
      recentBookIds.includes(book.id)
   );

   return (
      <div className="w-full max-h-[80vh] overflow-y-auto p-4">
         <ul className="space-y-3">
            {recentBooks.length > 0 ? (
               recentBooks.map((book) => (
                  <li key={book.id} className="border-b flex justify-between items-center ">
                     <h1 className="hidden md:flex">-</h1>
                     <button
                        onClick={() => onSelect(book.id)}
                        className="btn btn-xs lg:btn-sm btn-ghost w-full text-right"
                     >
                        {book.title}
                     </button>
                  </li>
               ))
            ) : (
               <p className="text-sm text-right text-gray-400">لا يوجد قراءات حديثة.</p>
            )}
         </ul>
      </div>
   );
};

export default Recent;
