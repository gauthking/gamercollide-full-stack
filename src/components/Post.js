import React, { useContext, useEffect, useState } from 'react'
import "./Post.css"
import ReactStars from "react-rating-stars-component";
import axios from "./axios"
import { useNavigate } from 'react-router-dom';
import { authentication, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AppConfig } from '../context/AppConfig';
import { collection, getDocs } from 'firebase/firestore';

function Post() {
    const [gname, setGname] = useState("");
    const [gdesc, setGdesc] = useState("");
    const [grating, setGRating] = useState();
    const [userlog, setUserlog] = useState(true);
    const { currentUser, setCurrentUser } = useContext(AppConfig)
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                setUserlog(true);
            } else {
                setUserlog(false);
            }
        });
        const fetchUserName = async () => {
            const querySnapshot = await getDocs(collection(db, "accounts"));
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.data().name)
                // console.log(authentication.currentUser.email)
                if (doc.data().email === authentication.currentUser.email) {
                    setCurrentUser(doc.data().name);
                    console.log(currentUser)
                }
            });
        }
        fetchUserName();
    }, []);
    const navigate = useNavigate();
    console.log(currentUser)
    const post = () => {
        axios.post("/gamercollide/postdata", {
            userName: currentUser,
            gameName: gname,
            descData: gdesc,
            rating: grating,
            timestamp: "defaulttimestamp",
        })
        navigate('/')
    }


    const ratingChanged = (newRating) => {
        console.log(newRating);
        setGRating(newRating);
    };
    if (userlog) {
        return (
            <div className="post">

                <div className='post__box'>
                    <div className="post__gameName">
                        <p>Select Game</p>
                        <select className='post__gameSelect' name="games" id="games" onChange={() => setGname(document.getElementById("games").value)}>
                            <option value="None">None</option>
                            <option value="God of War">God of War</option>
                            <option value="Assassin's Creed Unity">Assassin's Creed Unity</option>
                            <option value="Valorant">Valorant</option>
                            <option value="Need for Speed">Need for Speed</option>
                        </select>
                    </div>

                    <div className="post__gameDesc">
                        <p>Write your Critic/Review...</p>
                        <textarea className='post__gameDescText' value={gdesc} onChange={(e) => setGdesc(e.target.value)}></textarea>
                    </div>

                    <div className="post__gameRating">
                        <p>Your Rating</p>
                        <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        />
                    </div>

                    <div className='post__submitReview'>
                        <button className='post__submitBtn' onClick={post}>Post</button>
                    </div>
                </div>
            </div>

        )
    }
    else {
        return (
            <div className="post">
                <div className='post__box'>
                    <p className='post_noLoginMsg'> Please sign in to continue</p>
                    <a className='post_noLoginLink' href="/login">Sign In</a>
                </div>
            </div>
        )
    }


}

export default Post