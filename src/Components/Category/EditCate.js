import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  editCategory,
  listCategory,
  updateCategory,
} from "../../Redux/Action/CategoryAction";
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
import { CATEGORY_UPDATE_RESET } from "../../Redux/Constants/CategoryConstant";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditCategory = () => {
  const { id } = useParams();

  const [name, setName] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const categoryEdit = useSelector((state) => state.categoryEdit);
  const { loading, error, category } = categoryEdit;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      toast.success("Category Updated", ToastObjects);
    } else {
      if (!category.name || category._id !== id) {
        dispatch(editCategory(id));
      } else {
        setName(category.name);
      }
    }
  }, [category, dispatch, id, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault(dispatch(updateCategory({ _id: id, name })));
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
                      Chỉnh sửa thể loại
                    </h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên thể loại
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
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
                  onClick={() => navigate("/category/all")}
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

export default EditCategory;
