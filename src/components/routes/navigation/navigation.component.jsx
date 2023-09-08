import './navigation.styles.css'
import { Outlet , Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="navbar">
        <ul className="nav-list">
            <li className="nav-item">
            <Link to="/enter-data" className="nav-link">
                Enter-Data
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/dashboard" className="nav-link">
                Dashboard
            </Link>
            </li>
            <li className="nav-item">
            <Link to="/signin" className="nav-link">
                Sign In
            </Link>
            </li>
        </ul>
        </nav>
    );
}

export default Navigation;