import './login.css'
import logo from '../assets/United-Airlines-Logo.png';
import { useNavigate} from 'react-router';
import { useEffect, useState } from 'react';
import UserPool from "../UserPool";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {CognitoUserPool} from "amazon-cognito-identity-js";
import { useAtom } from 'jotai';
import jwtDecode from 'jwt-decode'; 
import AWS from 'aws-sdk';
import {userIdStateAtom, userNameStateAtom, userEmailStateAtom} from '../state/userInfo';

import { loggedInAtom, loginStateAtom } from '../state/login';

const view = {
    LOGIN: true,
    SIGNUP: false,
};

const userInfoAtom = {
    id: 123,
    name: 'First Last',
    email: 'example@united.com',
}

export default function Login() {
    AWS.config.update({ region: 'us-east-2' });
    const cognito = new AWS.CognitoIdentityServiceProvider()
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
    const [, setLoginState] = useAtom(loginStateAtom);

    //global user variable
    const [userId]= useAtom(userIdStateAtom);
    const [, setUserIdState]= useAtom(userIdStateAtom)
    const [globalEmail]= useAtom(userEmailStateAtom);
    const [, setUserEmailState]= useAtom(userEmailStateAtom);

    const navigate= useNavigate();
    const toggleLoginState = () => {
        setLoginState(view.SIGNUP); 
        navigate('/signUp');
    };
    useEffect(() => {
        console.log(userId);
    }, [userId]);
    const poolData={
        UserPoolId: "us-east-2_nfCwrEzsY",
        ClientId:"3jdtpq0oaklkgg2k2kk1ajkka6"
    }

    function handleLogin(e) {
        e.preventDefault();

        console.log("loggedIn: " +loggedIn);
        console.log("Email:", email);
        console.log("Password:", password);

        
        var authenticationData={
            Username: email,
            Password: password
        }
        console.log(authenticationData)
        var userData={
            Username: email,
            Pool: UserPool
        }
        console.log(userData)
        var cognitoUser= new AmazonCognitoIdentity.CognitoUser(userData);
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result){
                console.log('user credentials have been authenticated')
                var idToken= result.getIdToken().getJwtToken();
                const decodedToken= jwtDecode(idToken);
                console.log(decodedToken["cognito:groups"][0]);
                const awsUserId= decodedToken.sub;
                userInfoAtom.id= idToken;
                setUserIdState(userInfoAtom.id);
                userInfoAtom.email= email;
                setUserEmailState(email);
                setLoggedIn(true);
                if(decodedToken["cognito:groups"][0] == "Admin"){
                    console.log("logging in as admin")
                    navigate("/admin-dashboard")
                }else{
                    navigate("/");
                }
                
            },
            onFailure: function(err){
                console.log(err.message);
            }
        })
       
    }

    return <>
    <div className="content">
        
        <div className="loginForm">
            <img src={logo} alt="United Airlines logo"/>
            <form className="px-8" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} htmlFor="username" id="username" type="text" placeholder="Username" required onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={password} htmlFor="password" id="password" type="password" placeholder="***********" required onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                    
                </div>
                <span className="text-sm text-blue-500 underline cursor-pointer" onClick={toggleLoginState}>
                    Sign Up
                </span>
            </form>
        </div>
    </div>
    </>

}