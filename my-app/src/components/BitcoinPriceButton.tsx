import React, { useState } from "react";
import { GetCandles } from "../services/api"; // Đường dẫn tới API của bạn

const BitcoinPriceButton = () => {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [previousPrice, setPreviousPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBitcoinPrices = async () => {
    setLoading(true); // Hiển thị trạng thái đang tải
    try {
      // Lấy dữ liệu nến từ API
      const candles = await GetCandles("1m", "BTCUSDT"); // Khung thời gian 1 phút, coin BTCUSDT

      if (candles.length >= 2) {
        // Giá hiện tại là giá đóng của nến cuối cùng
        setCurrentPrice(candles[candles.length - 1].close);

        // Giá cách đây 1 phút là giá đóng của nến trước đó
        setPreviousPrice(candles[candles.length - 2].close);
      } else {
        console.error("Không đủ dữ liệu để lấy giá.");
      }
    } catch (error) {
      console.error("Lỗi khi lấy giá Bitcoin:", error);
    } finally {
      setLoading(false); // Tắt trạng thái đang tải
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Lấy Giá Bitcoin</h3>
      <button
        onClick={fetchBitcoinPrices}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all"
        disabled={loading}
      >
        {loading ? "Đang tải..." : "Lấy giá Bitcoin"}
      </button>

      {/* Hiển thị giá */}
      <div className="mt-4">
        {currentPrice !== null && (
          <p>
            <strong>Giá hiện tại:</strong> {currentPrice} USD
          </p>
        )}
        {previousPrice !== null && (
          <p>
            <strong>Giá cách đây 1 phút:</strong> {previousPrice} USD
          </p>
        )}
      </div>
    </div>
  );
};

export default BitcoinPriceButton;
