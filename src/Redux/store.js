import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDeleteReducer,
  productDetailReducer,
  productListReducer,
  productCreateReducer,
  productEditReducer,
  productUpdateReducer,
  productRestoreReducer,
} from "./Reducers/ProductReducer";
import {
  bannerCreateReducer,
  bannerDeleteReducer,
  bannerEditReducer,
  bannerListReducer,
  bannerRestoreReducer,
  bannerUpdateReducer,
} from "./Reducers/BannerReducer";
import {
  userDetailReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
} from "./Reducers/UserReducer";
import {
  orderAllReducer,
  orderConfirmedReducer,
  orderDeleteReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  ordertListReducer,
} from "./Reducers/OrderReducer";
import {
  categoryCreateReducer,
  categoryEditReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./Reducers/CategoryReducer";

const persistConfig = {
  key: "reducer",
  storage: storage,
  whitelist: ["userLogin"],
};

const reducer = combineReducers({
  productList: productListReducer,
  // productDetails: productDetailReducer,
  bannerList: bannerListReducer,
  userLogin: userLoginReducer,
  // userRegister: userRegisterReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  productRestore: productRestoreReducer,
  bannerCreate: bannerCreateReducer,
  bannerEdit: bannerEditReducer,
  bannerUpdate: bannerUpdateReducer,
  bannerDelete: bannerDeleteReducer,
  bannerRestore: bannerRestoreReducer,
  orderList: ordertListReducer,
  // myOrder: myOrdersReducer,
  orderDetail: orderDetailsReducer,
  userList: userListReducer,
  orderAll: orderAllReducer,
  orderDelivered: orderDeliveredReducer,
  orderConfirmed: orderConfirmedReducer,
  categoryList: categoryListReducer,
  categoryCreate: categoryCreateReducer,
  userDetail: userDetailReducer,
  categoryEdit: categoryEditReducer,
  categoryUpdate: categoryUpdateReducer,
});

const userFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const initialState = {
  userLogin: { user: userFromLocalStorage },
};

const middleware = [thunk];

// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;
const presistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  presistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { persistor, store };
