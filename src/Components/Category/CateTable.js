import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listProduct } from "../../Redux/Action/ProductAction";
import FilterComponent from "../Filter/FilterComponent";
import {
  EyeIcon,
  PencilAltIcon,
  RefreshIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import PaginationCate from "../Pagination/PaginationCate";
import { listBanner } from "../../Redux/Action/BannerAction";
import { listCategory } from "../../Redux/Action/CategoryAction";

const CateTable = () => {
  const dispatch = useDispatch();
  //GET LIST PRODUCTS

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  //FILTER PRODUCT
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = categories.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const [selected, setSelected] = useState(0);
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  const navigate = useNavigate();

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = categories.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [show, setShow] = useState(true);
  return (
    <>
      <div className="w-full sm:px-6 ">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Thể loại
            </p>
            <div>
              <button
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                onClick={() => navigate("/category/new")}
              >
                <p className="text-sm font-medium leading-none text-white">
                  THÊM
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className=" whitespace-nowrap table-layout: auto">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-20">ID</th>
                <th className="font-normal text-left pl-60">Thể loại</th>
                <th className="font-normal text-left pl-80">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="w-full ">
              {currentPosts.map((item, index) => (
                <tr
                  key={item._id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-20 ">
                    <p
                      className="font-medium text-ellipsis overflow-hidden whitespace-nowrap
"
                    >
                      {item._id}
                    </p>
                  </td>
                  <td className="pl-60 ">
                    <p
                      className="font-medium text-ellipsis overflow-hidden whitespace-nowrap
"
                    >
                      {item.name}
                    </p>
                  </td>

                  <td className="px-7 pl-80 2xl:px-0 ">
                    {/* <td className="px-7 pl-20 2xl:px-0 mt-8 grid grid-cols-2 gap-4 place-content-center"> */}
                    {/* <IconButton aria-label="view">
                      <PageviewIcon color="success" />
                    </IconButton> */}
                    <div className="flex items-center">
                      <EyeIcon
                        onClick={() => navigate(`/category/${item._id}/edit`)}
                        className="w-5 h-5 text-yellow-500"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationCate
            postsPerPage={postsPerPage}
            totalPosts={categories.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};

export default CateTable;
