import React from 'react';
import { Link } from 'react-router-dom'

export const Login = () => {
    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            <form className='form-group' autoComplete='off'>
                <label>Email</label>
                <input type="email" className='form-control' required></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required></input>
                <br></br>
                <div className='btn-box'>
                    <span>Don't have an account yet? Sign up
                        <Link to="/signup" className='link'> here</Link>
                    </span>
                    <button type='submit' className='btn btn-success btn-md'>Login</button>
                </div>
            </form>
        </div>
    )
}