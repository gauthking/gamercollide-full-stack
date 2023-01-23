import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from './firebase';
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import "../CreateAcc.css";

function CreateAcc() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phno, setPhno] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const createAcc = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(authentication, email, password).then(() => {
            authentication.currentUser.displayName = name;
            navigate("/login");
            addAcc();

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });

    }

    const addAcc = async () => {
        const docRef = await addDoc(collection(db, "accounts"),
            {
                email: email,
                name: name,
                phone: phno,
                imgsrc: "https://avatars.githubusercontent.com/u/90638995?v=4"
            }
        )
    }
    return (
        <div className='createAcc'>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div className='createAcc__logo'><h2>GamerCollide</h2></div>
            </Link>
            <div className="createAcc__box">
                <div className='createAcc_header'>Create Account</div>
                <div className='createAcc__boxEmail'>
                    <p>Email</p>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className='createAcc__boxName'>
                    <p>Name</p>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className='createAcc__boxPassword'>
                    <p>Password</p>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='createAcc__boxPhno'>
                    <p>Phone Number</p>
                    <input type="text" value={phno} onChange={e => setPhno(e.target.value)} />
                </div>
                <div className='login__boxSubmit' onClick={createAcc} >
                    <button>Create Account</button>
                </div>
            </div>
        </div>
    )
}

export default CreateAcc