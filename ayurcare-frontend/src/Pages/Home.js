// import React from "react";
// import Navbar from "../Components/Navbar";
// import Hero from "../Components/Hero";
// import Footer from "../Components/Footer";
// import Treatments from "../Components/Info";
//
// function Home() {
//   return (
//     <div className="home-section">
//       <Navbar />
//       <Hero />
//       <Treatments />
//       <Footer />
//     </div>
//   );
// }
//
// export default Home;



import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import Treatments from "./Homecomponents/Info";

function Home() {
    return (
        <div className="home-section">
            <Navbar />
            <Hero />
            <Treatments />
            <Footer />
        </div>
    );
}

export default Home;
