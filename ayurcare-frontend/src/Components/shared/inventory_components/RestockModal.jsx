
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

const RestockModal = ({ showModal, setShowModal, selectedProduct }) => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [availableUnits, setAvailableUnits] = useState('');
  const [addedUnits, setAddedUnits] = useState('');

  // Set the selected product details when modal is shown
  useEffect(() => {
    if (selectedProduct) {
      setProductName(selectedProduct.productName);
      setProductType(selectedProduct.productType);
      setAvailableUnits(selectedProduct.productUnits);
    }
  }, [selectedProduct]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the final units by adding availableUnits and addedUnits
    const finalUnits = parseInt(availableUnits) + parseInt(addedUnits);

    // Prepare the payload
    const payload = {
      productName,
      productType,
      productUnits: finalUnits, // Send the final units
      lastUpdate: formatDate(new Date()), // Set to today's date
    };

    console.log('Payload for API request:', payload);

    try {
      // Use Axios to send the PUT request
      const response = await axios.put(`http://localhost:8080/medicine/update/${selectedProduct.productId}`, payload);


      if (response.status === 200) {
        console.log('Product updated successfully');
        setShowModal(false); // Close the modal on success
      } else {
        console.error('Error updating product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-lg p-6 mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h3 className="text-lg font-semibold">Restock Product</h3>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowModal(false)}
              >
                &#x2715;
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                  Product Name
                </label>
                <input
                  id="productName"
                  type="text"
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productType">
                  Product Type
                </label>
                <input
                  id="productType"
                  type="text"
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={productType}
                  readOnly
                />
              </div>

              <div className="mb-4 flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="availableUnits">
                    Available Units
                  </label>
                  <input
                    id="availableUnits"
                    type="text"
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={availableUnits}
                    readOnly
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addedUnits">
                    Added Units
                  </label>
                  <input
                    id="addedUnits"
                    type="number"
                    className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={addedUnits}
                    onChange={(e) => setAddedUnits(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stockUpdateDate">
                  Stock Update Date
                </label>
                <input
                  id="stockUpdateDate"
                  type="date"
                  className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formatDate(new Date())}
                  readOnly
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default RestockModal;




