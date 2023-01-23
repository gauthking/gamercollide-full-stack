import React, { useEffect, useState } from 'react'
import { IconButton, Avatar } from '@mui/material';
import "../Content.css";
import AddIcon from '@mui/icons-material/Add';
import axios from "./axios"
import { Link } from "react-router-dom";
import Loader from './Loader';
import { authentication } from './firebase';
function Content() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const req = await axios.get("/gamercollide/getdata");
            setData(req.data);
            console.log(req)
            setLoading(false)
        }
        fetchData();
    }, [])
    return (
        <div className='content'>
            <div className="content__options">
                <div className='content__header'>Top Critics and Reviews</div>
                <Link to="/postcritic">
                    <IconButton>
                        <AddIcon className='content__icon' />
                    </IconButton>
                </Link>
            </div>
            {loading ? <Loader /> : <div className='content__contentBox'>
                {data.map((dat) => (
                    <div className='content__criticCard'>
                        <div className='content__criticProf'>
                            <Avatar src="https://avatars.githubusercontent.com/u/90638995?v=4" />
                            <p className='content__criticName'>{dat.userName}</p>
                        </div>
                        <div className='content__gameName'>{dat.gameName}</div>
                        <div className="content__gameRating">{Array(dat.rating).fill().map((_, i) => (
                            <p>⭐</p>
                        ))}</div>
                        <div className='content__gameReview'>{dat.descData.slice(0, 50) + '....'}</div>
                    </div>
                ))}

            </div>}

        </div>
    )
}

export default Content