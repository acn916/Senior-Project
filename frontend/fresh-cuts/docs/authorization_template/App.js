import React from "react";
import Signup from "./components/authorization/Signup";
import Login from "./components/authorization/Login";
import { Account } from "Account";
import Status from "./components/authorization/Status";
import Settings from "./components/authorization/Settings";
import ForgotPassword from "./components/authorization/ForgotPassword";
import Attributes from "./components/authorization/Attributes";
import ReturnSuccess from "ReturnSuccess";
import ReturnFail from "ReturnFail";
const App = () => {
  return (
    <Account>
      {/* <Status /> */}
      {/* <Signup /> */}
      <Login />
      {/* <ForgotPassword /> */}
      {/* <Settings /> */}
      {/* <Attributes /> */}
      <ReturnSuccess />
      <ReturnFail />
    </Account>
  );
};

export default App;
