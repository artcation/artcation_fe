import { useNavigate, useParams } from "react-router";
import LoginButton from "../../components/LoginButton";
import { useState } from "react";
import './FindPage.css'
import axiosInstance from "../../../api/axiosInstance";

export default function FindPage() {
    const { type } = useParams();
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [messages, setMessages] = useState(null);
    const navigate = useNavigate();

    async function handleFind() {
        try {
            let response;
            if (type == 'id') {
                    response = await axiosInstance.post('/auth/find-login-id', {
                    email: email
                })
            } else {
                    response = await axiosInstance.post('/auth/password-reset/request', {
                    email: email,
                    loginId: id
                })
            }
            
            setMessages({...messages, emailError: ''});
            setCodeSent(true);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.code == 'INVALID_INPUT') {
                setMessages({...messages, emailError: `* 이메일 형식이 올바르지 않습니다.`});
            } else if (error.response.data.code == 'ACCOUNT_NOT_FOUND') {
                setMessages({...messages, emailError: `* 해당 이메일로 가입된 계정이 없습니다.`});
            } else if (error.response.data.code == 'SEND_LIMIT_EXCEEDED') {
                setMessages({...messages, emailError: `* 요청 한도를 초과했습니다.`});
            } else {
                setMessages({...messages, emailError: `* ${error.response.data.message}.`});
            }
        }
    }

    return (
        <>
            <div className="loginHeader registerHeader">
                <h1>{type == 'id' ? '아이디' : '비밀번호'} 찾기</h1>
                <p>가입하신 이메일 주소를 입력하면 재설정 안내를 보내드려요</p>
            </div>
            <div className="loginInputs registerInputs">
                {
                    type == 'password' ? 
                    <div>
                        <label htmlFor="email">아이디<span>*</span></label>
                        <input onChange={(e) => setId(e.target.value)} value={id} id="id" type="id" required />
                        <p>{messages?.idError}</p>
                    </div> : ''
                }
                <div>
                    <label htmlFor="email">이메일<span>*</span></label>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" type="email" required />
                    {
                        messages?.emailError || codeSent ?
                        (
                            codeSent ? <p style={{ color: "var(--primary-color)"}}>* {type == id ? "아이디를 이메일로 발송했습니다." : "재설정 메일을 보냈습니다. 변경 후 로그인해 주세요." }</p> :
                            <p>{messages?.emailError}</p>
                        ) : ''
                    }
                </div>
            </div>
            <div className="registerFooter">
                <LoginButton onClick={handleFind} type={type == 'id' ? (email ? 'active' : 'inactive') : (email && id ? 'active' : 'inactive')} text={'이메일 발송'} />
                <LoginButton onClick={() => navigate('/login')} find={true} text={'로그인 화면으로 돌아가기'} />
                <p>* 인증 코드가 오지 않았나요? <button onClick={handleFind}>인증번호 재전송</button></p>
            </div>
        </>
    )
}