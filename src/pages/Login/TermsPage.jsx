import LoginButton from "../../components/LoginButton";
import { Link } from "react-router";
import './TermsPage.css';
import { useNavigate } from "react-router";
import { SignupContext } from "../../context/SignupContext";
import { useContext } from "react";

export default function TermsPage() {
    const { checks, setChecks } = useContext(SignupContext);
    const allChecked = checks.ageCheck && checks.termsCheck && checks.privacyCheck;
    const navigate = useNavigate();

    function handleAgreeAll(e) {
        setChecks(Object.fromEntries(Object.keys(checks).map((key) => [key, e.target.checked])));
    }

    function handleIndividualCheck(e) {
        setChecks({...checks, [e.target.name]: e.target.checked});
    }

    function handleNavigate() {
        navigate('/signup/create');
    }


    return (
        <>
            <div className="loginHeader registerHeader">
                <h1>약관 동의</h1>
            </div>
            <div className="termsBody">
                <div>
                    <input onChange={handleAgreeAll} id="agreeAll" type="checkbox" />
                    <label htmlFor="agreeAll">약관 전체 동의</label>
                </div>
                <div>
                    <ul>
                        <li>전체 동의에는 필수 및 선택 항목에 대한 동의가 포함되며, 각 항목별로 개별 선택이 가능합니다.</li>
                        <li>선택 항목에 동의하지 않더라도 서비스 이용에는 제한이 없습니다.</li>
                    </ul>
                </div>
            </div>
            <div className="termsList">
                <div>
                    <input onChange={handleIndividualCheck} name="ageCheck" id="ageCheck" type="checkbox" checked={checks.ageCheck} />
                    <label htmlFor="ageCheck">[필수] 만 14세 이상입니다.</label>
                </div>
                <div>
                    <input onChange={handleIndividualCheck} name="termsCheck" id="termsCheck" type="checkbox" checked={checks.termsCheck} />
                    <label htmlFor="termsCheck">[필수] <Link>이용약관 동의</Link></label>
                </div>
                <div>
                    <input onChange={handleIndividualCheck} name="privacyCheck" id="privacyCheck" type="checkbox" checked={checks.privacyCheck} />
                    <label htmlFor="privacyCheck">[필수] <Link>개인정보 수집·이용 동의</Link></label>
                </div>
                <div>
                    <input onChange={handleIndividualCheck} name="marketingCheck" id="marketingCheck" type="checkbox" checked={checks.marketingCheck} />
                    <label htmlFor="marketingCheck">[선택] 마케팅 정보 수신 동의 (이메일)</label>
                </div>
            </div>
            <LoginButton onClick={handleNavigate} type={allChecked ? 'active' : 'inactive'} text='다음' />
        </>
    )
}