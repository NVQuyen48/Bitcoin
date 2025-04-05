import React, { useState } from "react";
import Price from "./Price";
import CandlestickChart from "./CandlestickChart";
import VolumeChart from "./VolumeChart";
import BitcoinPriceButton from "./BitcoinPriceButton";

const Home = () => {
  const [selectedChart, setSelectedChart] = useState<string>("candlestick"); // Trạng thái biểu đồ được chọn

  return (
    <div className="grid grid-cols-4 gap-4 h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all duration-300">
      {/* Sidebar trái */}
      <aside className="col-span-1 bg-white dark:bg-gray-700 p-4 rounded shadow-md">
        <Price />
      </aside>

      {/* Phần chính giữa */}
      <main className="col-span-2 p-4 bg-white dark:bg-gray-700 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Biểu Đồ Bitcoin</h1>

        {/* Nút chuyển đổi biểu đồ */}
        <div className="flex gap-4 mb-6">
          <button
            className={`p-2 rounded ${
              selectedChart === "candlestick" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600 dark:text-gray-100"
            }`}
            onClick={() => setSelectedChart("candlestick")}
          >
            Biểu Đồ Nến
          </button>
          <button
            className={`p-2 rounded ${
              selectedChart === "volume" ? "bg-blue-500 text-white" : "bg-gray-300 dark:bg-gray-600 dark:text-gray-100"
            }`}
            onClick={() => setSelectedChart("volume")}
          >
            Biểu Đồ Khối Lượng
          </button>
        </div>

        {/* Hiển thị biểu đồ dựa vào trạng thái */}
        <div style={{ width: "800px", height: "470px", margin: "0 auto" }}>
          {selectedChart === "candlestick" && <CandlestickChart />}
          {selectedChart === "volume" && <VolumeChart />}
        </div>
      </main>
      <BitcoinPriceButton/>
    </div>
  );
};

export default Home;
