import React, { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { registerUser } from "../../managers/AuthManager"
import "./RegisterPage.css";

export const Register = () => {
    const account_type = useRef();
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        username: "",
        bio: "",
        password: "",
        account_type: "profile"
    })
    const navigate = useNavigate()


    const handleRegister = (e) => {
        e.preventDefault()

        fetch(`http://localhost:8000/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(res => {
            console.log('Response Status:', res.status);
            console.log('Response Headers:', res.headers);
            
            // Check if the response status is OK (200)
            if (res.status === 200) {
                return res.json(); // Parse JSON if the response is OK
            } else {
                throw new Error('Registration failed'); // Handle non-OK status codes
            }
        })
        .then(response => {
            if (response.token) {
                navigate("/login")
            } else {
                window.alert(response.message || 'Registration failed');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.alert('Registration failed. Please try again.')
        })
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setUserData({
            ...userData,
            [e.target.name]: value
        })
    }

    

    return (
        <div className="register-page">
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
            <section className="register-container">
                <h1 className="title">Trophy Tanks</h1>
                <p className="subtitle">Create an account</p>
                <form className="register-card" onSubmit={handleRegister}>
                    <div className="register__columns">
                        <div className="left__column">
                            <div className="field">
                                <label className="label">First Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="first_name" required onChange={handleChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Last Name</label>
                                <div className="control">
                                    <input className="input" type="text" name="last_name" required onChange={handleChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Username</label>
                                <div className="control">
                                    <input className="input" type="text" name="username" required onChange={handleChange} />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input className="input" type="email" name="email" required onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <div className="right__column">
                            <div className="field">
                                <label className="label">Account Type</label>
                                <div className="control">
                                    <select className="select" name="account_type" onChange={handleChange}>
                                        <option value="profile">Profile</option>
                                    </select>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Password</label>
                                <div className="field-body">
                                    <div className="field">
                                        <p className="control is-expanded">
                                            <input className="input" type="password" placeholder="Password" name="password" required onChange={handleChange} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Bio</label>
                                <div className="control">
                                    <textarea className="textarea" placeholder="Tell us your favorite style of aqua-scape and aquatic life to keep" name="bio" onChange={handleChange}></textarea>
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div className="register-buttons">
                        <div className="control">
                            <button className="button is-link" type="submit">Register</button>
                        </div>
                        <div className="control">
                            <Link to="/login" className="button is-link is-light">Already a member? Login</Link>
                        </div>
                    </div>

                </form>
            </section>
            
        </div>
    )
}

// import { useRef } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { registerUser } from "../../managers/AuthManager"
// import "./RegisterPage.css";

// export const Register = ({ setToken }) => {
//     const firstName = useRef()
//     const lastName = useRef()
//     const email = useRef()
//     const username = useRef()
//     const bio = useRef()
//     const password = useRef()
//     const verifyPassword = useRef()
//     const passwordDialog = useRef()
//     const account_type = useRef();
//     const navigate = useNavigate()


//     const handleRegister = (e) => {
//         e.preventDefault()

//         if (password.current.value === verifyPassword.current.value) {
//             const newUser = {
//                 username: username.current.value,
//                 first_name: firstName.current.value,
//                 last_name: lastName.current.value,
//                 email: email.current.value,
//                 password: password.current.value,
//                 bio: bio.current.value,
//                 account_type: account_type.current.value
//             }

//             registerUser(newUser)
//                 .then(res => {
//                     if ("valid" in res && res.valid) {
//                         setToken(res.token);

//                         // Capture and store the userProfileId in localStorage
//                         const userProfileId = res.userProfileId;
//                         localStorage.setItem("userProfileId", userProfileId);

//                         navigate("/tanks");
//                     }
//                 })
//         } else {
//             passwordDialog.current.showModal()
//         }
//     }

//     return (
//         <div className="register-page">
//             <div className="bubbles-background">
//                 <section class="sticky">
//                     <div class="bubbles">
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>
//                         <div class="bubble"></div>

//                     </div>
//                 </section>
//             </div>
//             <section className="register-container">
//                 <h1 className="title">Trophy Tanks</h1>
//                 <p className="subtitle">Create an account</p>
//                 <form className="register-card" onSubmit={handleRegister}>
//                     <div className="register__columns">
//                         <div className="left__column">
//                             <div className="field">
//                                 <label className="label">First Name</label>
//                                 <div className="control">
//                                     <input className="input" type="text" ref={firstName} />
//                                 </div>
//                             </div>

//                             <div className="field">
//                                 <label className="label">Last Name</label>
//                                 <div className="control">
//                                     <input className="input" type="text" ref={lastName} />
//                                 </div>
//                             </div>

//                             <div className="field">
//                                 <label className="label">Username</label>
//                                 <div className="control">
//                                     <input className="input" type="text" ref={username} />
//                                 </div>
//                             </div>

//                             <div className="field">
//                                 <label className="label">Email</label>
//                                 <div className="control">
//                                     <input className="input" type="email" ref={email} />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="right__column">
//                             <div className="field">
//                                 <label className="label">Account Type</label>
//                                 <div className="control">
//                                     <select className="select" ref={account_type}>
//                                         <option value="profile">Profile</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             <div className="field">
//                                 <label className="label">Password</label>
//                                 <div className="field-body">
//                                     <div className="field">
//                                         <p className="control is-expanded">
//                                             <input className="input" type="password" placeholder="Password" ref={password} />
//                                         </p>
//                                     </div>

//                                     <div className="field">
//                                         <p className="control is-expanded">
//                                             <input className="input" type="password" placeholder="Verify Password" ref={verifyPassword} />
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="field">
//                                 <label className="label">Bio</label>
//                                 <div className="control">
//                                     <textarea className="textarea" placeholder="Tell us your favorite style of aqua-scape and aquatic life to keep" ref={bio}></textarea>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="register-buttons">
//                         <div className="control">
//                             <button className="button is-link" type="submit">Submit</button>
//                         </div>
//                         <div className="control">
//                             <Link to="/login" className="button is-link is-light">Cancel</Link>
//                         </div>
//                     </div>

//                 </form>
//             </section>

//         </div>
//     )
// }