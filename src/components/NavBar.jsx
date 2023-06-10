import React from 'react';
import { Link, Routes, Route } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>

        {/* <Routes>
            <Route path="/SignUp" element={ <SignUp />} />
            <Route path="/Login" element={ <Login />} />
        </Routes> */}
        </div>
    )
}