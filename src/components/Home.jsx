import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'; // Firebase listener to get the currently signed-in user
import { doc, getDoc } from 'firebase/firestore';
import { NavBar } from './NavBar'
import { Products } from './Products'
import { auth, db } from '../Config/Config';

export const Home = () => {

    // retrieve current user info (if logged in)
    function getCurrentUser(){
        const [user, setUser] = useState(null);

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    getDoc(doc(db, 'users', user.uid)).then((snapshot) => {
                        setUser(snapshot.data().FullName);
                    }).catch((error) => {
                        console.log('Error retrieving user data', error);
                    });
                } else {
                    setUser(null);
                }
            })
            return () => { unsubscribe(); // clean up useEffect
        };
    }, []);

    return user;
    }

    const user = getCurrentUser();
    console.log(user)

    return (
        <div>
            <NavBar user={user}/>
            <Products/>
        </div>
    )
}

