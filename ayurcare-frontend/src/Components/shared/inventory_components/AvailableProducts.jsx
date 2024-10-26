

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import RestockModal from './RestockModal';
import Swal from 'sweetalert2'

export default function RecentOrders() {
  const [products, setProducts] = useState([]);  // Store the product data
  const [loading, setLoading] = useState(true);  // To track loading state
  const [error, setError] = useState(null);      // To track any errors
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/medicine/list');
        setProducts(response.data);  // Assuming the API returns the product list
        setLoading(false);           // Set loading to false once data is fetched
      } catch (err) {
        setError('Error fetching product data'); // Handle errors
        setLoading(false);
      }
    };

    fetchProducts();  // Call the function when the component mounts
  }, []);

  const handleRestockClick = (product) => {
    setSelectedProduct(product);  // Set the selected product
    setShowModal(true);           // Show the modal
  };

  const handleDeleteClick = async (productId) => {
    try {
      // Send DELETE request to remove the product by its productId
      const response = await axios.delete(`http://localhost:8080/medicine/delete/${productId}`);

      if (response.status === 204) {
        console.log('Product deleted successfully');
        Swal.fire({
			position: "top-end",
			icon: "success",
			title: "Product Deleted!",
			showConfirmButton: false,
			timer: 1500
		  });
        setProducts(products.filter(product => product.productId !== productId));
      } else {
        console.error('Error deleting product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;  // Display loading state
  }

  if (error) {
    return <div>{error}</div>;  // Display error message
  }

  return (
    <div className="bg-slate-300 px-4 pt-10 pb-4 rounded-xl border border-black flex-1">
      <strong className="text-gray-700 font-medium">Medicine Products</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-black">
          <thead className="bg-teal-950">
            <tr>
              <th className='text-white'>Product ID</th>
              <th className='text-white'>Product Name</th>
              <th className='text-white'>Product Type</th>
              <th className='text-white'>Available Units</th>
              <th className='text-white'>Last Stocked Date</th>
              <th className='text-white'>Restock</th>
              <th className='text-white'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId}>
                <td>#{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productType}</td>
                <td>{product.productUnits}</td>
                <td>{format(new Date(product.lastUpdate), 'dd MMM yyyy')}</td>
                <td>
                  <button
                    className="bg-teal-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={() => handleRestockClick(product)}
                  >
                    Restock
                  </button>
                </td>
                <td>
                 <button
                    className="bg-red-900 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
                    onClick={() => handleDeleteClick(product.productId)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render Restock Modal and pass the selected product details */}
      {showModal && (
        <RestockModal
          showModal={showModal}
          setShowModal={setShowModal}
          selectedProduct={selectedProduct}
        />
      )}
    </div>
  );
}
