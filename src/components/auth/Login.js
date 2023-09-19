import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "./LoginPage.css";

export const Login = ({ setToken }) => {
    const username = useRef()
    const password = useRef()
    const navigate = useNavigate()
    const [isUnsuccessful, setisUnsuccessful] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()

        const user = {
            username: username.current.value,
            password: password.current.value
        }

        loginUser(user).then(res => {
            if ("valid" in res && res.valid) {
                // Set the token in my state
                setToken(res.token)

                // Capture and store the userProfileId in localStorage
                const userProfileId = res.userProfileId;
                localStorage.setItem("userProfileId", userProfileId);

                // Navigate to the desired route
                navigate("/tanks")
            }
            else {
                setisUnsuccessful(true)
            }
        })
    }

    return (
        <div className="login-page">
            <div className="bubbles-background">
                <section class="sticky">
                    <div class="bubbles">
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>
                        <div class="bubble"></div>

                    </div>
                </section>
            </div>      
            <section className="login-container">
                <form className="login-card" onSubmit={handleLogin}>
                    <h1 className="title">Trophy Tanks</h1>
                    <p className="subtitle">Please sign in</p>

                    <div className="field">
                        <label className="login-label">Username</label>
                        <div className="control">
                            <input className="login-input" type="text" ref={username} />
                        </div>
                    </div>

                    <div className="field">
                        <label className="login-label">Password</label>
                        <div className="control">
                            <input className="login-input" type="password" ref={password} />
                        </div>
                    </div>

                    <div className="login-buttons">
                        <div className="control">
                            <button className="button is-link" type="submit" >Submit</button>
                        </div>
                        <div className="control">
                            <Link to="/register" className="button is-link is-light">Cancel</Link>
                        </div>
                    </div>
                    {
                        isUnsuccessful ? <p className="help is-danger">Username or password not valid</p> : ''
                    }
                </form>
            </section>
        </div> 
    )
}
