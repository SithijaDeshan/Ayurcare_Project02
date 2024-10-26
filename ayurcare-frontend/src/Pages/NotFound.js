import React from "react";
import notfoundsvg from "./Assests/Images/404.svg"
import "./../Styles/notfound.css"
import { useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const Btnhandler = async (e) => {
        navigate('/');
    }

    return (
        <>
            <div className="cont-404">
                <img src={notfoundsvg} alt="svg" />
                <button onClick={Btnhandler}>Back to Home</button>
            </div>
        </>
    );
};

export default NotFound;
