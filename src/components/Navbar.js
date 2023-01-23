import { React, useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton } from "@mui/material";
import "../Navbar.css"
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authentication } from './firebase';


function Navbar() {
    const [userlog, setUserlog] = useState(true);
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                setUserlog(true);
            } else {
                setUserlog(false);
            }
        });
    }, []);

    const logout = e => {
        signOut(authentication).then(() => {
            console.log("User signed out");
        }).catch((error) => {
            console.log("Error occurred while signing out : ", error)
        });
    }

    const slides = [
        { src: "https://gmedia.playstation.com/is/image/SIEPDC/god-of-war-hub-ragnarok-twitter-banner-en-09sept21?$native$" },
        { src: "https://images.indianexpress.com/2021/08/Ghost-Of-Tsushima.jpg" },
        { src: "https://images2.minutemediacdn.com/image/fetch/w_2000,h_2000,c_fit/https%3A%2F%2Fapptrigger.com%2Ffiles%2F2021%2F08%2FIMG_3131.jpg" },
        { src: "https://cdn.mos.cms.futurecdn.net/r5SAd5AkxABU4MYBYNnsPD.jpg" }
    ];
    return (
        <>
            <div className='navbar'>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <div className='navbar__left'><h2>GamerCollide</h2></div>
                </Link>
                <ul className='navbar__right' type='none'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/postcritic">Post a Critic</a></li>

                    <IconButton>
                        <div className="dropdown-menu">
                            <AccountCircleIcon className="menu-btn" style={{ color: "white" }} />

                            <div className="menu-content">
                                <a className="links-hidden" href={userlog ? "/account" : "/login"}>{userlog ? "My Account" : "Login"}</a>
                                <a className="links-hidden">My Reviews</a>
                                {userlog ? <a onClick={logout} className="links-hidden">Logout</a> : ""}
                            </div>
                        </div>
                    </IconButton>
                </ul>
            </div>
            <Slider autoplay infinite duration={3000}>
                {slides.map((slide, index) => <div key={index}>
                    <img src={slide.src} alt="" className='image' />
                </div>)}
            </Slider>
        </>
    )
}

export default Navbar