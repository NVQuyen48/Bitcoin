import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Filler, // Thêm Filler để hỗ trợ gradient lấp đầy
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GetCandles, unixToDate, ICandleStick } from "../services/api"; // Đường dẫn tới API của bạn

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend, Filler);

const VolumeChart = () => {
  const [chartData, setChartData] = useState<ICandleStick[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [timeFrame, setTimeFrame] = useState<string>("1m");
  const [coin, setCoin] = useState<string>("BTCUSDT");

  useEffect(() => {
    const fetchVolumeData = async () => {
      try {
        const candles = await GetCandles(timeFrame, coin);
        setChartData(candles);
        setLabels(candles.map((candle) => unixToDate(candle.openTime)));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchVolumeData();
  }, [timeFrame, coin]);

  const data = {
    labels: labels, // Trục thời gian
    datasets: [
      {
        label: "Khối Lượng Giao Dịch",
        data: chartData.map((candle) => candle.volume), // Giá trị khối lượng
        borderColor: "rgba(33, 150, 243, 1)", // Đường biểu diễn màu xanh nước biển
        backgroundColor: "rgba(33, 150, 243, 0.2)", // Gradient nhạt dưới vùng đường
        fill: true, // Lấp đầy vùng dưới đường
        borderWidth: 2, // Độ rộng của đường
        pointRadius: 0, // Không hiển thị các điểm dữ liệu
        tension: 0.4, // Làm mượt đường biểu diễn
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "gray",
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const volume = chartData[context.dataIndex].volume;
            return `Khối lượng: ${volume}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "gray",
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "gray",
        },
        grid: {
          color: "rgba(200, 200, 200, 0.3)", // Đường lưới nhẹ
        },
      },
    },
  };

  return (
    <div
      className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow-md transition-all duration-300"
      style={{ width: "800px", height: "470px", margin: "0 auto" }}
    >
      <div className="flex gap-4 mb-4">
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="border p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="1m">1 phút</option>
          <option value="5m">5 phút</option>
          <option value="30m">30 phút</option>
          <option value="1h">1 giờ</option>
          <option value="4h">4 giờ</option>
          <option value="1d">1 ngày</option>
        </select>
        <select
          value={coin}
          onChange={(e) => setCoin(e.target.value)}
          className="border p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="BTCUSDT">Bitcoin (BTC)</option>
          <option value="ETHUSDT">Ethereum (ETH)</option>
          <option value="SOLUSDT">Solana (SOL)</option>
          <option value="DOTUSDT">Polkadot (DOT)</option>
        </select>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default VolumeChart;
