import Home from "./scenes/home";
import Services from "./scenes/services";
import Booking from "./scenes/booking"
import ResponsiveAppBar from  "./scenes/header/Header.jsx";
import Footer from "./scenes/header/Footer.jsx";
import {Route, Routes} from "react-router";
import Login from "./scenes/login/index.jsx";
import Signup from "./scenes/signup/index.jsx";
import Passwordreset from "./scenes/passwordreset/index.js";

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
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Passwordreset" element={<Passwordreset/>}/>
            
          </Routes>
      </div>
        
      <Footer />


    </div>
  );
}

export default App;
