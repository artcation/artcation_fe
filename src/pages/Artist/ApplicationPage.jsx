import BottomButton from "../../components/bottomButton";
import './ApplicationPage.css';
import { useState } from "react";

export default function ApplicationPage() {
    const [portfolio, setPortfolio] = useState('');
    const [request, setRequest] = useState('');

    return (
        <>
            <div className="applicationPage">
                <h1>공연 지원서 작성</h1>
                <ul>
                    <li>공연에 제출할 포트폴리오와 지원 내용을 작성해 주세요.</li>
                    <li>작성한 정보를 확인한 후 지원을 완료해 주세요.</li>
                    <li>지원 전 공연 일정과 장소를 다시 한 번 확인해 주세요.</li>
                </ul>
                <div>
                    <h2>공연 정보</h2>
                    <div className="postingPerformanceInfo">
                        <div>
                            공연일시
                        </div>
                        <div>
                            장소명
                        </div>
                        <div>
                            러닝타임
                        </div>
                        <div>
                            장르
                        </div>
                    </div>
                </div>
                <div className="applicationInputs">
                    <h2>지원 내용</h2>
                    <div>
                        <h3>내 포트폴리오<span>*</span></h3>
                        <textarea onChange={(e) => setPortfolio(e.target.value)} name="" id=""></textarea>
                    </div>
                    <div>
                        <h3>요청 사항</h3>
                         <input onChange={(e) => setRequest(e.target.value)} type="text" placeholder="지원 기관에 전달할 메시지를 입력해 주세요." />
                    </div>
                </div>
            </div>
            <div className="bottomBar">
                <BottomButton text='지원서 제출' type={portfolio ? 'primary' : 'inactive'} />
            </div>
        </>
    )
}