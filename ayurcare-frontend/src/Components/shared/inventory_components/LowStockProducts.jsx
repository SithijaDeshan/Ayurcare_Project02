
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';

function PopularProducts() {
  const [lowStockProducts, setLowStockProducts] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/medicine/list');
        const products = response.data;


        const filteredProducts = products.filter(
          (product) => product.productUnits === 0 || product.productUnits < 5
        );

        setLowStockProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-[20rem] h-[14rem] bg-emerald-950 p-4 rounded-xl border border-gray-200">
      <div className="mt-4 flex flex-col gap-3 h-[10rem] overflow-y-auto">
        {lowStockProducts.length > 0 ? (
          lowStockProducts.map((product) => (
            <div key={product.productId} className="flex items-start border-stone-300">
              <div className="text-green-300">{product.productId}</div>
              <div className="ml-4 flex-1">
                <p className="text-sm text-white">{product.productName}</p>
                <span
                  className={classNames(
                    product.productUnits === 0
                      ? 'text-red-600'
                      : product.productUnits <= 5
                      ? 'text-orange-400'
                      : 'text-green-500',
                    'text-xs font-medium'
                  )}
                >
                  {product.productUnits === 0 ? 'Out of Stock' : `${product.productUnits} in Stock`}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-white">No products with low stock</p>
        )}
      </div>
    </div>
  );
}

export default PopularProducts;
