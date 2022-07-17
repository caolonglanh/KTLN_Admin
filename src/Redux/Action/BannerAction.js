import axios from "axios";
import {
  BANNER_CREATE_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_SUCCESS,
  BANNER_DELETE_FAIL,
  BANNER_DELETE_REQUEST,
  BANNER_DELETE_SUCCESS,
  BANNER_EDIT_FAIL,
  BANNER_EDIT_REQUEST,
  BANNER_EDIT_SUCCESS,
  BANNER_LIST_FAIL,
  BANNER_LIST_REQUEST,
  BANNER_LIST_SUCCESS,
  BANNER_RESTORE_FAIL,
  BANNER_RESTORE_REQUEST,
  BANNER_RESTORE_SUCCESS,
  BANNER_UPDATE_FAIL,
  BANNER_UPDATE_REQUEST,
  BANNER_UPDATE_SUCCESS,
} from "./../Constants/BannerConstant";

export const listBanner = () => async (dispatch) => {
  try {
    dispatch({ type: BANNER_LIST_REQUEST });
    const { data } = await axios.get("/api/v1/banners");
    dispatch({ type: BANNER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_LIST_FAIL,
      payload: error.response.data.message,
    });
  }
};

//CREATE BANNER
export const createBanner =
  (title, banner_url) => async (dispatch, getState) => {
    try {
      dispatch({ type: BANNER_CREATE_REQUEST });

      const {
        userLogin: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/v1/banners/new/`,
        { title, banner_url },
        config
      );
      dispatch({ type: BANNER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: BANNER_CREATE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//EDIT BANNER
export const editBanner = (id) => async (dispatch) => {
  try {
    dispatch({ type: BANNER_EDIT_REQUEST });
    const { data } = await axios.get(`/api/v1/banner/${id}`);
    dispatch({ type: BANNER_EDIT_SUCCESS, payload: data.banner });
  } catch (error) {
    dispatch({
      type: BANNER_EDIT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UPDATE BANNER
export const updateBanner = (banner) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_UPDATE_REQUEST });

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
      `/api/v1/banner/${banner._id}`,
      banner,
      config
    );
    dispatch({ type: BANNER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: BANNER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_UPDATE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//DELETE BANNER
export const deleteBanner = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_DELETE_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.delete(`/api/v1/banner/${id}`, config);
    dispatch({ type: BANNER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_DELETE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//BANNER RESTORE
export const restoreBanner = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BANNER_RESTORE_REQUEST });
    const {
      userLogin: { user },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/restore/banner/${id}`, config);
    console.log(config);
    dispatch({ type: BANNER_RESTORE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BANNER_RESTORE_FAIL,
      payload: error.response.data.message,
    });
  }
};
