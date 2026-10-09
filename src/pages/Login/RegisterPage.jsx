import LoginButton from "../../components/LoginButton"
import './RegisterPage.css'
import axiosInstance from '../../../api/axiosInstance'
import { useContext, useState } from "react";
import Timer from "../../components/Timer";
import icon_visible from '../../assets/icon_visible.png';
import icon_invisible from '../../assets/icon_invisible.png';
import icon_tooltip from '../../assets/icon_tooltip.png';
import { SignupContext } from "../../context/SignupContext";
import Popup from "../../components/Popup";

export default function RegisterPage() {
    const { checks } = useContext(SignupContext);
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [emailAtCode, setEmailAtCode] = useState('');
    const [code, setCode] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [pwVisibility, setPwVisibility] = useState(false);
    const [pwCheckVisibility, setPwCheckVisibility] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [codeChecked, setCodeChecked] = useState(false);
    const [messages, setMessages] = useState([]);
    const [timerKey, setTimerKey] = useState(0);
    const allChecked = id && emailAtCode && codeChecked && pw && pw == pwCheck;

    async function handleEmailCodeGet() {
        try {
            setEmailAtCode(email);
            const response = await axiosInstance.post(
                '/auth/send-code',
                {
                    email: email
                }
            )
            setCodeSent(true);
            setTimerKey(timerKey + 1);
            setMessages({...messages, emailError: ''});
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.code == 'EMAIL_DUPLICATED') {
                setMessages({...messages, emailError: `* 이미 가입된 이메일입니다.`});
            } else if (error.response.data.code == 'INVALID_INPUT') {
                setMessages({...messages, emailError: `* 이메일 형식이 올바르지 않습니다.`});
            } else {
                setMessages({...messages, emailError: `* ${error.response.data.message}.`});
            }
        }
    }

    async function handleCodeCheck() {
        try {
            const response = await axiosInstance.post(
                '/auth/verify-code',
                {
                    email: emailAtCode,
                    code: code
                }
            )
            setMessages({...messages, codeError: '', codeMessage: '* 인증 완료!'});
            setCodeChecked(true);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.code == 'VERIFICATION_CODE_MISMATCH') {
                setMessages({...messages, codeError: `* 인증코드가 올바르지 않습니다.`});
            } else if (error.response.data.code == 'INVALID_INPUT') {
                setMessages({...messages, codeError: `* 인증코드는 영문, 숫자 6자리입니다.`});
            } else {
                setMessages({...messages, codeError: `* ${error.response.data.message}.`});
            }
        }
    }

    function handlePwVisibility(type) {
        if (type == 'pw') {
            pwVisibility ? setPwVisibility(false) : setPwVisibility(true)
        } else {
            pwCheckVisibility ? setPwCheckVisibility(false) : setPwCheckVisibility(true);
        }
    }

    function handlePwCheck(e) {
        setPwCheck(e.target.value);
        if (pw != e.target.value) {
            setMessages({...messages, pwCheckError: '* 비밀번호가 일치하지 않습니다.'});
        } else {
            setMessages({...messages, pwCheckError: ''});
        }
    }

    async function handleRegister() {
        // 상황별 오류 빼놓기 - 백 수정 후 다시 확인
        // 가입 완료 시 팝업
        try {
            const response = await axiosInstance.post(
                '/auth/signup',
                {
                    loginId: id,
                    password: pw,
                    isOver14: checks.ageCheck,
                    agreedToTerms: checks.termsCheck,
                    agreedToPrivacy: checks.privacyCheck,
                    agreedToMarketing: checks.marketingCheck
                }
            )

            console.log(response);
        } catch (error) {
            console.log(error.response.data);
            // setMessages({});
            if (error.response.data.code == 'INVALID_INPUT') {
                if (error.response.data.message.includes('loginId')) {
                    setMessages({...messages, idError: '* 아이디는 4-20자의 영문, 숫자, 언더스코어 조합으로 입력해주세요.'});
                }
                if (error.response.data.message.includes('password')) {
                    setMessages({...messages, pwError: '* 비밀번호는 8-20자의 영문+숫자+특수문자 조합으로 설정해주세요.'});
                }
            } else if (error.response.data.code == 'LOGIN_ID_DUPLICATED') {
                setMessages({...messages, idError: '* 이미 사용 중인 아이디입니다.'});
            } else if (error.response.data.code == 'EMAIL_VERIFICATION_EXPIRED') {
                setMessages({...messages, emailError: '* 이메일 인증이 만료되었습니다.'});
            }
        }
    }

    return (
        <>
            <Popup visibility={false} mainText='회원가입이 완료되었습니다' subText='Artcation과 함께 새로운 공연 기회를 만나보세요.' />
            <div className="loginHeader registerHeader">
                <h1>계정 생성</h1>
                <p>계정을 만들고 나에게 맞는 공연 기회를 찾아보세요</p>
            </div>
            <div className="loginInputs registerInputs">
                <div>
                    <label htmlFor="id">아이디<span>*</span></label>
                    <input onChange={(e) => setId(e.target.value)} value={id} id="id" type="text" required />
                    <p>{messages.idError}</p>
                </div>
                <div>
                    <label htmlFor="email">이메일<span>*</span></label>
                    <div className="checkContainer">
                        <input onChange={(e) => setEmail(e.target.value)} value={email} id="email" type="email" required />
                        <button className="checkButton" style={!email ? {backgroundColor: '#BDBDBD'}  : {}} onClick={email ? handleEmailCodeGet : ''}>이메일 인증</button>
                    </div>
                    <p>{messages.emailError}</p>
                </div>
                {
                    codeSent
                    ?
                    <div>
                        <label htmlFor="code">인증번호</label>
                        <div className="checkContainer">
                            <div className="codeContainer">
                                <input onChange={(e) => setCode(e.target.value)} value={code} id="code" type="text" placeholder="전송된 코드 6자리" required />
                                {
                                    codeChecked
                                    ? ''
                                    :
                                    <Timer key={timerKey} isRunning={true} />
                                }
                            </div>
                            <button className="checkButton" onClick={handleCodeCheck}>확인</button>
                        </div>
                        <p style={{color: messages.codeMessage ? 'var(--primary-color)' : ''}}>{messages.codeMessage ? messages.codeMessage : messages.codeError}</p>
                    </div>
                    :
                    ''
                }
                <div>
                    <label htmlFor="password">비밀번호<span>*</span></label>
                    <div>
                        <input onChange={(e) => setPw(e.target.value)} value={pw} className="pwInput" id="password" type={pwVisibility ? 'text' : 'password'} required />
                        <button style={{ backgroundImage: `url(${pwVisibility ? icon_visible : icon_invisible})` }} onClick={() => handlePwVisibility('pw')} className="visibilityToggle"></button>
                    </div>
                    <p className={messages.pwError ? '' : "passwordDetail"}>* 영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요 <img className="tooltip" title="!@#$%^&*()_+-=[]{},.<>?" src={icon_tooltip} alt="tooltip" /></p>
                </div>
                <div>
                    <label htmlFor="passwordCheck">비밀번호 확인<span>*</span></label>
                    <div>
                        <input onChange={handlePwCheck} value={pwCheck} className="pwInput" id="passwordCheck" type={pwCheckVisibility ? 'text' : 'password'} required />
                        <button style={{ backgroundImage: `url(${pwCheckVisibility ? icon_visible : icon_invisible})` }} onClick={() => handlePwVisibility('pwCheck')} className="visibilityToggle"></button>
                    </div>
                    <p>{messages.pwCheckError}</p>
                </div>
            </div>
            <div className="registerFooter">
                <LoginButton onClick={handleRegister} type={allChecked ? 'active' : 'inactive'} text='가입하기' />
                <p>* 인증 코드가 오지 않았나요? <button onClick={handleEmailCodeGet}>인증번호 재전송</button></p>
            </div>
        </>
    )
}