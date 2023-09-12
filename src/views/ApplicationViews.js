import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { TankList } from "../components/tanks/TanksList"
import { TankDetails } from "../components/tanks/TankDetails"
import { EditTankForm } from "../components/tanks/EditTank"
// import { TagList } from "../components/tags/TagList"
import { CurrentUserTanks } from "../components/tanks/CurrentUserTanks"
// import { UserList } from "../components/users/UserList"
// import { TankForm } from "../components/tanks/TankForm"
import { useState, useEffect } from "react"
// import { getAllTags } from "../managers/TagManager"
// import { UserProfile } from "../components/users/UserDetails";  // Adjust the path as needed



export const ApplicationViews = ({ token, setToken }) => {

    const [tags, setTags] = useState([]);

    // useEffect(() => {
    //     // Fetch tags from the server and update the state
    //     getAllTags().then((tagsData) => setTags(tagsData));
    // }, []);


    return <>
        <Routes>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register setToken={setToken} />} />
            <Route element={<Authorized token={token} />} >

                <Route path="/tanks">
                    <Route index element={<TankList setToken={setToken} />} />
                </Route>
                <Route path="/tanks/:tankId" element={<TankDetails />} />
                <Route path="/tanks/:tankId/edit" element={<EditTankForm token={token} setToken={setToken} />} />
                
                <Route path="/my-tanks">
                    <Route index element={<CurrentUserTanks token={token} />} />

                </Route>

                
            </Route>

        </Routes>
    </>
}

{/* <Route path="/tanks/:tankId/edit" element={<EditTankForm token={token} setToken={setToken} />} />
<Route path=":tankId" element={<TankDetails setToken={setToken} />} />
<Route path="create" element={<TankForm token={token} setToken={setToken} categories={categories} tags={tags} />} /> */}

{/* <Route path="/tags">
                    <Route index element={<TagList setToken={setToken} />} />
                </Route>

                <Route path="/users">
                    <Route index element={<UserList setToken={setToken} />} />
                    <Route path=":userId" element={<UserProfile />} />
                </Route> */}