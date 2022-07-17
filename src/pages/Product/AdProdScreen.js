import Navbar from "../../Components/Navbar/Navbar";
import AddNewProduct from "../../Components/Product/AddNewProduct";
import ResSidebar from "../../Components/sidebar/ResSidebar";
import StaticSidebar from "../../Components/sidebar/StaticSidebar";

const AdProdScreen = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <ResSidebar />

      <StaticSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <Navbar />

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                <AddNewProduct />
              </h1>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdProdScreen;
