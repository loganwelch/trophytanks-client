import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import Logo from "./TROPHYTANKSLOGO.png"

export const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate()
    const navbar = useRef()
    const hamburger = useRef()

    const showMobileNavbar = () => {
        hamburger.current.classList.toggle('is-active')
        navbar.current.classList.toggle('is-active')
    }


    return (
        <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/tanks">
                    <img src={Logo} height="100rem" width="300" alt="Trophy Tanks Logo" /> 
                    {/* <h1 className="title">Trophy Tanks</h1> */}
                </a>

                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-clickable">
            <div className="navbar-menu" ref={navbar}>
                <div className="navbar-start">
                    {
                        token
                            ? (
                                <>
                                    <Link to="/tanks" className="navbar-item">All Tanks</Link>
                                    <Link to="/my-tanks" className="navbar-item">My Tanks</Link>
                                </>

                            )
                            : ""
                    }
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                token
                                    ?
                                    <button className="button is-outlined" onClick={() => {
                                        // Clear localStorage upon logout
                                        localStorage.removeItem("userProfileId");

                                        // Clear the token and navigate to the login page
                                        setToken('')
                                        navigate('/login')
                                    }}>Logout</button>
                                    :
                                    <>
                                        <Link to="/register" className="button is-link">Register</Link>
                                        <Link to="/login" className="button is-outlined">Login</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </nav>
    )
}
