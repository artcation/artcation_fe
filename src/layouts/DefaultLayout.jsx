import { Outlet } from 'react-router';
import logo from '../assets/logo.png';
import './DefaultLayout.css';
import { useNavigate } from 'react-router';

export default function DefaultLayout() {
    const navigate = useNavigate();

    function handleLogo() {
        navigate('/');
    }

    return (
        <div className="defaultLayout">
            <div className="defaultTopBar">
                <img onClick={handleLogo} src={logo} alt="" />
                <div className='personalArea'>
                    추후 구현
                </div>
            </div>
            <div className="defaultContent">
                <Outlet />
            </div>
        </div>
    );
}