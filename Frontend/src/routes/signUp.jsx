import './login.css'
import logo from '../assets/United-Airlines-Logo.png';
import { useNavigate } from 'react-router';
import UserPool from "../UserPool";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
//const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
import {useState} from 'react';
import {useAtom} from 'jotai';
import {loggedInAtom, loginStateAtom} from '../state/login';

const view = {
    LOGIN: true,
    SIGNUP: false,
};
export default function SignUp() {
    // local variables
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");

    // global variables
    const [loggedIn] = useAtom(loggedInAtom);
    const [, setLoginState] = useAtom(loginStateAtom);
    
    const navigate = useNavigate();
    function toggleLoginState() {
        setLoginState(view.LOGIN); // change to login
        navigate('/login');
    }


    const poolData={
        UserPoolId: "us-east-2_nfCwrEzsY",
        ClientId:"3jdtpq0oaklkgg2k2kk1ajkka6"
    }

    function openModal(){
        document.getElementById('confirmationCodeModal').style.display= 'block';
    }

    function handleConfirmationCodeSubmit(){
        var userData={
            Username: email,
            Pool: UserPool
        }
        var cognitoUser= new AmazonCognitoIdentity.CognitoUser(userData);
        console.log(userData)
        const confirmationCode= document.getElementById('confirmationCodeInput').value;
        cognitoUser.confirmRegistration(confirmationCode, true, function(err) {
            if (err) {
                console.log(err.message);
            }else{
                console.log('Successfully verified code!');
                closeModal();
                //HERE HAVE IT ROUTE TO HOME PAGE WITH USER CREDS
            }
            
        });
    }

    function closeModal(){
        document.getElementById('confirmationCodeModal').style.display= 'none';
    }

    function handleLogin(e) {
        e.preventDefault();
        console.log(loggedIn);
        var userData={
            Username: email,
            Pool: UserPool
        }
        var cognitoUser= new AmazonCognitoIdentity.CognitoUser(userData);
        
        UserPool.signUp(email, password, [], null, (err)=> {
            if(err){
                console.log(err);
            }
            else{
                openModal();
                handleConfirmationCodeSubmit(cognitoUser);
            }
        })
    };

    return <>
    <div className="content">
        
        <div className="loginForm">
            <img src={logo} alt="United Airlines logo"/>
            <div id="confirmationCodeModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p>Please enter the confirmation code that has been sent to your email.</p>
                    <input type="text" id="confirmationCodeInput" placeholder="Confirmation Code"/>
                    <button onClick={() => handleConfirmationCodeSubmit()}>Submit</button>
                </div>
            </div>
            <form className="px-8" onSubmit={(e) => handleLogin(e)}>
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
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="setConfirmPassword">
                        Confirm Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value={confirmPassword} htmlFor="confirmPassword" id="confirmPassword" type="confirmPassword" placeholder="***********" required onChange={(event)=> setConfirmPassword(event.target.value)}/>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={(e) => openModal(e)}>
                        Sign Up
                    </button>
                </div>
                <span className="text-sm text-blue-500 underline cursor-pointer" onClick={toggleLoginState}>
                    Log In
                </span>
            </form>
        </div>
    </div>
    </>

}