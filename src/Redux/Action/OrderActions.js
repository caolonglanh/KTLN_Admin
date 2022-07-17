import axios from "axios";
import {
  ORDER_ALL_FAIL,
  ORDER_ALL_REQUEST,
  ORDER_ALL_SUCCESS,
  ORDER_CONFIRMED_FAIL,
  ORDER_CONFIRMED_REQUEST,
  ORDER_CONFIRMED_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  // MY_ORDERS_FAIL,
  // MY_ORDERS_REQUEST,
  // MY_ORDERS_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from "../Constants/OrderConstant";

export const listOrder = (orders) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/orders/me", config);
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

// export const myOrders = (orders) => async (dispatch, getState) => {
//   try {
//     dispatch({ type: MY_ORDERS_REQUEST });
//     const {
//       userLogin: { user },
//     } = getState();
//     const config = {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     };

//     const { data } = await axios.get("/api/v1/orders/me", config);

//     dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
//   } catch (error) {
//     dispatch({
//       type: MY_ORDERS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAIL_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/order/${id}`, config);
    dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDER_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const allOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ALL_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get("/api/v1/orders/all", config);
    dispatch({ type: ORDER_ALL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_ALL_FAIL,
      payload: error.response.data.message,
    });
  }
};

//ORDER DELIVERED
export const deliveredOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/v1/order/${order._id}/delivered`,
      {},
      config
    );
    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const confirmedOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CONFIRMED_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/v1/order/${order._id}/confirmed`,
      {},
      config
    );
    dispatch({ type: ORDER_CONFIRMED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CONFIRMED_FAIL,
      payload: error.response.data.message,
    });
  }
};
