import React from "react";
import { useSelector } from "react-redux";
import ProducStatistics from "./ProductStatistics";
import SaleStatistics from "./SaleStatistics";
import TopTotal from "./TopTotal";
// import TopTotal from "./TopTotal";

const Main = () => {
  const orderAll = useSelector((state) => state.orderAll);
  const { loading, error, orders } = orderAll;
  const productList = useSelector((state) => state.productList);
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const { products } = productList;

  return (
    <section className="content-main">
      {/* <TopTotal orders={orders} products={products} users={users} /> */}
      <TopTotal orders={orders} products={products} users={users} />
      <div className="grid-rows-2">
        <SaleStatistics />
        <ProducStatistics />
      </div>
    </section>
  );
};

export default Main;
