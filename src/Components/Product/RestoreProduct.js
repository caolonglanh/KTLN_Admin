import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import {
  deleteProduct,
  editProduct,
  restoreProduct,
} from "../../Redux/Action/ProductAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_RESTORE_RESET,
} from "../../Redux/Constants/ProductConstant";
import Message from "../../Components/ErrorLoading/Error";
import Loading from "../../Components/ErrorLoading/Loading";

const ToastObjects = {
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  autoClose: 2000,
};
const RestoreProduct = () => {
  const { id } = useParams();

  const [isDeleted, setDeleted] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productRestore = useSelector((state) => state.productRestore);
  const {
    loading: loadingRestore,
    error: errorRestore,
    success: successRestore,
  } = productRestore;

  useEffect(() => {
    if (successRestore) {
      dispatch({ type: PRODUCT_RESTORE_RESET });
      toast.success("Product Restored", ToastObjects);
    } else {
      if (!product.name || product._id !== id) {
        dispatch(editProduct(id));
      } else {
        setDeleted(product.isDeleted);
      }
    }
  }, [product, dispatch, id, successRestore]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(restoreProduct(id));
  };
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Khôi phục sản phẩm
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Bạn có chắc muốn khôi phục chứ?</p>
        </div>
        <div className="mt-5">
          {errorRestore && (
            <Message variant="alert-danger">{errorRestore}</Message>
          )}
          {loadingRestore && <Loading />}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <></>
          )}
          <button
            onClick={submitHandler}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
          >
            Khôi phục
          </button>
          <button
            onClick={() => navigate("/products")}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
          >
            Không
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreProduct;
