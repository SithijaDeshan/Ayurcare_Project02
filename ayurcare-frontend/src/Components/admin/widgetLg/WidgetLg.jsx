// import "./widgetLg.css";
//
// export default function WidgetLg() {
//   const Button = ({ type }) => {
//     return <button className={"widgetLgButton " + type}>{type}</button>;
//   };
//   return (
//     <div className="widgetLg">
//       <h3 className="widgetLgTitle">Latest transactions</h3>
//       <table className="widgetLgTable">
//         <tr className="widgetLgTr">
//           <th className="widgetLgTh">Customer</th>
//           <th className="widgetLgTh">Date</th>
//           <th className="widgetLgTh">Amount</th>
//           <th className="widgetLgTh">Status</th>
//         </tr>
//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Susan Carol</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Approved" />
//           </td>
//         </tr>
//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Susan Carol</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Declined" />
//           </td>
//         </tr>
//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Susan Carol</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Pending" />
//           </td>
//         </tr>
//         <tr className="widgetLgTr">
//           <td className="widgetLgUser">
//             <img
//               src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//               alt=""
//               className="widgetLgImg"
//             />
//             <span className="widgetLgName">Susan Carol</span>
//           </td>
//           <td className="widgetLgDate">2 Jun 2021</td>
//           <td className="widgetLgAmount">$122.00</td>
//           <td className="widgetLgStatus">
//             <Button type="Approved" />
//           </td>
//         </tr>
//       </table>
//     </div>
//   );
// }




//
// 'use client';
// import "./widgetLg.css";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import {getAllBookingCountForCategories} from "../../api/AyurcareApiService"
// import {useEffect} from "react";
//
// const salesData = [
//   {
//     name: 'Jan',
//     revenue: 4000,
//     profit: 2400,
//   },
//   {
//     name: 'Feb',
//     revenue: 3000,
//     profit: 1398,
//   },
//   {
//     name: 'Mar',
//     revenue: 9800,
//     profit: 2000,
//   },
//   {
//     name: 'Apr',
//     revenue: 3908,
//     profit: 2780,
//   },
//   {
//     name: 'May',
//     revenue: 4800,
//     profit: 1890,
//   },
//   {
//     name: 'Jun',
//     revenue: 3800,
//     profit: 2390,
//   },
// ];
//
// export default function WidgetLg() {
//   const token = localStorage.getItem('token')
//
//   useEffect(() => {
//
//     const getCount = async () => {
//
//       try {
//
//         const response = await getAllBookingCountForCategories(token)
//         console.log(response)
//
//       }catch (e) {
//         console.log(e)
//       }
//
//     }
//     getCount();
//   }, []);
//
//
//   return (
//       <div className="widgetLg">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart
//               width={500}
//               height={300}
//               data={salesData}
//               margin={{
//                 right: 30,
//               }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="revenue" fill="#2563eb" />
//             <Bar dataKey="profit" fill="#8b5cf6" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>
//   );
// }
//
// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//         <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
//           <p className="text-medium text-lg">{label}</p>
//           <p className="text-sm text-blue-400">
//             Revenue:
//             <span className="ml-2">${payload[0].value}</span>
//           </p>
//           <p className="text-sm text-indigo-400">
//             Profit:
//             <span className="ml-2">${payload[1].value}</span>
//           </p>
//         </div>
//     );
//   }
// };




'use client';
import "./widgetLg.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getAllBookingCountForCategories } from "../../api/AyurcareApiService";
import { useEffect, useState } from "react";

export default function WidgetLg() {
  const token = localStorage.getItem('token');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const getCount = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Check if token is valid
        const response = await getAllBookingCountForCategories(token);
        console.log('API Response:', response); // Log the full response

        // Access the data property from the response
        const bookingData = response.data; // Correctly access the data array

        // Ensure bookingData is in the expected format
        if (Array.isArray(bookingData)) {
          const formattedData = bookingData.map(item => ({
            name: item.categoryName,
            bookedCount: item.bookedCount,
          }));

          console.log('Formatted Data:', formattedData); // Check the formatted data
          setChartData(formattedData); // Update state with formatted data
        } else {
          console.error('Unexpected response format:', bookingData);
        }
      } catch (e) {
        console.error('Error fetching data:', e); // Log any errors
      }
    };
    getCount();
  }, []);



  console.log(chartData)

  return (
      <div className="widgetLg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
              width={500}
              height={300}
              data={chartData} // Use the data from state
              margin={{
                right: 30,
              }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="bookedCount" fill="darkblue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
        <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
          <p className="text-medium text-lg">{label}</p>
          <p className="text-sm text-blue-400">
            Booked Count:
            <span className="ml-2">{payload[0].value}</span>
          </p>
        </div>
    );
  }

  return null;
};
