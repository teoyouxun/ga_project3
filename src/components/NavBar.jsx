import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../images/logo.png'
import { Icon } from 'react-icons-kit'
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { auth } from '../Config/Config'
import { signOut } from 'firebase/auth'

export const NavBar = ({user}) => {

    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
     
    
    const handleLogout = () => {
        setSuccessMsg('Logging out...');

        signOut(auth).then(() => {
                setTimeout(()=>{
                    setSuccessMsg('');
                navigate('/login'); //redirect to login page after 3s
            },3000);
        });
    };

    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <img src={logo} alt="logo"/>
                </div>
            </div>
            <div className='rightside'>

                {!user&&<>
                    <div><Link to="/signup">Sign Up</Link></div>
                    <div><Link to="/login">Login</Link></div>
                </>} 

                {/* if user is not logged in, display links on page, otherwise... */}

                {user&&<>
                    <div><Link className='navlink' to="/">{user}</Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                            <Icon icon={shoppingCart} size={20}/>
                        </Link>
                        {/* <span className='cart-indicator'>{totalQty}</span> */}
                    </div>
                    <div className='btn btn-danger btn-md' onClick={handleLogout}>
                        {successMsg ? successMsg : 'Logout'}
                    </div>
                    </>}    
            </div>
        </div>
    )
}