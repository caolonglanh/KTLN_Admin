import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
  CubeIcon,
} from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const stats = [
  {
    id: 1,
    name: "Total Subscribers",
    stat: "71,897",
    icon: UsersIcon,
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: MailOpenIcon,
  },
  {
    id: 3,
    name: "Avg. Click Rate",
    stat: "24.57%",
    icon: CursorClickIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TopTotal = (props) => {
  const { orders, products, users } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) =>
      order.isDelivered === true ? (totalSale = totalSale + order.Amount) : null
    );
  }
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <PresentationChartLineIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              Danh số
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {totalSale.toFixed(0)}
            </p>
          </dd>
        </div>
        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <ShoppingCartIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              Tổng số đơn hàng
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            {orders ? (
              <p className="text-2xl font-semibold text-gray-900">
                {orders.length}
              </p>
            ) : (
              <p className="text-2xl font-semibold text-gray-900">0</p>
            )}
          </dd>
        </div>
        <div className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden">
          <dt>
            <div className="absolute bg-indigo-500 rounded-md p-3">
              <CubeIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="ml-16 text-sm font-medium text-gray-500 truncate">
              Tổng số sản phẩm
            </p>
          </dt>
          <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
            <p className="text-2xl font-semibold text-gray-900">
              {products.length}
            </p>
          </dd>
        </div>
      </dl>
    </div>
  );
};
export default TopTotal;
