import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listCategory } from "../../Redux/Action/CategoryAction";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstant";
import { createProduct } from "../../Redux/Action/ProductAction";
import Toast from "../ErrorLoading/Toast";
import Message from "../ErrorLoading/Error";
import Loading from "../ErrorLoading/Loading";
import {
  createBanner,
  editBanner,
  updateBanner,
} from "../../Redux/Action/BannerAction";
import {
  BANNER_CREATE_RESET,
  BANNER_UPDATE_RESET,
} from "../../Redux/Constants/BannerConstant";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditBanner = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [banner_url, setBanner_url] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const bannerEdit = useSelector((state) => state.bannerEdit);
  const { loading, error, banner } = bannerEdit;

  const bannerUpdate = useSelector((state) => state.bannerUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bannerUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BANNER_UPDATE_RESET });
      toast.success("Banner Updated", ToastObjects);
    } else {
      if (!banner.title || banner._id !== id) {
        dispatch(editBanner(id));
      } else {
        setTitle(banner.title);
        setBanner_url(banner.banner_url);
      }
    }
  }, [banner, dispatch, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault(dispatch(updateBanner({ _id: id, title, banner_url })));
  };
  return (
    <>
      <Toast />
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
          <form
            className="space-y-8 divide-y divide-gray-200"
            onSubmit={submitHandler}
          >
            {errorUpdate && (
              <Message variant="alert-danger">{errorUpdate}</Message>
            )}
            {loadingUpdate && <Loading />}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Chỉnh sửa banner
                    </h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên banner
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ảnh Banner
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          value={banner_url}
                          onChange={(e) => setBanner_url(e.target.value)}
                          type="text"
                          name="thumbnail"
                          id="thumbnail"
                          autoComplete="thumbnail"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  onClick={() => navigate("/banners")}
                  type="button"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBanner;
