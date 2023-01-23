import React, { useEffect, useState } from 'react'
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { authentication, db } from './firebase';
import "../Account.css"
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';

function Account() {
    const [arrObj, setArrObj] = useState([]);
    const [users, setUsers] = useState([])
    useEffect(() => {
        setArrObj({ name: "", email: "", phone: "", })
        onSnapshot(collection(db, "accounts"), (snapshot) =>
            setUsers(snapshot.docs.map((doc) => doc.data()))
        )
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === authentication.currentUser.email) {
                setArrObj(users[i])
            }
        }
        // console.log(users[0].email)
        // console.log(authentication.currentUser.email)
        // console.log(users[i].email === authentication.currentUser.email)

    }, [users.map, arrObj])
    console.log(users)
    console.log(arrObj)



    return (
        <div className='account'>

            <div className='account_box'>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className='login__logo'><h2>GamerCollide</h2></div>
                </Link>
                <div className='account__img'>
                    <Avatar src={arrObj.imgsrc} sx={{ width: 81, height: 81 }} />
                    <div className='account__name'>
                        {arrObj.name}
                    </div>
                </div>
                <div className="account_userDetails">
                    <h3>User Info</h3>
                    <div className='account__phno'>
                        Phone : {arrObj.phone}
                    </div>
                    <div className='account__email'>
                        Registered Email : {arrObj.email}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account