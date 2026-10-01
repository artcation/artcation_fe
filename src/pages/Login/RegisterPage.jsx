import LoginButton from "../../components/LoginButton"
import './RegisterPage.css'
import { useState } from "react";

export default function RegisterPage() {
    const [pwVisibility, setPwVisibility] = useState(false);
    const [pwCheckVisibility, setPwCheckVisibility] = useState(false);

    function handlePwVisibility() {
        if (pwVisibility) {
            setPwVisibility(false);
        } else {
            setPwVisibility(true);
        }
    }

    function handlePwCheckVisibility() {
        if (pwCheckVisibility) {
            setPwCheckVisibility(false);
        } else {
            setPwCheckVisibility(true);
        }
    }

    return (
        <>
            <div className="loginHeader registerHeader">
                <h1>계정 생성</h1>
                <p>계정을 만들고 나에게 맞는 공연 기회를 찾아보세요</p>
            </div>
            <div className="loginInputs registerInputs">
                <div>
                    <label htmlFor="nickname">닉네임<span>*</span></label>
                    <input id="nickname" type="text" />
                    <p>오류메시지</p>
                </div>
                <div>
                    <label htmlFor="email">이메일<span>*</span></label>
                    <div>
                        <input id="email" type="text" />
                        <button>이메일 인증</button>
                    </div>
                    <p>오류메시지</p>
                </div>
                <div>
                    <label htmlFor="code">인증번호</label>
                    <div>
                        <input id="code" type="text" placeholder="전송된 코드 6자리" />
                        <button>확인</button>
                    </div>
                    <p>오류메시지</p>
                </div>
                <div>
                    <label htmlFor="password">비밀번호<span>*</span></label>
                    <div>
                        <input className="pwInput" id="password" type={pwVisibility ? 'text' : 'password'} />
                        <button onClick={handlePwVisibility} className="visibilityToggle"></button>
                    </div>
                    <p>* 영문, 숫자, 특수문자 포함 8자리 이상 입력해 주세요.</p>
                </div>
                <div>
                    <label htmlFor="passwordCheck">비밀번호 확인<span>*</span></label>
                    <div>
                        <input className="pwInput" id="passwordCheck" type={pwCheckVisibility ? 'text' : 'password'} />
                        <button onClick={handlePwCheckVisibility} className="visibilityToggle"></button>
                    </div>
                    <p>오류메시지</p>
                </div>
            </div>
            <div className="registerFooter">
                <div>
                    <input id="ageCheck" type="checkbox" />
                    <label htmlFor="ageCheck">만 14세 이상입니다.</label>
                </div>
                <LoginButton text='가입하기' />
            </div>
        </>
    )
}