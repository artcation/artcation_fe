import LoginButton from "../../components/LoginButton"
import { Link, useNavigate } from "react-router"
import './LoginPage.css'
import axiosInstance from "../../../api/axiosInstance";
import { useContext, useState } from "react";
import { LoginContext } from "../../context/LoginContext";

export default function LoginPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
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

    return (
        <>
            <div className="loginHeader">
                <h1>로그인</h1>
                <p>로그인하고 나에게 맞는 공연 기회를 찾아보세요</p>
            </div>
            <div className="loginInputs">
                <input value={id} onChange={(e) => setId(e.target.value)} type="text" placeholder="아이디" />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="비밀번호" />
                {
                    errors ?
                    <p>* {errors}.</p>
                    :
                    ''
                }
                <LoginButton onClick={handleLogin} text="로그인" type={id && password ? "active" : 'inactive'} />
            </div>
            <div className="loginHelp">
                <Link to="/signup/terms">회원가입</Link>
                <span>|</span>
                <Link>아이디 찾기</Link>
                <span>|</span>
                <Link>비밀번호 찾기</Link>
            </div>
        </>
    )
}