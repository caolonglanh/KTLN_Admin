import React, { useState } from "react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const PaginationBanner = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [arrOfCurrentButtons, setArrCurrentButtons] = useState([]);

  const [currentButton, setCurrentButton] = useState(0);
  return (
    <>
      {/* <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={() => paginate(number)}
                href="/#"
                className="page-link"
              >
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav> */}

      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0">
        <>
          <div className="-mt-px w-0 flex-1 flex">
            {/* <a
              onClick={() =>
                setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
              }
              href="#"
              className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              <ArrowNarrowLeftIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Previous
            </a> */}
          </div>
          {pageNumbers.map((number, index) => (
            <div className="hidden md:-mt-px md:flex">
              <Link
                key={number}
                onClick={() => {
                  paginate(number);
                  setCurrentButton(index);
                }}
                to="/banners/#"
                className={
                  currentButton === index
                    ? "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                }
              >
                {number}
              </Link>
            </div>
          ))}
          <div className="-mt-px w-0 flex-1 flex justify-end">
            {/* <a
              onClick={() =>
                setCurrentButton((prev) =>
                  prev === pageNumbers.length ? prev : prev + 1
                )
              }
              href="#"
              className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Next
              <ArrowNarrowRightIcon
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </a> */}
          </div>
        </>
      </nav>
    </>
  );
};
export default PaginationBanner;
