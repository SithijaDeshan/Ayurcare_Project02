
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const [totalOilUnits, setTotalOilUnits] = useState(0);  // Total oil units state
// const [totalDustUnits, setTotalDustUnits] = useState(0); // Total dust units state
// const [totalCapsuleUnits, setTotalCapsuleUnits] = useState(0); // Total capsule units state

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/medicine/list');
//         const products = response.data; // Assuming the API returns a list of products

//         // Calculate totals
//         const totalUnitsCount = products.reduce((sum, product) => sum + product.productUnits, 0);
//         const totalOil = products.reduce((sum, product) => sum + (product.productType === 'Oil' ? product.productUnits : 0), 0);
//         const totalDust = products.reduce((sum, product) => sum + (product.productType === 'Dust' ? product.productUnits : 0), 0);
//         const totalCapsules = products.reduce((sum, product) => sum + (product.productType === 'Capsules' ? product.productUnits : 0), 0);

//         // Update state
//         setTotalUnits(totalUnitsCount);
//         setTotalOilUnits(totalOil);
//         setTotalDustUnits(totalDust);
//         setTotalCapsuleUnits(totalCapsules);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData(); // Call the function when the component mounts
//   }, []);

// const data = [
// 	{ name: 'Dust', value: totalDust },
// 	{ name: 'Oils', value: totalUnitsCount },
// 	{ name: 'Capsules', value: totalCapsules }
// ]

// const RADIAN = Math.PI / 180
// const COLORS = ['#008080', '#40EE90', '#32CD32']



// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
// 	const radius = innerRadius + (outerRadius - innerRadius) * 0.5
// 	const x = cx + radius * Math.cos(-midAngle * RADIAN)
// 	const y = cy + radius * Math.sin(-midAngle * RADIAN)

// 	return (
// 		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
// 			{`${(percent * 100).toFixed(0)}%`}
// 		</text>
// 	)
// }

// export default function BuyerProfilePieChart() {
// 	return (

// 		<div className="w-[20rem] h-[23rem] bg-teal-950 p-4 rounded-xl border border-gray-200 flex flex-col">

// 			<div className="mt-3 w-full flex-1 text-xs">
// 				<ResponsiveContainer width="100%" height="100%">
// 					<PieChart width={500} height={400}>
// 						<Pie
// 							data={data}
// 							cx="50%"
// 							cy="45%"
// 							labelLine={false}
// 							label={renderCustomizedLabel}
// 							outerRadius={105}
// 							fill="#8884d8"
// 							dataKey="value"
// 						>
// 							{data.map((_, index) => (
// 								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// 							))}
// 						</Pie>
// 						<Legend />
// 					</PieChart>
// 				</ResponsiveContainer>
// 			</div>
// 		</div>
// 	)
// }

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BuyerProfilePieChart() {
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
        const totalOil = products.reduce((sum, product) => sum + (product.productType === 'Oil' ? product.productUnits : 0), 0);
        const totalDust = products.reduce((sum, product) => sum + (product.productType === 'Dust' ? product.productUnits : 0), 0);
        const totalCapsules = products.reduce((sum, product) => sum + (product.productType === 'Capsules' ? product.productUnits : 0), 0);

        // Update state
        setTotalOilUnits(totalOil);
        setTotalDustUnits(totalDust);
        setTotalCapsuleUnits(totalCapsules);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function when the component mounts
  }, []);

  // Prepare data for the PieChart
  const data = [
    { name: 'Dust', value: totalDustUnits },
    { name: 'Oils', value: totalOilUnits },
    { name: 'Capsules', value: totalCapsuleUnits }
  ];

  const RADIAN = Math.PI / 180;
  const COLORS = ['#008080', '#40EE90', '#32CD32'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-[20rem] h-[23rem] bg-teal-950 p-4 rounded-xl border border-gray-200 flex flex-col">
      <div className="mt-3 w-full flex-1 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={500} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={105}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
