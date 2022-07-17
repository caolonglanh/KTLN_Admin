import {
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  ORDER_ALL_FAIL,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_CONFIRMED_FAIL,
  ORDER_CONFIRMED_REQUEST,
  ORDER_CONFIRMED_RESET,
  ORDER_CONFIRMED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_RESET,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../Constants/OrderConstant";

export const ordertListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// export const myOrdersReducer = (state = { orders: [] }, action) => {
//   switch (action.type) {
//     case MY_ORDERS_REQUEST:
//       return {
//         loading: true,
//       };

//     case MY_ORDERS_SUCCESS:
//       return {
//         loading: false,
//         orders: action.payload,
//       };

//     case MY_ORDERS_FAIL:
//       return {
//         loading: false,
//         error: action.payload,
//       };
//     // case CLEAR_ERRORS:
//     //   return {
//     //     ...state,
//     //     error: null,
//     //   };

//     default:
//       return state;
//   }
// };

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAIL_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ALL_REQUEST:
      return { loading: true };
    case ORDER_ALL_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_ALL_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//DELIVERED
export const orderDeliveredReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DELIVERED_RESET:
      return {};
    default:
      return state;
  }
};

//CONFIRMED
export const orderConfirmedReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CONFIRMED_REQUEST:
      return { loading: true };
    case ORDER_CONFIRMED_SUCCESS:
      return { loading: false, success: true };
    case ORDER_CONFIRMED_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_CONFIRMED_RESET:
      return {};
    default:
      return state;
  }
};
