import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import UsersScreen from "./pages/UsersSceen";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";

import { allOrders } from "./Redux/Action/OrderActions";
import { listProduct } from "./Redux/Action/ProductAction";
import ProductsScreen from "./pages/Product/ProductsScreen";
import AdProdScreen from "./pages/Product/AdProdScreen";
import EditProScreen from "./pages/Product/EditProScreen";
import DelProdScreen from "./pages/Product/DelProdScreen";
import RestoreProScreen from "./pages/Product/RestoreProScreen";
import BannersScreen from "./pages/Banner/BannersScreen";
import AdBannerScreen from "./pages/Banner/AdBannerScreen";
import EditBanScreen from "./pages/Banner/EditBanScreen";
import DelBanScreen from "./pages/Banner/DelBanScreen";
import ResBanScreen from "./pages/Banner/ResBanScreen";
import OrderTable from "./Components/Order/OrderTable";
import OrdersScreen from "./pages/Order/OrderScreen";
import DetailOrderScreen from "./pages/Order/DetailOrderScreen";
import CateScreen from "./pages/Category/CateScreen";
import AddCateScreen from "./pages/Category/AddCateScreen";
import EditCateScreen from "./pages/Category/EditCateScreen";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<UsersScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsScreen />} />
          <Route path="/products/new" element={<AdProdScreen />} />
          <Route path="/product/:id/Edit" element={<EditProScreen />} />
          <Route path="/product/:id" element={<DelProdScreen />} />
          <Route path="/restore/:id" element={<RestoreProScreen />} />
          <Route path="/banners" element={<BannersScreen />} />
          <Route path="/banners/new" element={<AdBannerScreen />} />
          <Route path="/banner/:id/edit" element={<EditBanScreen />} />
          <Route path="/banner/:id" element={<DelBanScreen />} />
          <Route path="/restore/banner/:id" element={<ResBanScreen />} />
          <Route path="/orders/all" element={<OrdersScreen />} />
          <Route path="/order/:id/edit" element={<DetailOrderScreen />} />
          <Route path="/category/all" element={<CateScreen />} />
          <Route path="/category/new" element={<AddCateScreen />} />
          <Route path="/category/:id/edit" element={<EditCateScreen />} />
        </Routes>
      </Fragment>
    </Router>
  );
};

export default App;
