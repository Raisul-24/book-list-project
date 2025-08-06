
import { useEffect, useRef } from "react";
import { BsDashLg } from "react-icons/bs";
import Modal1 from "./Modal1";
import Modal2 from "./Modal2";
import { TiArrowRightThick } from "react-icons/ti";

const NavbarTop = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth;
    }
  }, []);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-auto sm:overflow-x-visible"
    >
      <div className="flex flex-nowrap md:justify-end items-center md:gap-2 py-1 md:px-4 min-w-max">
        <Modal1 />
        <BsDashLg />
        <Modal2 />
        <div className="btn btn-ghost text-xl md:text-2xl text-sky-500 whitespace-nowrap">
          <TiArrowRightThick />
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
