import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {useEffect, useState} from "react";
import {
  retriveAllMedicalUsersCount,
  retriveAllPatientsCount,
  retriveAllPaymentsCount
} from "../../api/AyurcareApiService";

export default function FeaturedInfo() {
  const token = localStorage.getItem("token");
  const[userCount,setUserCount] = useState(null)
  const[patientCount,setPatientCount] = useState(null)
  const[paymentCount,setPaymentCount] = useState(null)

  // All the users that registered to the system

  useEffect(() => {
    retrieveUserCount();
  }, []);

  const retrieveUserCount = async () => {
    try {
      const response = await retriveAllMedicalUsersCount(token);
      setUserCount(response.data)
    }catch (e){
      console.log(e)
    }
  }

  //All the users make an appoinment

  useEffect(() => {
    retrievePatientCount();
  }, []);

  const retrievePatientCount = async () => {
    try {
      const response = await retriveAllPatientsCount(token);
      setPatientCount(response.data)
    }catch (e){
      console.log(e)
    }
  }

  //All the paid channels to the system

  useEffect(() => {
    retrievePaymentCount();
  }, []);

  const retrievePaymentCount = async () => {
    try {
      const response = await retriveAllPaymentsCount(token);
      setPaymentCount(response.data)
    }catch (e){
      console.log(e)
    }
  }


  return (
    <div className="featured">

      <div className="featuredItem">
        <span className="featuredTitle">Registered Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{userCount}</span>
        </div>
        <span className="featuredSub">All Registered Patients in the System </span>
      </div>


      <div className="featuredItem">
        <span className="featuredTitle">Patients</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{patientCount}</span>
        </div>
        <span className="featuredSub">All users who make at least one appointment</span>
      </div>


      <div className="featuredItem">
        <span className="featuredTitle">Channels</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{paymentCount}</span>
        </div>
        <span className="featuredSub">All the channels for doctor appointments</span>
      </div>
    </div>
  );
}
