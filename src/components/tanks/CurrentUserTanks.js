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
            <div className="upper-header-and-button">
            <h1 className="tanks-title">My Tanks</h1>
            <Link to="/my-tanks/create">
                <button className="add-tank-button">New Tank +</button>
            </Link>
            </div>

            <article className="tank-rows">
                {userTanks.map(
                    (tankObject) => {
                        return (
                            <div className="tank" key={tankObject.id}>
                                <div className="title">
                                    <Link to={`/tanks/${tankObject.id}`} key={tankObject.id} className='name'>{tankObject.name}</Link></div>
                                <div className="tank-gallons">Gallons: {tankObject.gallons}</div>
                                <section className="tank-card-list" >
                                    <img src={tankObject.photo_url} alt="{tankObject.title}" className="tank-photo" />
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