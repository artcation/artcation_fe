import LoginButton from "../../components/LoginButton";
import { useState } from "react";
import icon_visible from '../../assets/icon_visible.png';
import icon_invisible from '../../assets/icon_invisible.png';
import icon_tooltip from '../../assets/icon_tooltip.png';
import icon_check from '../../assets/icon_check.png';
import axiosInstance from "../../../api/axiosInstance";
import { useSearchParams } from "react-router";
import NoticePopup from "../../components/NoticePopup";

export default function ResetPage() {
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [pwVisibility, setPwVisibility] = useState(false);
    const [pwCheckVisibility, setPwCheckVisibility] = useState(false);
    const [messages, setMessages] = useState([]);
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [popupVisibility, setPopupVisibility] = useState(false);

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

    async function handleResetPw() {
        try {
            const response = await axiosInstance.post('/auth/password-reset/confirm', {
                resetToken: token,
                newPassword: pw
            });
            setPopupVisibility(true);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <NoticePopup mainText={<p>비밀번호가 변경되었습니다</p>} image={icon_check} visibility={true} />
            <div className="loginHeader registerHeader">
                <h1>비밀번호 재설정</h1>
                <p>새 비밀번호를 설정해 주세요</p>
            </div>
            <div className="loginInputs registerInputs">
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
            <LoginButton onClick={handleResetPw} type={pw && pw == pwCheck ? 'active' : 'inactive'} text={"재설정하기"} />
        </>
    )
}