import LoginButton from "../../components/LoginButton"
import { Link } from "react-router"
import './LoginPage.css'

export default function LoginPage() {
    return (
        <>
            <div className="loginHeader">
                <h1>로그인</h1>
                <p>로그인하고 나에게 맞는 공연 기회를 찾아보세요</p>
            </div>
            <div className="loginInputs">
                <input type="text" placeholder="아이디" />
                <input type="password" placeholder="비밀번호" />
                <LoginButton text="로그인" type="active" />
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