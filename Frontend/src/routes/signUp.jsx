import './login.css'
import logo from '../assets/United-Airlines-Logo.png';
import { useNavigate } from 'react-router';
import { Context } from '../context';
import { useContext, useEffect, useState } from 'react';
import UserPool from "../UserPool";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {CognitoUserPool} from "amazon-cognito-identity-js";
//const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
export default function SignUp({ toggleShowLogin }) {
    
    const [loggedIn, setLoggedIn] = useContext(Context);
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const poolData={
        UserPoolId: "us-east-2_nfCwrEzsY",
        ClientId:"3jdtpq0oaklkgg2k2kk1ajkka6"
    }

    function openModal(cognitoUser){
        document.getElementById('confirmationCodeModal').style.display= 'block';
        const confirmationCode= document.getElementById('confirmationCodeInput').value;
        cognitoUser.confirmRegistration(confirmationCode, true, function(err, result) {
            if (err) {
                console.log(err.message);
            }else{
                console.log('Successfully verified code!');
                closeModal();
            }
            
        });
    }

    function closeModal(){
        document.getElementById('confirmationCodeModal').style.display= 'none';
    }

    function handleLogin(e) {
        e.preventDefault();
        console.log(loggedIn);
        // To-do: validate credentials
        var userData={
            Username: email,
            Pool: UserPool
        }
        var cognitoUser= new AmazonCognitoIdentity.CognitoUser(userData);
        
        UserPool.signUp(email, password, [], null, (err, data)=> {
            if(err){
                console.log(err);
            }
            else{
                //const confirmationCode= prompt("Please enter the confirmation code that has been sent to your email.")
                openModal(cognitoUser);
            }
        })
    }

    return <>
    <div className="content">
        <div className="loginForm">
            <img src={logo} alt="United Airlines logo"/>
            {/* <!-- HTML structure for confirmation code input --> */}
            <div id="confirmationCodeModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick="closeModal()">&times;</span>
                    <p>Please enter the confirmation code that has been sent to your email.</p>
                    <input type="text" id="confirmationCodeInput" placeholder="Confirmation Code"/>
                    <button onClick="submitConfirmationCode()">Submit</button>
                </div>
            </div>
            <form className="px-8" onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} htmlFor="username" id="username" type="text" placeholder="Username" required onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={password} htmlFor="password" id="password" type="password" placeholder="***********" required onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Confirm Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={password} htmlFor="password" id="password" type="password" placeholder="***********" required onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                </div>
                <span className="text-sm text-blue-500 underline cursor-pointer" onClick={toggleShowLogin}>
                    Log In
                </span>
            </form>
        </div>
    </div>
    </>

}