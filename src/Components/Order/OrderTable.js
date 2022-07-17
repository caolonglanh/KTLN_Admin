import React, { useEffect, useMemo, useState, useRef } from "react";
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
import PaginationOrder from "../Pagination/PaginationOrder";
import { listOrder } from "../../Redux/Action/OrderActions";

const OrderTable = (props) => {
  const { orders } = props;
  const dispatch = useDispatch();
  //GET LIST PRODUCTS

  //   const orderAll = useSelector((state) => state.orderAll);
  //   const { loading, error, orders } = orderAll;
  const navigate = useNavigate();

  //FILTER PRODUCT
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const filteredItems = orders.filter(
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

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = orders.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const inputE1 = useRef("");
  const getSearchTerm = () => {
    props.searchKeyword(inputE1.current.value);
  };
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="w-full sm:px-6">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              ĐƠN HÀNG
            </p>
            {/* <input
              ref={inputE1}
              type="text"
              name="email"
              id="email"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="you@example.com"
              value={props.term}
              onChange={getSearchTerm}
            /> */}
          </div>
        </div>
        <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto">
          <table className="w-full whitespace-nowrap table-fixed">
            <thead>
              <tr className="h-16 w-full text-sm leading-none text-gray-800">
                <th className="font-normal text-left pl-6">Đơn hàng</th>
                <th className="font-normal text-left pl-20">Tổng giá</th>
                <th className="font-normal text-left pl-20">
                  Trạng thái xác nhận
                </th>
                <th className="font-normal text-left pl-20">
                  Trạng thái giao hàng
                </th>
                <th className="font-normal text-left pl-20">Chi tiết</th>
              </tr>
            </thead>
            <tbody className="w-full ">
              {currentPosts.map((item, index) => (
                <tr
                  key={item._id}
                  className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                >
                  <td className="pl-4 cursor-pointer">
                    <div className="flex items-center">
                      <div className="pl-2">
                        <p className="font-medium">{item._id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="pl-20 ">
                    <p
                      className="font-medium text-ellipsis overflow-hidden whitespace-nowrap
"
                    >
                      {item.Amount}
                    </p>
                  </td>

                  <td className="pl-20">
                    {item.isConfirmed ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Đã xác nhận
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Chưa xác nhận
                      </span>
                    )}
                  </td>
                  <td className="pl-20">
                    {item.isDelivered ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Đã chuyển
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Chưa chuyển
                      </span>
                    )}
                  </td>
                  <td className="px-7 pl-20 2xl:px-0 ">
                    {/* <td className="px-7 pl-20 2xl:px-0 mt-8 grid grid-cols-2 gap-4 place-content-center"> */}
                    {/* <IconButton aria-label="view">
                      <PageviewIcon color="success" />
                    </IconButton> */}
                    <div className="flex items-center">
                      <EyeIcon
                        onClick={() => navigate(`/order/${item._id}/edit`)}
                        className="w-5 h-5 text-yellow-500"
                      />
                      {/* {item.isDeleted ? (
                        <>
                          <RefreshIcon
                            onClick={() => navigate(`/restore/${item._id}`)}
                            className="w-5 h-5 text-green-500"
                          />
                        </>
                      ) : (
                        <>
                          <TrashIcon
                            onClick={() => navigate(`/product/${item._id}`)}
                            className="w-5 h-5 text-red-500"
                          />
                        </>
                      )} */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationOrder
            postsPerPage={postsPerPage}
            totalPosts={orders.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
};

export default OrderTable;
