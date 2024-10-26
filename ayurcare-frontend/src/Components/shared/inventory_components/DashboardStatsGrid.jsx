// import React from 'react'
// import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'

// export default function DashboardStatsGrid() {
// 	return (
// 		<div className="flex gap-4">
// 			<BoxWrapper>
// 				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-800">
// 					<IoBagHandle className="text-2xl text-white" />
// 				</div>
// 				<div className="pl-4">
// 					<span className="text-sm text-gray-500 font-bold">Total Units</span>
// 					<div className="flex items-center">
// 						<strong className="text-xl text-gray-700 font-semibold">$54232</strong>

// 					</div>
// 				</div>
// 			</BoxWrapper>
// 			<BoxWrapper>
// 				<div className="rounded-full h-12 w-12 flex items-center justify-center  bg-teal-800">
// 					<IoPieChart className="text-2xl text-white" />
// 				</div>
// 				<div className="pl-4">
// 					<span className="text-sm text-gray-500 font-bold">Total Oil Units</span>
// 					<div className="flex items-center">
// 						<strong className="text-xl text-gray-700 font-semibold">$3423</strong>

// 					</div>
// 				</div>
// 			</BoxWrapper>
// 			<BoxWrapper>
// 				<div className="rounded-full h-12 w-12 flex items-center justify-center  bg-teal-800">
// 					<IoPeople className="text-2xl text-white" />
// 				</div>
// 				<div className="pl-4">
// 					<span className="text-sm text-gray-500 font-bold">Total Dust Units</span>
// 					<div className="flex items-center">
// 						<strong className="text-xl text-gray-700 font-semibold">12313</strong>

// 					</div>
// 				</div>
// 			</BoxWrapper>
// 			<BoxWrapper>
// 				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-800">
// 					<IoCart className="text-2xl text-white" />
// 				</div>
// 				<div className="pl-4">
// 					<span className="text-sm text-gray-500 font-bold">Total Capsule units</span>
// 					<div className="flex items-center">
// 						<strong className="text-xl text-gray-700 font-semibold">16432</strong>

// 					</div>
// 				</div>
// 			</BoxWrapper>
// 		</div>
// 	)
// }

// function BoxWrapper({ children }) {
// 	return <div className="bg-emerald-200 rounded-xl p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5';

export default function DashboardStatsGrid() {
  const [totalUnits, setTotalUnits] = useState(0);        // Total units state
  const [totalOilUnits, setTotalOilUnits] = useState(0);  // Total oil units state
  const [totalDustUnits, setTotalDustUnits] = useState(0); // Total dust units state
  const [totalCapsuleUnits, setTotalCapsuleUnits] = useState(0); // Total capsule units state

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/medicine/list');
        const products = response.data; // Assuming the API returns a list of products

        // Calculate totals
        const totalUnitsCount = products.reduce((sum, product) => sum + product.productUnits, 0);
        const totalOil = products.reduce((sum, product) => sum + (product.productType === 'Oil' ? product.productUnits : 0), 0);
        const totalDust = products.reduce((sum, product) => sum + (product.productType === 'Dust' ? product.productUnits : 0), 0);
        const totalCapsules = products.reduce((sum, product) => sum + (product.productType === 'Capsules' ? product.productUnits : 0), 0);

        // Update state
        setTotalUnits(totalUnitsCount);
        setTotalOilUnits(totalOil);
        setTotalDustUnits(totalDust);
        setTotalCapsuleUnits(totalCapsules);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []);

  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-800">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Units</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">{totalUnits}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-800">
          <IoPieChart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Oil Units</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">{totalOilUnits}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-800">
          <IoPeople className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Dust Units</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">{totalDustUnits}</strong>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-800">
          <IoCart className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-bold">Total Capsule Units</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">{totalCapsuleUnits}</strong>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return <div className="bg-emerald-200 rounded-xl p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
