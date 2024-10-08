import Chart from "../../../Components/admin/chart/Chart";
import FeaturedInfo from "../../../Components/admin/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../../Components/admin/widgetSm/WidgetSm";
import WidgetLg from "../../../Components/admin/widgetLg/WidgetLg";
import {getAllPatient} from "../../../Components/api/AyurcareApiService"
import {useEffect, useState} from "react";

export default function AdminHome() {
    const [userData, setUserData] = useState([]);

    const token = localStorage.getItem('token');

    useEffect(() => {
        retriveAllPatientData();
    }, []);

    const retriveAllPatientData = async () => {

        try {
            const response = await getAllPatient(token);

            // Check if response contains the patients data array
            const patients = response.data || response;  // Adjust this based on the actual response structure

            if (Array.isArray(patients)) {
                const processedData = processPatientData(patients);
                setUserData(processedData);
            } else {
                console.log("Expected an array but received:", patients);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // Function to count patients per month
    const processPatientData = (patients) => {

        console.log(patients)

        const monthNames = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        // Initialize an array of objects for each month with a count of 0
        let monthlyData = monthNames.map((month) => ({
            name: month,
            "Active User": 0
        }));

        // Loop through the patients and increment the count for the respective month
        patients.forEach(patient => {
            const date = new Date(patient.treatmentStartDate);
            const monthIndex = date.getMonth(); // Get month index (0 for January, 11 for December)
            monthlyData[monthIndex]["Active User"] += 1;
        });

        console.log(monthlyData);
        return monthlyData;

    };

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart data={userData} title="Patient Analytics" grid dataKey="Active User" />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
