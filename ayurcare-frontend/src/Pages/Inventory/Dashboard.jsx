import React from 'react'
import DashboardStatsGrid from './../../Components/shared/inventory_components/DashboardStatsGrid'
import TransactionChart from './../../Components/shared/inventory_components/UpdateChart'
import BuyerProfilePieChart from './../../Components/shared/inventory_components/ProductCategoryPieChart'
import PopularProducts from './../../Components/shared/inventory_components/LowStockProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-16">
			<DashboardStatsGrid />


			<div className="flex flex-col gap-4 w-full ">
				<h2 className="text-xl text-center font-bold mb-2">Stock Update Chart</h2>
				<TransactionChart />
			</div>

			<div className="flex flex-row gap-40 w-full">

				<div className="flex flex-col items-center">
					<h2 className="text-xl font-bold mb-4">Medicine Categories</h2>
					<BuyerProfilePieChart />
				</div>


				<div className="flex flex-col items-center">
					<h2 className="text-xl font-bold mb-4">Low Stock Products</h2>
					<PopularProducts />
				</div>
			</div>
		</div>
	)
}
