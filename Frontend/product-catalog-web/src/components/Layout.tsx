import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import styles from './Layout.module.css';

import Home from '../pages/Home';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/EditProduct';
import Register from '../pages/Register';
import Login from '../pages/Login';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
        window.location.reload();
    };

    return (
        <div>
            <nav className={styles.navbar}>
                <Link to="/" className={styles.link}>Home</Link>
                <div className={styles.navLinks}>
                    {!token ? (
                        <>
                            <Link to="/login" className={styles.link}>Login</Link>
                            <Link to="/register" className={styles.link}>Registrar</Link>
                        </>
                    ) : (
                        <button onClick={handleLogout} className={styles.logoutButton}>
                            Logout
                        </button>
                    )}
                </div>
            </nav>

            <main style={{ padding: '1rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<AddProduct />} />
                    <Route path="/edit/:id" element={<EditProduct />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>
        </div>
    );
};

export default Layout;