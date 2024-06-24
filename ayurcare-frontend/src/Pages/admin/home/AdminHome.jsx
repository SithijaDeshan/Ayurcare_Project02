import Chart from "../../../Components/admin/chart/Chart";
import FeaturedInfo from "../../../Components/admin/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../../dummyData";
import WidgetSm from "../../../Components/admin/widgetSm/WidgetSm";
import WidgetLg from "../../../Components/admin/widgetLg/WidgetLg";

export default function AdminHome() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
} 
