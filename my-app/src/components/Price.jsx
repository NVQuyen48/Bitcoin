import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Price = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: 'bitcoin',
            vs_currencies: 'usd',
          },
        }
      );
      setPrice(response.data.bitcoin.usd);
    };

    fetchPrice();
  }, []);

  return (
    <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white shadow-md">
      <h2 className="text-xl font-bold mb-2">Giá Bitcoin</h2>
      {price !== null ? (
        <p className="text-lg">Hiện tại: <strong>${price}</strong></p>
      ) : (
        <p>Đang tải dữ liệu...</p>
      )}
    </div>
  );
};

export default Price;
