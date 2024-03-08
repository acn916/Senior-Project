import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import React, { useState } from "react";
import Pool from "../../login/UserPool";

export default () => {
  const [stage, setStage] = useState(1); // 1 = email stage, 2 = code stage
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool,
    });
  };

  const sendCode = (event) => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input code:", data);
        setStage(2);
      },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      console.error("Password are not the same");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.error("onFailure:", err);
      },
    });
  };

  return (
    <div>
      <label>Forgot Password</label>

      {stage === 1 && (
        <form onSubmit={sendCode}>
          <label>Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit">Send verification code</button>
        </form>
      )}

      {stage === 2 && (
        <form onSubmit={resetPassword}>
          <label>Code:</label>

          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <label>Password:</label>

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label>Confirm Password:</label>

          <input
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          <button type="submit">Change Password</button>
        </form>
      )}
    </div>
  );
};
