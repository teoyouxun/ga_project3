import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Config/Config';
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleLogin = (e)=>{
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(auth, email, password).then((credentials) => {
            // Signed in
            const user = credentials.user;
            setSuccessMsg('Login successful! Redirecting to home page...')
                setEmail(''); // reset form fields
                setPassword('');
                setErrorMsg(''); // clear error message
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/'); //redirect to home page after 3s
                },3000)
        }).catch(error=>setErrorMsg(error.message));
    };

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete='off' onSubmit={handleLogin}>
                <label>Email</label>
                <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Don't have an account yet? Sign up
                        <Link to="/signup" className='link'> here</Link>
                    </span>
                    <button type='submit' className='btn btn-success btn-md'>Login</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>
                <br></br>
            </>}
        </div>
    )
}