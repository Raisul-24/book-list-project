// MainDisplay.tsx
import { useEffect, useRef, useState } from "react";
import booksData from "../../data/bookData.json";
import Category from "./Category";
import Search from "./Search";
import Star from "./Star";
import Recent from "./Recent";
import { IoSearch } from "react-icons/io5";
import { FaRegStar, FaSlidersH } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { MdOutlineAccessTime } from "react-icons/md";


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

type TabType = "recent" | "star" | "search" | "category" | null;

const MainDisplay = () => {
  const [activeTab, setActiveTab] = useState<TabType>("category");
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const [recentBookIds, setRecentBookIds] = useState<number[]>(() => {
    const stored = localStorage.getItem("recentBooks");
    return stored ? JSON.parse(stored) : [];
  });

  const bookRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    if (selectedBookId !== null && bookRefs.current[selectedBookId]) {
      bookRefs.current[selectedBookId]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedBookId]);

  const handleBookSelect = (id: number) => {
    setSelectedBookId(id);

    setRecentBookIds((prev) => {
      const updated = [id, ...prev.filter((bookId) => bookId !== id)].slice(0, 10);
      localStorage.setItem("recentBooks", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen flex md:flex-row">
      {/* Left Content Area */}
      <div className="w-full pl-1 md:w-2/3 space-y-10 overflow-y-scroll max-h-screen" style={{ direction: "rtl" }}>
        <div style={{ direction: "ltr", textAlign: "right" }}>
          {(booksData as Book[]).map((book) => (
            <div key={book.id}
              ref={(el) => {
                bookRefs.current[book.id] = el;
              }}
              className="ml-1">
              <h2 className="text-xl md:text-2xl font-bold border m-1 rounded-sm border-white p-5 md:p-8 text-sky-400">
                {book.title}
              </h2>
              <div className="space-y-2 border m-1 md:text-lg rounded-sm p-5 md:p-8 pl-5 md:pl-28 lg:pl-42">
                {book.content.map((para, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              {Array.isArray(book.footnotes) && book.footnotes.length > 0 && (
                <div className="border m-1 rounded-sm p-5 md:p-8 pl-5 md:pl-28 lg:pl-42 text-sm text-gray-600 space-y-2">
                  <h3 className="font-semibold mb-2">الهوامش:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {book.footnotes.map((note, idx) => (
                      <li key={idx}>
                        {note.text} – <span className="italic">{note.reference}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar for medium and large devices */}
      <div className="hidden md:flex md:flex-col md:w-1/3 h-screen  border-l">
        <div className="sticky top-0 z-20 flex justify-around items-center shadow px-4 py-2">
          <button
            onClick={() => setActiveTab("recent")}
            className={`btn btn-ghost text-xl ${activeTab === "recent" ? "bg-gray-800" : ""}`}
          >
            <MdOutlineAccessTime />
          </button>
          <button
            onClick={() => setActiveTab("star")}
            className={`btn btn-ghost text-xl ${activeTab === "star" ? "bg-gray-800" : ""}`}
          >
            <FaRegStar />
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`btn btn-ghost text-xl ${activeTab === "search" ? "bg-gray-800" : ""}`}
          >
            <IoSearch />
          </button>
          <button
            onClick={() => setActiveTab("category")}
            className={`btn btn-ghost text-xl ${activeTab === "category" ? "bg-gray-800" : ""}`}
          >
            <RiMenu3Fill />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          {activeTab === "recent" && <Recent recentBookIds={recentBookIds} onSelect={handleBookSelect} />}
          {activeTab === "star" && <Star onSelect={handleBookSelect} />}
          {activeTab === "search" && <Search setSelectedBookId={handleBookSelect} />}
          {activeTab === "category" && (
            <Category showCategories={true} setShowCategories={() => { }} setSelectedBookId={handleBookSelect} />
          )}
        </div>
      </div>


      {/* Drawer Button & Sidebar for Small Devices */}
      <div className="md:hidden">
        <label
          htmlFor="my-drawer-4"
          className="drawer-button fixed bottom-2 right-2 z-50 bg-gray-800 text-white p-3 text-xl rounded-xl"
        >
          <FaSlidersH />
        </label>

        {/* Drawer Component */}
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content"></div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <div className="menu bg-base-200 text-base-content min-h-full w-64 p-4 space-y-4">
              <div className="flex justify-around mb-2">
                <button
                  onClick={() => setActiveTab("recent")}
                  className={`btn btn-ghost text-xl ${activeTab === "recent" ? "bg-gray-800" : ""}`}
                >
                  <MdOutlineAccessTime />
                </button>
                <button
                  onClick={() => setActiveTab("star")}
                  className={`btn btn-ghost text-xl ${activeTab === "star" ? "bg-gray-800" : ""}`}
                >
                  <FaRegStar />
                </button>
                <button
                  onClick={() => setActiveTab("search")}
                  className={`btn btn-ghost text-xl ${activeTab === "search" ? "bg-gray-800" : ""}`}
                >
                  <IoSearch />
                </button>
                <button
                  onClick={() => setActiveTab("category")}
                  className={`btn btn-ghost text-xl ${activeTab === "category" ? "bg-gray-800" : ""}`}
                >
                  <RiMenu3Fill />
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "recent" && <Recent recentBookIds={recentBookIds} onSelect={handleBookSelect} />}
              {activeTab === "star" && <Star onSelect={handleBookSelect} />}
              {activeTab === "search" && <Search setSelectedBookId={handleBookSelect} />}
              {activeTab === "category" && (
                <Category showCategories={true} setShowCategories={() => { }} setSelectedBookId={handleBookSelect} />
              )}
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default MainDisplay;