import booksData from "../../data/bookData.json";

interface Footnote {
  text: string;
  reference: string;
}

interface Book {
  id: number;
  title: string;
  content: string[];
  footnotes?: Footnote[];
}

interface Props {
  showCategories: boolean;
  setShowCategories: (val: boolean) => void;
  setSelectedBookId: (bookId: number) => void;
}

const Category = ({
  showCategories,
  setShowCategories,
  setSelectedBookId,
}: Props) => {

  const handleSelectBook = (book: Book) => {
    setSelectedBookId(book.id); 
    setShowCategories(false);
  };

  return (
    <div className="w-full relative">

      {/* Category List */}
      {showCategories && (
        <div className="w-full max-h-[80vh] overflow-y-auto lg:p-4">
          <ul className="space-y-3">
            {(booksData as Book[]).map((book) => (
              <li
                key={book.id}
                className="transition-all duration-300 text-right"
              >
                <button
                  onClick={() => handleSelectBook(book)}
                  className="btn btn-xs lg:btn-sm btn-ghost lg:font-semibold"
                >
                  {book.title} 
                  <span className="hidden md:flex"> -</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Category;
