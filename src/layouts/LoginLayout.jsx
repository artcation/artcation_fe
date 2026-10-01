import { Outlet } from 'react-router';
import logo from '../assets/logo.png';
import './LoginLayout.css';
import { useNavigate } from 'react-router';

export default function LoginLayout() {
    const navigate = useNavigate();

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
                    <Outlet />
                </div>
            </div>
        </div>
    );
}