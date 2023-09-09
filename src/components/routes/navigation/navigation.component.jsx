import './navigation.styles.css'
import { Fragment } from 'react';
import {Outlet, Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <Fragment>
        <nav className="navbar">
        <ul className="nav-list">
            <li className="nav-item">
            <Link to="/enter-data" className="nav-link">
                Enter-Data
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/" className="nav-link">
                Dashboard
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/auth" className="nav-link">
                Sign In
            </Link>
            </li>
        </ul>
        </nav>

        <Outlet />
        </Fragment>
    );
}

export default Navigation;