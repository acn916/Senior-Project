import Home from "./scenes/home";
import Services from "./scenes/services";
import Booking from "./scenes/booking"
import ResponsiveAppBar from  "./scenes/header/Header.jsx";
import Footer from "./scenes/header/Footer.jsx";
import {Route, Routes} from "react-router";
import Login from "./scenes/login/index.jsx";
import Signup from "./scenes/signup/index.jsx";
import Passwordreset from "./scenes/passwordreset/index.js";
import Staff from "./scenes/staff/index.jsx"

import { Account } from "./scenes/login/Account.js";
import ErrorPage from "./scenes/404/index.jsx";
import Requestsummary from "./scenes/requestsummary/index.jsx";
import Confirm from "./scenes/confirm/index.jsx";
import PrivateRoutes from "./PrivateRoutes.js";
import Dashboard from "./scenes/dashboard/index.jsx";
import SettingsPage from "./scenes/staff-settings/index.jsx";
import Request from "./scenes/request/index.jsx";
import "./index.css";

function App() {
  return (
    <div>
      <ResponsiveAppBar />
      <div className="flex-wrapper">
        <div>
        
          <Routes>
            <Route element = {<PrivateRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />

              <Route path="/Staff" element={<Staff />} />
              <Route path="/Confirmation" element={<Confirm/>}/>

              <Route path="/Services" element={<Services />} />
              <Route path="/Booking" element={<Booking />} />
              <Route path="/Summary" element={<Requestsummary/>}/>
            </Route>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Login" element={<Account><Login/></Account>}/>
            <Route path="/Passwordreset" element={<Passwordreset/>}/>
            <Route path="/Error" element={<ErrorPage/>}/>
            <Route path="/Summary" element={<Requestsummary/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/Settings" element={<SettingsPage/>}/>
            <Route path="/Request" element={<Request/>}/>
            
          </Routes> 
        </div>

        <div>
          <Footer />
        </div>

      </div>

    </div>
  );
}

export default App;