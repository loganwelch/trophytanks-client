import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUserTanks } from '../../managers/TankManager'
import "./tanks.css";

export function CurrentUserTanks({ token }) {
    const [userTanks, setUserTanks] = useState([])

    useEffect(() => {
        getCurrentUserTanks({ token }).then((userTanks) =>
            setUserTanks(userTanks)
        )
    }, [token])

    return (
        <div className="container">
            <button className="new-button">New Tank +</button>

            <article className="tank-list">
                {userTanks.map(
                    (tankObject) => {
                        return (
                        <div className="tank" key={tankObject.id}>
                            <div className="header">
                                <Link to={`/tanks/${tankObject.id}`} key={tankObject.id} className='name'>{tankObject.name}</Link>
                                Gallons: {tankObject.gallons}</div>
                            <section className="tank-data" >
                                <img src={tankObject.photo_url} alt="{tankObject.title}" className="tank-picture" />
                            </section>
                        </div>
                        )
                    }
                )
                }
            </article >
        </div >
    )

}