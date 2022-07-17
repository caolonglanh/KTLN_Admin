import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmedOrder,
  deliveredOrder,
  getOrderDetails,
} from "../../Redux/Action/OrderActions";
import Loading from "../ErrorLoading/Loading";
import Message from "../ErrorLoading/Error";
import moment from "moment";

const DetailOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderDetail = useSelector((state) => state.orderDetail);
  const { loading, error, order } = orderDetail;

  const orderDelivered = useSelector((state) => state.orderDelivered);
  const { loading: loadingDelivered, success: successDelivered } =
    orderDelivered;

  const orderConfirmed = useSelector((state) => state.orderConfirmed);
  const { loading: loadingConfirmed, success: successConfirmed } =
    orderConfirmed;

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [dispatch, id, successDelivered, successConfirmed]);
  // useEffect(() => {
  //   dispatch(getOrderDetails(id));
  // }, [dispatch, id, successConfirmed]);
  const deliverHandler = () => {
    dispatch(deliveredOrder(order));
  };

  const confirmHandler = () => {
    dispatch(confirmedOrder(order));
  };
  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {/* <div className="flex justify-start item-start space-y-2 flex-col ">
            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
              <button className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800">
                Edit Details
              </button>
            </div>
            <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
              Order {order._id}
            </h1>
            <p className="text-base font-medium leading-6 text-gray-600">
              {moment(order.createdAt).format("lll")}
            </p>
          </div> */}
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Đơn #{order._id}
            </p>
            <p className="text-base font-medium leading-6 text-gray-600">
              Ngày đặt hàng: {moment(order.createdAt).format("lll")}
            </p>
            <div>
              <button
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-green-700 hover:bg-green-600 focus:outline-none rounded"
                onClick={() => navigate("/orders/all")}
              >
                <p className="text-sm font-medium leading-none text-white">
                  Trở lại
                </p>
              </button>
            </div>
          </div>
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                {order.orderItems.map((item, index) => (
                  <>
                    <div className="mt-6 md:mt-0 flex justify-start flex-col md:flex-row  items-start md:items-center space-y-4  md:space-x-6 xl:space-x-8 w-full ">
                      <div className="w-full md:w-40">
                        <img
                          className="w-full hidden md:block"
                          src={item.product_url}
                          alt="dress"
                        />
                        <img
                          className="w-full md:hidden"
                          src={item.product_url}
                          alt="dress"
                        />
                      </div>
                      <div className="  flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0  ">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                          <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                            {item.name}
                          </h3>
                          {/* <div className="flex justify-start items-start flex-col space-y-2">
                            <p className="text-sm leading-none text-gray-800">
                              <span className="text-gray-300">Category: </span>{" "}
                              {item.}
                            </p>
                            <p className="text-sm leading-none text-gray-800">
                              <span className="text-gray-300">Size: </span>{" "}
                              Small
                            </p>
                            <p className="text-sm leading-none text-gray-800">
                              <span className="text-gray-300">Color: </span>{" "}
                              Light Blue
                            </p>
                          </div> */}
                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                          <p className="text-base xl:text-lg leading-6">
                            {item.price}{" "}
                            {/* <span className="text-red-300 line-through">
                              {" "}
                              $30.00
                            </span> */}
                          </p>
                          <p className="text-base xl:text-lg leading-6 text-gray-800">
                            {item.quantity}
                          </p>
                          <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">
                            {item.quantity * item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between  w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Tổng tiền hàng
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        {order.Subtotal}
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <p className="text-base leading-4 text-gray-800">
                        Phí vận chuyển
                      </p>
                      <p className="text-base leading-4 text-gray-600">
                        {order.shippingFee}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base font-semibold leading-4 text-gray-800">
                      Tổng số tiền
                    </p>
                    <p className="text-base font-semibold leading-4 text-gray-600">
                      {order.Amount}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6   ">
                  <div className="w-full flex justify-center items-center">
                    {order.isDelivered ? (
                      <button className="hover:bg-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 py-5 w-96 md:w-full bg-cyan-500 text-base font-medium leading-4 text-white">
                        Giao hàng lúc ({" "}
                        {moment(order.isDeliveredAt).format("lll")}
                      </button>
                    ) : (
                      <>
                        {loadingDelivered && <Loading />}
                        <button
                          onClick={deliverHandler}
                          className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                        >
                          Xác nhận giao hàng
                        </button>
                      </>
                    )}
                  </div>
                  <div className="w-full flex justify-center items-center">
                    {order.isConfirmed ? (
                      <button className="hover:bg-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 py-5 w-96 md:w-full bg-cyan-500 text-base font-medium leading-4 text-white">
                        Đơn hàng xác nhận lúc ({" "}
                        {moment(order.isConfirmedAt).format("lll")})
                      </button>
                    ) : (
                      <>
                        {loadingConfirmed && <Loading />}
                        <button
                          onClick={confirmHandler}
                          className="hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white"
                        >
                          Xác nhận đơn hàng
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
              <h3 className="text-xl font-semibold leading-5 text-gray-800">
                Khách hàng
              </h3>
              <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center   md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
                      alt="avatar"
                    />
                    <div className=" flex justify-start items-start flex-col space-y-2">
                      <p className="text-base font-semibold leading-4 text-left text-gray-800">
                        {order.user.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="#1F2937"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="#1F2937"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 text-gray-800">
                      {order.user.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                        Địa chỉ
                      </p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {order.shippingInfo.address}
                      </p>
                    </div>
                    <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                      <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                        Số điện thoại
                      </p>
                      <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {order.shippingInfo.phone}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                    <button
                      onClick={() => navigate("/orders/all")}
                      className="mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800"
                    >
                      Back
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DetailOrder;
