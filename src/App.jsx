import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Home } from './components/Home'
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
import { AddProducts } from './components/AddProducts'
import { Cart } from './components/Cart'


export const App = () => {
    return (
        <BrowserRouter>
        <div>
            <Routes>
            <Route path="/" element={ <Home />} />
            
            <Route path="/signup" element={ <SignUp />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/add-products" element={ <AddProducts />} />
            <Route path="/cart" element={ <Cart />} /> 
        
            </Routes>
        </div>
        </BrowserRouter>
        )
    }

export default App

