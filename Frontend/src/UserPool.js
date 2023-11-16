import {CognitoUserPool} from "amazon-cognito-identity-js";

const poolData={
    UserPoolId: "us-east-2_nfCwrEzsY",
    ClientId:"3jdtpq0oaklkgg2k2kk1ajkka6"
}

export default new CognitoUserPool(poolData);