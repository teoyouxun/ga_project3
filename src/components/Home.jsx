import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'; // Firebase listener to get the currently signed-in user
import { doc, getDoc, getDocs, collection, setDoc, onSnapshot } from 'firebase/firestore';
import { NavBar } from './NavBar'
import { Products } from './Products'
import { auth, db } from '../Config/Config';
import { useNavigate } from 'react-router-dom'

export const Home = () => {

    const navigate = useNavigate();

    // Checks for current user's uid. Eventually allows for adding cart items from specific user uid, even after page refresh.
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();

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

    // state of products
    const [products, setProducts]=useState([]);

    // getting products function
    const getProducts = async ()=>{
        const productsSnapshot = await getDocs(collection(db, 'Products'));

        const productsArray = [];
        productsSnapshot.forEach((doc) => {
            let data = doc.data();
            data.ID = doc.id;
            productsArray.push(data);
        });

        setProducts(productsArray);
        // const products = await db.collection('Products').get();
        // const productsArray = [];
        // for (let snap of products.docs){
        //     let data = snap.data();
        //     data.ID = snap.id;
        //     productsArray.push({
        //         ...data
        //     })
        //     if(productsArray.length === products.docs.length){
        //         setProducts(productsArray);
        //     }
        // }
    }

    useEffect(()=>{
        getProducts();
    },[]) // useEffect runs once only

    // state of totalProducts
    const [totalProducts, setTotalProducts]=useState(0);
    // getting cart products   
    useEffect(()=>{   
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              const cartCollectionRef = collection(db, 'Cart ' + user.uid);
              const unsubscribeCart = onSnapshot(cartCollectionRef, (snapshot) => {
                const qty = snapshot.docs.length;
                setTotalProducts(qty);
              });
              return unsubscribeCart;
            }
          });
      
          return () => {
            unsubscribe();
          };     
        // auth.onAuthStateChanged(user=>{
        //     if(user){
        //         fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
        //             const qty = snapshot.docs.length;
        //             setTotalProducts(qty);
        //         })
        //     }
        // })       
    },[])  

    // globl variable
    let Product;

    const addToCart = async (product) => {
        if(uid!==null){
            // console.log(product);
            // Product=product;
            // Product['qty']=1;
            // Product['TotalProductPrice']=Product.qty*Product.price;
            // fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
            //     console.log('successfully added to cart');
            // }) 
            // old namespaced API format above, new modular API format as below
            const Product = { ...product }; // creates new shallow copy of product object, 
            Product['qty'] = 1;
            Product['TotalProductPrice'] = Product.qty * Product.price;
            await setDoc(doc(db, `Cart ${uid}`, product.ID), Product); // stores 
            console.log('Item successfully added to cart');
        } else {
            navigate('/login');
        }

    }

    return (
        <>
            <NavBar user={user} totalProducts={totalProducts}/>           
            <br></br>
            {products.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Products</h1>
                    <div className='products-box'>
                        <Products products={products} addToCart={addToCart}/>
                    </div>
                </div>
            )}
            {products.length < 1 && (
                <div className='container-fluid'>Please wait....</div>
            )}
        </>
    )
}

