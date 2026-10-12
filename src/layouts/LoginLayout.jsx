import logo from '../assets/logo.png';
import './LoginLayout.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { LoginContext } from '../context/LoginContext';
import { SignupContext } from '../context/SignupContext'


export default function LoginLayout() {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(LoginContext);
    const [checks, setChecks] = useState({ageCheck: false, termsCheck: false, privacyCheck: false, marketingCheck: false});

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])

    function handleLogo() {
        navigate('/');
    }

    return (
        <div className="defaultLayout loginLayout">
            <div className="defaultTopBar loginTopBar">
                <img onClick={handleLogo} src={logo} alt="" />
            </div>
            <div>
                <div className='loginContainer'>
                    <SignupContext value={{checks, setChecks}}>
                        <Outlet />
                    </SignupContext>
                </div>
            </div>
        </div>
    );
}