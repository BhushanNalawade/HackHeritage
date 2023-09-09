import './navigation.styles.css'
import { Fragment } from 'react';
import {Outlet, Link } from 'react-router-dom'
import { UserContext } from '../../../contexts/user.context';
import { useContext } from 'react';
import { signOutUser } from '../../utils/firebase.utils';

const Navigation = () => {
    const {currentUser , setCurrentUser }= useContext(UserContext);
    const signOutHandler = async () => {
        await signOutUser()
        setCurrentUser(null);
    }

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
            {currentUser? (
                <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
            ): (
                <Link className='nav-link' to='/auth'>
                SIGN IN
            </Link>
            )
            }
            </li>
        </ul>
        </nav>

        <Outlet />
        </Fragment>
    );
}

export default Navigation;