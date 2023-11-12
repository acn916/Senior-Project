import Home from "./scenes/home";
import Services from "./scenes/services";
import Booking from "./scenes/booking"
import ResponsiveAppBar from  "./scenes/header/Header.jsx";
import Footer from "./scenes/header/Footer.jsx";
import {Route, Routes} from "react-router";

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <div style={{minHeight:"700px"}}>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            {/*<Route path="/Staff" element={<Staff />} />*/}
            <Route path="/Services" element={<Services />} />
            <Route path="/Booking" element={<Booking />} />
          </Routes>
          </div>
        
      <Footer />


    </div>
  );
}

export default App;
