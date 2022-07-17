import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { deleteProduct, editProduct } from "../../Redux/Action/ProductAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_DELETE_RESET } from "../../Redux/Constants/ProductConstant";
import Message from "../ErrorLoading/Error";
import Loading from "../ErrorLoading/Loading";
import { deleteBanner, editBanner } from "../../Redux/Action/BannerAction";
import { BANNER_DELETE_RESET } from "../../Redux/Constants/BannerConstant";

const ToastObjects = {
  position: "top-right",
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  autoClose: 2000,
};
const DelBanner = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [banner_url, setBanner_url] = useState("");

  const [isDeleted, setDeleted] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const bannerEdit = useSelector((state) => state.bannerEdit);
  const { loading, error, banner } = bannerEdit;

  const bannerDelete = useSelector((state) => state.bannerDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bannerDelete;

  useEffect(() => {
    if (successDelete) {
      dispatch({ type: BANNER_DELETE_RESET });
      toast.success("Banner Deleted", ToastObjects);
    } else {
      if (!banner.name || banner._id !== id) {
        dispatch(editBanner(id));
      } else {
        setTitle(banner.title);
        setBanner_url(banner.banner_url);
        setDeleted(banner.isDeleted);
      }
    }
  }, [banner, dispatch, id, successDelete]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(deleteBanner(id));
  };
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Xoá banner
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Bạn có chắc muốn xoá chứ?</p>
        </div>
        <div className="mt-5">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loadingDelete && <Loading />}
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
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
          >
            Xoá
          </button>
          <button
            onClick={() => navigate("/banners")}
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

export default DelBanner;
