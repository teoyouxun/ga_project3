import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Config/Config';
import { Link, useNavigate } from 'react-router-dom' //useNavigate instead of useHistory (deprecated)

export const SignUp = () => {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSignup = (e)=>{
        e.preventDefault();
        // console.log(fullName, email, password);
        createUserWithEmailAndPassword(auth, email, password).then((credentials) => {
            //Signed in
            console.log(credentials);
            const user = credentials.user;
            // db.collection('users').doc(credentials.user.uid).set({
            //     FullName: fullName,
            //     Email: email,
            //     Password: password      (OLD Web Namespaced API method)
            setDoc(doc(db, 'users', user.uid), {
                FullName: fullName,
                Email: email,
                Password: password // new Web modular API method
            }).then(()=>{
                setSuccessMsg('Signup successful! You will now be redirected to login.')
                setFullName(''); // reset form fields 
                setEmail('');
                setPassword('');
                setErrorMsg(''); // clear error message
                setTimeout(()=>{
                    setSuccessMsg('');
                    navigate('/login'); //redirect to login page after 3s
                },3000)
            }).catch(error=>setErrorMsg(error.message));
        }).catch((error)=>{
            setErrorMsg(error.message);
        })
    };
    //async Firebase function that creates user by taking email and password arguments, which gets its values from the email and password useStates

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Sign Up</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete='off' onSubmit={handleSignup}>
                <label>Full Name</label>
                <input type="text" className='form-control' required onChange={(e) => setFullName(e.target.value)} value={fullName}></input>
                <br></br>
                <label>Email</label>
                <input type="email" className='form-control' required onChange={(e) => setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required onChange={(e) => setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Already have an account? Login
                        <Link to="/login" className='link'> here</Link>
                    </span>
                    <button type='submit' className='btn btn-success btn-md'>Register</button>
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