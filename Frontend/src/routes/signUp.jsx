import './login.css'
import logo from '../assets/United-Airlines-Logo.png';
import { useNavigate } from 'react-router';
import UserPool from "../UserPool";
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {useState} from 'react';
import {useAtom} from 'jotai';
import jwtDecode from 'jwt-decode'; 
import {userIdAtom, userEmailAtom, userAwsUserIdAtom} from '../state/userInfo';

import { loggedInAtom, loginStateAtom } from '../state/login';
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
    const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
    const [, setLoginState] = useAtom(loginStateAtom);

    //global user variable
    const [, setUserId]= useAtom(userIdAtom)
    const [, setUserEmail]= useAtom(userEmailAtom);
    const [, setUserAwsUserId]= useAtom(userAwsUserIdAtom);
    
    const navigate = useNavigate();

    async function apiCall(formData){
        try {
          const response = await fetch("http://localhost:5000/newUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });
    
          if (response.ok) {
            console.log("Form submitted successfully!");
          } else {
            console.error("Error submitting form");
          }
        } catch (error) {
          console.error("Network error:", error);
        }
    }

    function toggleLoginState() {
        setLoginState(view.LOGIN);
        navigate('/login');
    }


    function openModal(){
        document.getElementById('confirmationCodeModal').style.display= 'block';
    }

    function handleConfirmationCodeSubmit(){
        var userData={
            Username: email,
            Pool: UserPool
        }
        var authenticationData={
            Username: email,
            Password: password
        }
        var cognitoUser= new AmazonCognitoIdentity.CognitoUser(userData);
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
        console.log(userData)
        const confirmationCode= document.getElementById('confirmationCodeInput').value;
        cognitoUser.confirmRegistration(confirmationCode, true, function(err) {
            if (err) {
                console.log(err.message);
            }else{
                console.log('Successfully verified code!');
                cognitoUser.authenticateUser(authenticationDetails, {
                    onSuccess: function (result){
                        console.log('user credentials have been authenticated')
                        var idToken= result.getIdToken().getJwtToken();
                        // userInfoAtom.id= idToken;
                        setUserId(idToken);
                        // userInfoAtom.email= email;
                        setUserEmail(email);
                        setLoggedIn(true);
                        navigate("/");
                        //adding user to db here
                        const decodedToken= jwtDecode(idToken);
                        const awsUserId= decodedToken.sub;
                        setUserAwsUserId(awsUserId);
                        var userFormData={
                            idNumber: awsUserId,
                            emailAddress: email
                        }
                        apiCall(userFormData);
                    },
                    onFailure: function(err){
                        console.log(err.message);
                    }
                })
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
    }

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