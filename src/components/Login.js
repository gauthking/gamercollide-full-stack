import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "../Login.css";
import { authentication, db } from './firebase';
import { signInWithEmailAndPassword } from "firebase/auth"
import { collection, getDoc, doc, onSnapshot } from 'firebase/firestore';
import { AppConfig } from '../context/AppConfig';


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(authentication, email, password)
            .then(() => {
                // Signed in    
                console.log("logged in")
                console.log(authentication.currentUser.displayName);
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
            });




    }

    return (
        <div className='login'>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className='login__logo'><h2>GamerCollide</h2></div>
            </Link>
            <div className="login__box">
                <div className='login__header'>Login</div>
                <div className='login__boxEmail'>
                    <p>Email</p>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='login__boxPasswd'>
                    <p>Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>

                <div className='login__boxSubmit' onClick={login}>
                    <button>Login</button>
                </div>

                <div className="login__boxForgotPasswd">
                    Forgot Password ?
                </div>
                <Link to="/createacc" style={{ textDecoration: 'none' }}>
                    <div className="login__boxCreateAcc">
                        Create Account
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Login