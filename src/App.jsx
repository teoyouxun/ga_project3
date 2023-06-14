import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Home } from './components/Home'
import { SignUp } from './components/SignUp'
import { Login } from './components/Login'
import { NotFound } from './components/NotFound'
import { AddProducts } from './components/AddProducts'


export const App = () => {
    return (
        <BrowserRouter>
        <div>
            <Routes>
            <Route path="/" element={ <Home />} />
            
            <Route path="/signup" element={ <SignUp />} />
            <Route path="/login" element={ <Login />} />
            <Route path="/add-products" element={ <AddProducts />} />
            {/* <Route path="/login" element={ <NotFound />} /> Switch + component deprecated, look for another solution to this*/} 
        
            </Routes>
        </div>
        </BrowserRouter>
        )
    }

export default App

    // function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )


