import './login.css'
import logo from '../assets/United-Airlines-Logo.png';
import { useNavigate } from 'react-router';
import { Context } from '../context';
import { useContext, useEffect, useState } from 'react';
import UserPool from "../UserPool";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {CognitoUserPool} from "amazon-cognito-identity-js";
//const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
export default function SignUp({toggleShowSignUp}) {
    
    const [signedUp, setSignedUp] = useContext(Context);
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirm, setConfirmPassword]= useState("");
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
                setSignedUp(true);
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
    };

    return <>
    <div class="content">
        
        <div class="loginForm">
            <img src={logo} alt="United Airlines logo"/>
            {/* <!-- HTML structure for confirmation code input --> */}
            <div id="confirmationCodeModal" class="modal">
                <div class="modal-content">
                    <span class="close" onclick="closeModal()">&times;</span>
                    <p>Please enter the confirmation code that has been sent to your email.</p>
                    <input type="text" id="confirmationCodeInput" placeholder="Confirmation Code"/>
                    <button onclick="submitConfirmationCode()">Submit</button>
                </div>
            </div>
            <form class="px-8" onSubmit={handleLogin}>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Emails
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} htmlFor="username" id="username" type="text" placeholder="Username" reqquired onChange={(event)=> setEmail(event.target.value)}/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={password} htmlFor="password" id="password" type="password" placeholder="***********" required onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="setConfirmPassword">
                        Confirm Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={password} htmlFor="password" id="password" type="password" placeholder="***********" required onChange={(event)=> setPassword(event.target.value)}/>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>

};