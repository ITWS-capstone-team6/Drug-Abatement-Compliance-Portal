import './login.css'
import logo from '../assets/United-Airlines-Logo.png';
import { useNavigate } from 'react-router';
import { Context } from '../context';
import { useContext, useEffect, useState } from 'react';
export default function Login() {
    
    const [loggedIn, setLoggedIn] = useContext(Context);

    function handleLogin(e) {
        e.preventDefault();
        console.log(loggedIn);
        // To-do: validate credentials
        setLoggedIn(true);
    };

    return <>
    <div class="content">
        
        <div class="loginForm">
            <img src={logo} alt="United Airlines logo"/>
            <form class="px-8" onSubmit={handleLogin}>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                        Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" required/>
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="***********" required/>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    </div>
    </>

};