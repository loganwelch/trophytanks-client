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
            <Link to="/my-tanks/create">
                <button className="add-tank-button">New Tank +</button>
            </Link>

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
                            <div className="tag-list">
                                    {tankObject?.tags && Array.isArray(tankObject.tags) && tankObject.tags.map((tag) => (
                                    <span className="tag" key={tag.id}>{tag.label}</span>
                                ))}
                            </div>
                        </div>
                        )
                    }
                )
                }
            </article >
        </div >
    )

}