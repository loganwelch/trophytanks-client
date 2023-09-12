import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { getAllTanks } from "../../managers/TankManager"
import "./TanksList.css";

export const TankList = () => {

    const [tanks, setTanks] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getAllTanks().then((tanksData) => setTanks(tanksData))
        },
        []
    )

    return (
        <div className="container">
            <h1 className="tanks-title">All Tanks</h1>
            <article className="">
                {tanks.map(
                    (tankObject) => {
                        return <div className="tank" key={tankObject.id}  >
                            <div className="title"><Link to={`/tanks/${tankObject.id}`} key={tankObject.id}>{tankObject.name}</Link></div>
                            <section className="" >
                                <div>{tankObject.profile.full_name}</div>
                                <div>
                                    <img src={tankObject.photo_url} alt={tankObject.name} className="tank-photo" />
                                </div>
                                <div className="tag-list">
                                    {tankObject.tags.map((tag) => (
                                        <span className="tag" key={tag.id}>{tag.label}</span>
                                    ))}
                                </div>
                            </section>
                        </div>
                    })}
            </article >
            <Link to="/tanks/create" className="add-tank-button">
                Add Tank +
            </Link>
        </div >
    )
}