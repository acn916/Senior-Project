import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-west-1_Vbhl3qo4P",
    ClientId: "prch02e679nqfdv9957b5a07p"
}

export default new CognitoUserPool(poolData);


