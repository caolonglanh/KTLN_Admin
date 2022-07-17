import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { listCategory } from "../../Redux/Action/CategoryAction";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../../Redux/Constants/ProductConstant";
import {
  createProduct,
  editProduct,
  updateProduct,
} from "../../Redux/Action/ProductAction";
import Toast from "../ErrorLoading/Toast";
import Message from "../ErrorLoading/Error";
import Loading from "../ErrorLoading/Loading";
import { useParams } from "react-router-dom";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditUpProduct = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [product_url, setProduct_url] = useState("");
  const [product_url1, setProduct_url1] = useState("");
  const [product_url2, setProduct_url2] = useState("");
  const [product_url3, setProduct_url3] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const categoryList = useSelector((state) => state.categoryList);
  const { loadingCategory, errorCategory, categories } = categoryList;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
      navigate("/products");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(editProduct(id));
      } else {
        setName(product.name);
        setDescription(product.description);
        setProduct_url(product.product_url);
        setProduct_url1(product.product_url1);
        setProduct_url2(product.product_url2);
        setProduct_url3(product.product_url3);
        setStock(product.stock);
        setPrice(product.price);
        setCategory(product.category);
      }
    }
  }, [product, dispatch, id, successUpdate]);
  console.log(category);
  const submitHandler = (e) => {
    e.preventDefault(
      dispatch(
        updateProduct({
          _id: id,
          name,
          price,
          description,
          product_url,
          product_url1,
          product_url2,
          product_url3,
          stock,
          category,
        })
      )
    );
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
                      Sản phẩm mới
                    </h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tên sản phẩm
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

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Số lượng
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="stock"
                          id="stock"
                          autoComplete="family-name"
                          required
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Mô tả
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          // defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ảnh Thumbnail
                      </label>
                      <div className="mt-1">
                        <input
                          required
                          value={product_url}
                          onChange={(e) => setProduct_url(e.target.value)}
                          type="text"
                          name="thumbnail"
                          id="thumbnail"
                          autoComplete="thumbnail"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ảnh 1
                      </label>
                      <div className="mt-1">
                        <input
                          value={product_url1}
                          onChange={(e) => setProduct_url1(e.target.value)}
                          type="text"
                          name="city"
                          id="city"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ảnh 2
                      </label>
                      <div className="mt-1">
                        <input
                          value={product_url2}
                          onChange={(e) => setProduct_url2(e.target.value)}
                          type="text"
                          name="state"
                          id="state"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="zip"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ảnh 3
                      </label>
                      <div className="mt-1">
                        <input
                          value={product_url3}
                          onChange={(e) => setProduct_url3(e.target.value)}
                          type="text"
                          name="zip"
                          id="zip"
                          autoComplete="postal-code"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Thể loại
                      </label>
                      <div className="mt-1">
                        <select
                          id="category"
                          name="category"
                          autoComplete="category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                        >
                          {categories.map((data) => (
                            <option key={data._id} value={data._id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Giá
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="price"
                          id="price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          autoComplete="family-name"
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
                  onClick={() => navigate("/products")}
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

export default EditUpProduct;
