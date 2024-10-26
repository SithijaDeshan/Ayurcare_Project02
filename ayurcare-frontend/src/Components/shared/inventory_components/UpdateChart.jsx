
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// // Updated data with three different unit types for each month
// const data = [
//   {
//     name: 'Jan',
//     oilUnits: 4000,
//     dustUnits: 2400,
//     capsuleUnits: 1200
//   },
//   {
//     name: 'Feb',
//     oilUnits: 3000,
//     dustUnits: 1398,
//     capsuleUnits: 1500
//   },
//   {
//     name: 'Mar',
//     oilUnits: 2000,
//     dustUnits: 9800,
//     capsuleUnits: 1700
//   },
//   {
//     name: 'Apr',
//     oilUnits: 2780,
//     dustUnits: 3908,
//     capsuleUnits: 1300
//   },
//   {
//     name: 'May',
//     oilUnits: 1890,
//     dustUnits: 4800,
//     capsuleUnits: 1600
//   },
//   {
//     name: 'Jun',
//     oilUnits: 2390,
//     dustUnits: 3800,
//     capsuleUnits: 1800
//   },
//   {
//     name: 'Jul',
//     oilUnits: 3490,
//     dustUnits: 4300,
//     capsuleUnits: 2100
//   },
//   {
//     name: 'Aug',
//     oilUnits: 2000,
//     dustUnits: 9800,
//     capsuleUnits: 1200
//   },
//   {
//     name: 'Sep',
//     oilUnits: 2780,
//     dustUnits: 3908,
//     capsuleUnits: 1600
//   },
//   {
//     name: 'Oct',
//     oilUnits: 1890,
//     dustUnits: 4800,
//     capsuleUnits: 2000
//   },
//   {
//     name: 'Nov',
//     oilUnits: 2390,
//     dustUnits: 3800,
//     capsuleUnits: 1700
//   },
//   {
//     name: 'Dec',
//     oilUnits: 3490,
//     dustUnits: 4300,
//     capsuleUnits: 1500
//   }
// ];

// export default function TransactionChart() {
//   return (
//     <div className="h-[24rem] bg-teal-950 p-4 rounded-xl border border-gray-200 flex flex-col">
//       <div className="mt-3 w-full flex-1 text-xs">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//             width={500}
//             height={300}
//             data={data}
//             margin={{
//               top: 20,
//               right: 10,
//               left: -10,
//               bottom: 0
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
//             <YAxis tick={{ fill: '#FFFFFF' }} />
//             <Tooltip />
//             <Legend />

//             {/* Three bars for oil, dust, and capsule units */}
//             <Bar dataKey="oilUnits" fill="#008080" name="Oil Units" />
//             <Bar dataKey="dustUnits" fill="#90EE90" name="Dust Units" />
//             <Bar dataKey="capsuleUnits" fill="#FF6347" name="Capsule Units" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

export default function TransactionChart() {
  const [chartData, setChartData] = useState([]);

  // Function to fetch and process the product data
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/medicine/list');
        const products = response.data;

        // Process the data and categorize by month
        const categorizedData = [
          { name: 'Jan', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Feb', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Mar', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Apr', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'May', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Jun', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Jul', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Aug', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Sep', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Oct', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Nov', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 },
          { name: 'Dec', oilUnits: 0, dustUnits: 0, capsuleUnits: 0 }
        ];

        // Assume each product has a "productType" (oil, dust, capsule) and "lastUpdate" (with a date for month)
        products.forEach((product) => {
          const productMonth = new Date(product.lastUpdate).getMonth(); // Get the month from lastUpdate
          const productType = product.productType.toLowerCase(); // Assuming productType is a string like 'oil', 'dust', or 'capsule'

          // Categorize product units based on the product type
          if (productType === 'oil') {
            categorizedData[productMonth].oilUnits += product.productUnits;
          } else if (productType === 'dust') {
            categorizedData[productMonth].dustUnits += product.productUnits;
          } else if (productType === 'capsules') {
            categorizedData[productMonth].capsuleUnits += product.productUnits;
          }
        });

        setChartData(categorizedData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className="h-[24rem] bg-teal-950 p-4 rounded-xl border border-gray-200 flex flex-col">
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 10,
              left: -10,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#FFFFFF' }} />
            <YAxis tick={{ fill: '#FFFFFF' }} />
            <Tooltip />
            <Legend />

            {/* Three bars for oil, dust, and capsule units */}
            <Bar dataKey="oilUnits" fill="#008080" name="Oil Units" />
            <Bar dataKey="dustUnits" fill="#90EE90" name="Dust Units" />
            <Bar dataKey="capsuleUnits" fill="#95ba9b" name="Capsule Units" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
