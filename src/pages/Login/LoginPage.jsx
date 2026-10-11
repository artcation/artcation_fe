import LoginButton from "../../components/LoginButton"
import { Link, useNavigate } from "react-router"
import './LoginPage.css'
import axiosInstance from "../../../api/axiosInstance";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";
import icon_visible from '../../assets/icon_visible.png';
import icon_invisible from '../../assets/icon_invisible.png';

export default function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [pwVisibility, setPwVisibility] = useState(false);
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(LoginContext);

    async function handleLogin() {
        try {
            const response = await axiosInstance.post('/auth/login', {
                loginId: id,
                password: password
            })
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.log(error);
            setErrors(error.response.data.message);
        }
    }

    function handlePwVisibility(type) {
        if (type == 'pw') {
            pwVisibility ? setPwVisibility(false) : setPwVisibility(true)
        } else {
            pwCheckVisibility ? setPwCheckVisibility(false) : setPwCheckVisibility(true);
        }
    }

    return (
        <>
            <div className="loginHeader">
                <h1>로그인</h1>
                <p>로그인하고 나에게 맞는 공연 기회를 찾아보세요</p>
            </div>
            <div className="loginInputs">
                <input value={id} onChange={(e) => setId(e.target.value)} type="text" placeholder="아이디" />
                <div>
                    <input placeholder="비밀번호" onChange={(e) => setPassword(e.target.value)} value={password} className="pwInput" id="password" type={pwVisibility ? 'text' : 'password'} required />
                    <button style={{ backgroundImage: `url(${pwVisibility ? icon_visible : icon_invisible})` }} onClick={() => handlePwVisibility('pw')} className="visibilityToggle"></button>
                </div>
                {
                    errors ?
                    <p>* {errors ? errors : ''}.</p>
                    :
                    ''
                }
                <LoginButton onClick={handleLogin} text="로그인" type={id && password ? "active" : 'inactive'} />
            </div>
            <div className="loginHelp">
                <Link to="/signup/terms">회원가입</Link>
                <span>|</span>
                <Link to="/find/id">아이디 찾기</Link>
                <span>|</span>
                <Link to="/find/password">비밀번호 찾기</Link>
            </div>
        </>
    )
}