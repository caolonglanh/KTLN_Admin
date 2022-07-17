import React, { useState } from "react";
import BannerTable from "../../Components/Banner/BannerTable";
import Navbar from "../../Components/Navbar/Navbar";
import OrderTable from "../../Components/Order/OrderTable";
import ProductTable from "../../Components/Product/ProductTable";
import ResSidebar from "../../Components/sidebar/ResSidebar";
import { useSelector } from "react-redux";
import StaticSidebar from "../../Components/sidebar/StaticSidebar";
import Loading from "../../Components/ErrorLoading/Loading";
import Message from "../../Components/ErrorLoading/Error";

const OrdersScreen = () => {
  const orderAll = useSelector((state) => state.orderAll);
  const { loading, error, orders } = orderAll;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newOrder = orders.filter((order) => {
        Object.values(order)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newOrder);
    } else {
      setSearchResults(orders);
    }
  };
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <ResSidebar />

      {/* Static sidebar for desktop */}
      <StaticSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <OrderTable
                    orders={searchTerm.length < 1 ? orders : searchResults}
                    term={searchTerm}
                    searchKeyword={searchHandler}
                  />
                )}
              </h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default OrdersScreen;
