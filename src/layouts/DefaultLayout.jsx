import { Outlet } from 'react-router';
import logo from '../assets/logo.png';
import './DefaultLayout.css';
import { useNavigate } from 'react-router';
import axiosInstance from '../../api/axiosInstance';
import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';

export default function DefaultLayout() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext);
    const [ role, setRole ] = useState('');

    function handleLogo() {
        navigate('/');
    }

    async function handleLogout() {
        try {
            const response = await axiosInstance.post('/auth/logout');
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    async function handleIsLoggedIn() {
        try {
            const response = await axiosInstance.get('/users/me');
            setRole(response.data.data.role)
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    }
    
    useEffect(() => {
        handleIsLoggedIn();
    }, [])

    return (
        <div className="defaultLayout">
            <div className="defaultTopBar">
                <img onClick={handleLogo} src={logo} alt="" />
                <div className='personalArea'>
                    {
                        isLoggedIn ?
                        <>
                            {
                                role == 'ARTIST' ?
                                <button onClick={() => navigate('/applications')}>내 지원</button> :
                                <button onClick={() => navigate('/postings')}>내 공고</button>
                            }
                            <button onClick={handleLogout}>
                                로그아웃
                            </button>
                        </>
                        :
                        <button onClick={() => navigate('/login')}>
                            로그인
                        </button>
                    }
                </div>
            </div>
            <div className="defaultContent">
                <Outlet />
            </div>
        </div>
    );
}