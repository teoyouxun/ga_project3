import { useState, useEffect } from 'react'
import { NavBar } from './NavBar'
import { auth, db } from '../Config/Config'
import { onAuthStateChanged } from 'firebase/auth'
import { CartProducts } from './CartProducts';
import { collection, query, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore'
import { StripeCheckout } from 'react-stripe-checkout';

export const Cart = () => {


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

    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the cartProducts state
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const unsubscribeCartProducts = onSnapshot(
                    query(collection(db, 'Cart ' + user.uid)), // query instead of getDoc to get multiple objects
                    (snapshot) => {
                        const newCartProducts = snapshot.docs.map((doc) => ({
                            ID: doc.id,
                            ...doc.data(),
                        }));
                        setCartProducts(newCartProducts);
                    }
                );

                return () => {
                    unsubscribeCartProducts();
                };
            } else {
                console.log('User is not signed in to retrieve cart');
            }
        });
        return () => {
            unsubscribe(); // clean up useEffect
        };
    },[])

    // console.log(cartProducts);

    // getting the qty of each item from cartProducts in a separate array (e.g. [3, 3, 1])
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // combining the qty into a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty, 0); // 

    // console.log(totalQty); displays 7

    // getting the TotalProductPrice from cartProducts in a separate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    // combining the price into a single value
    const reducerOfPrice = (accumulator, currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice, 0);

    // global variable
    let Product;

    // cart product increase qty function
    const cartProductIncrease = (cartProduct) => {
        // console.log(cartProduct);
        Product = cartProduct;
        Product.qty = Product.qty + 1;
        Product.TotalProductPrice = Product.qty * Product.price;
        // updating in database
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const cartDocRef = doc(db, 'Cart ' + user.uid, cartProduct.ID);
                updateDoc(cartDocRef, Product).then(() => {
                    console.log('qty +1');
                });
            } else {
                console.log('User is not logged in');
            }
        })
    }

    // cart product decrease qty function
    const cartProductDecrease =(cartProduct)=>{
        Product=cartProduct;
        if(Product.qty > 1){
            Product.qty = Product.qty - 1;
            Product.TotalProductPrice = Product.qty * Product.price;
             // updating in database
             onAuthStateChanged(auth, (user) => {
                if (user) {
                    const cartDocRef = doc(db, 'Cart ' + user.uid, cartProduct.ID);
                    updateDoc(cartDocRef, Product).then(() => {
                        console.log('qty -1');
                    });
                } else {
                    console.log('User is not logged in');
                }
            })
        }
    }

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
        }, []);

    return (
        <>
            <NavBar user={user} totalProducts={totalProducts}/>           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}
                            cartProductIncrease={cartProductIncrease}
                            cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Total Price to Pay: <span>$ {totalPrice}</span>
                        </div>
                        <br></br>
                        <button className='btn btn-secondary btn-md' 
                        >Confirm Order</button>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div className='container-fluid'>No products to show</div>
            ) }           
        </>
    )
}