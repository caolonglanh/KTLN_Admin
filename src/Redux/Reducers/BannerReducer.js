//BANNER LIST
import {
  BANNER_CREATE_FAIL,
  BANNER_CREATE_REQUEST,
  BANNER_CREATE_RESET,
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
  BANNER_UPDATE_RESET,
  BANNER_UPDATE_SUCCESS,
} from "./../Constants/BannerConstant";
export const bannerListReducer = (state = { banners: [] }, action) => {
  switch (action.type) {
    case BANNER_LIST_REQUEST:
      return { loading: true, banners: [] };
    case BANNER_LIST_SUCCESS:
      return { loading: false, banners: action.payload.banners };
    case BANNER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//CREATE BANNER
export const bannerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BANNER_CREATE_REQUEST:
      return { loading: true };
    case BANNER_CREATE_SUCCESS:
      return { loading: false, success: true, banner: action.payload };
    case BANNER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

//EDIT BANNER
export const bannerEditReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_EDIT_REQUEST:
      return { ...state, loading: true };
    case BANNER_EDIT_SUCCESS:
      return { loading: false, banner: action.payload };
    case BANNER_EDIT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//UPDATE BANNER
export const bannerUpdateReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_UPDATE_REQUEST:
      return { loading: true };
    case BANNER_UPDATE_SUCCESS:
      return { loading: false, success: true, banner: action.payload };
    case BANNER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BANNER_UPDATE_RESET:
      return { banner: {} };

    default:
      return state;
  }
};

//DELETE BANNER
export const bannerDeleteReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_DELETE_REQUEST:
      return { loading: true };
    case BANNER_DELETE_SUCCESS:
      return { loading: false, success: true, banner: action.payload };
    case BANNER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    // case BANNER_DELETE_RESET:
    //   return { BANNER: {} };
    default:
      return state;
  }
};

//RESTORE BANNER
export const bannerRestoreReducer = (state = { banner: {} }, action) => {
  switch (action.type) {
    case BANNER_RESTORE_REQUEST:
      return { loading: true };
    case BANNER_RESTORE_SUCCESS:
      return { loading: false, success: true, banner: action.payload };
    case BANNER_RESTORE_FAIL:
      return { loading: false, error: action.payload };
    // case BANNER_DELETE_RESET:
    //   return { BANNER: {} };
    default:
      return state;
  }
};
