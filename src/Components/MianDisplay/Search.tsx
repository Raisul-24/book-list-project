import { useState } from "react";
import booksData from "../../data/bookData.json";

interface Book {
  id: number;
  title: string;
  content: string[];
}

interface Props {
  setSelectedBookId: (id: number) => void;
}

const Search = ({ setSelectedBookId }: Props) => {
  const [query, setQuery] = useState("");

  // Filter books based on query
  const filteredBooks = (booksData as Book[]).filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  // When book is selected
  const handleSelect = (id: number) => {
    setSelectedBookId(id);
    setQuery(""); // Clear query after selecting
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto p-4">
      {/* Input field */}
      <input
        type="text"
        placeholder="ابحث عن عنوان..."
        className="input w-full text-right bg-gray-800 placeholder-white text-white"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Show matching titles or all */}
      <ul className="mt-3 space-y-2">
        {(query ? filteredBooks : booksData).map((book) => (
          <li key={book.id} className="border-b lg:mx-3">
            <button
              onClick={() => handleSelect(book.id)}
              className="btn btn-xs lg:btn-sm btn-ghost justify-end w-full text-right"
            >
              {book.title} <span className="hidden lg:flex"> -</span>
            </button>
          </li>
        ))}
      </ul>

      {/* No results */}
      {query && filteredBooks.length === 0 && (
        <p className="text-sm text-right mt-2 text-gray-300">
          لم يتم العثور على نتائج.
        </p>
      )}
    </div>
  );
};

export default Search;
