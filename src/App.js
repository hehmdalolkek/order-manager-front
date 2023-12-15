import React, { useState, useEffect } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './layout/Navbar';
import NavbarAdmin from './layout/NavbarAdmin';
import Home from './user/Home';
import Login from './user/Login';
import Logout from './admin/Logout';
import Dashboard from './admin/Dashboard';
import Cart from './user/Cart';
import ViewOrder from './admin/ViewOrder';
import EditOrder from './admin/EditOrder';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [authenticated, setAuthenticated] = useState(false);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = { ...product, quantity: 1 };
      setCartItems((prevItems) => [...prevItems, newItem]);
    }

    setTotal((prevTotal) => prevTotal + product.price);
  };

  const clearCart = () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('total');
    setCartItems([]);
    setTotal(0);
  };

  const updateCart = (item, newQuantity) => {
    const updatedItems = cartItems.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: newQuantity };
      }
      return cartItem;
    });

    setCartItems(updatedItems);
    setTotal((prevTotal) => prevTotal + (item.price * newQuantity - item.price * item.quantity));
  };

  const removeFromCart = (item) => {
    const updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(updatedItems);
    setTotal((prevTotal) => prevTotal - (item.price * item.quantity));
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    const storedTotal = localStorage.getItem('total');
    const token = localStorage.getItem('token');

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }

    if (storedTotal) {
      setTotal(Number(storedTotal));
    }

    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <div className="App min-vh-100" style={{ paddingTop: "75px" }}>
      <Router>

        {authenticated ? (
          <NavbarAdmin />
        ) : (
          <Navbar />
        )}

        <Routes>
          <Route exact path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
          <Route exact path="/logout" element={<Logout setAuthenticated={setAuthenticated} />} />
          <Route
            exact
            path="/"
            element={<Home onAddToCart={handleAddToCart} />}
          />
          <Route
            exact
            path="/cart"
            element={<Cart items={cartItems} total={total} clearCart={clearCart} updateCart={updateCart} removeFromCart={removeFromCart} />}
          />
          <Route
            exact
            path="/dashboard"
            element={
              authenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route 
            exact
            path="/order/:id" 
            element={
              authenticated ? (
                <ViewOrder />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route 
            exact
            path="/editorder/:id"
            element={
              authenticated ? (
                <EditOrder />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;