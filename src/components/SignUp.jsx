import React from 'react';
import { Link } from 'react-router-dom'

export const SignUp = () => {
    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Sign Up</h1>
            <hr></hr>
            <form className='form-group' autoComplete='off'>
                <label>Full Name</label>
                <input type="text" className='form-control' required></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account? Login
                        <Link to="/login" className='link'> here</Link>
                    </span>
                    <button type='submit' className='btn btn-success btn-md'>Register</button>
                </div>
            </form>
        </div>
    )
}