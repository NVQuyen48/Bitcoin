import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GetCandles, unixToDate, ICandleStick } from "../services/api";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip, Legend);

const CandlestickChart = () => {
  const [chartData, setChartData] = useState<ICandleStick[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [timeFrame, setTimeFrame] = useState<string>("1m");
  const [coin, setCoin] = useState<string>("BTCUSDT");

  useEffect(() => {
    const fetchCandles = async () => {
      try {
        const candles = await GetCandles(timeFrame, coin);
        setChartData(candles);
        setLabels(candles.map((candle) => unixToDate(candle.openTime)));
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
      }
    };

    fetchCandles();
  }, [timeFrame, coin]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Giá Bitcoin (USD)",
        data: chartData.map((candle) => candle.close),
        borderColor: chartData.map((candle, index) =>
          index > 0 && candle.close > chartData[index - 1].close
            ? "rgba(0, 255, 0, 1)" // Màu xanh nếu giá tăng
            : "rgba(255, 0, 0, 1)" // Màu đỏ nếu giá giảm
        ),
        segment: {
          borderColor: (ctx) => {
            const { p0, p1 } = ctx;
            return p1.raw > p0.raw ? "rgba(0, 255, 0, 1)" : "rgba(255, 0, 0, 1)";
          },
        },
        borderWidth: 2,
        pointRadius: 0,
        tension: 0, // Đường không bị bo tròn (linear)
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
            const dataPoint = chartData[context.dataIndex];
            return `Giá: ${dataPoint.close} USD`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "gray",
        },
      },
      y: {
        ticks: {
          color: "gray",
        },
      },
    },
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded shadow-md transition-all duration-300">
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

export default CandlestickChart;
