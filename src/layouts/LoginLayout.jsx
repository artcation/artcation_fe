import logo from '../assets/logo.png';
import './LoginLayout.css';
import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router';
import { SignupContext } from '../context/SignupContext'


export default function LoginLayout() {
    const navigate = useNavigate();
    const [checks, setChecks] = useState({ageCheck: false, termsCheck: false, privacyCheck: false, marketingCheck: false});

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