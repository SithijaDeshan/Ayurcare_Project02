
import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'

const NewProduct = () => {
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [availableUnits, setAvailableUnits] = useState("");
  const todayDate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the product data object
    const productData = {
      productName,
      productType,
      productUnits: availableUnits,
      lastUpdate: todayDate,
    };

    try {
      // Send a POST request using Axios
      const response = await axios.post("http://localhost:8080/medicine/create", productData);

      // Handle successful response
      console.log("Product created successfully:", response.data);

	  Swal.fire({
		position: "top-end",
		icon: "success",
		title: "New Product Added",
		showConfirmButton: false,
		timer: 1500
	  });
      // Reset the form
      setProductName("");
      setProductType("");
      setAvailableUnits("");
    } catch (error) {
      // Handle error
      console.error("There was an error creating the product!", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <label htmlFor="productName" className="block text-lg font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="productType" className="block text-lg font-medium text-gray-700">
            Product Type
          </label>
          <select
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            required
          >
            <option value="" disabled>Select product type</option>
            <option value="Oil">Oil</option>
            <option value="Dust">Dust</option>
            <option value="Capsules">Capsules</option>
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="availableUnits" className="block text-lg font-medium text-gray-700">
            Available Units
          </label>
          <input
            type="number"
            id="availableUnits"
            value={availableUnits}
            onChange={(e) => setAvailableUnits(e.target.value)}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
            placeholder="Enter available units"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="todayDate" className="block text-lg font-medium text-gray-700">
            Today's Date
          </label>
          <input
            type="text"
            id="todayDate"
            value={todayDate}
            readOnly
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-900 text-white py-3 px-6 rounded-md text-lg hover:bg-teal-950 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
