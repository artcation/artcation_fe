import { useState } from 'react'
import './ApplicantDetail.css'

const REVIEW_RESULTS = ['선정', '보류', '미선정']

export default function ApplicantDetail() {
    const [reviewResult, setReviewResult] = useState('선정')

    return (
        <div className="applicantDetail">
            <div className="applicantDetailHeader">
                <div className="applicantProfile">
                    <div></div>
                    <div>
                        <div>팀 이름</div>
                        <div>공연 이력 n회 | 지원: 2026. 09. 28</div>
                    </div>
                </div>
                <div className="reviewToggle">
                    {REVIEW_RESULTS.map((name) => (
                        <button key={name} className={reviewResult == name ? 'toggleActive' : ''} 
                            onClick={() => setReviewResult(name)}>
                            {name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="applicantSection">
                <h3>지원자 정보</h3>
                <div className="applicantBox">
                    <div>
                        <div>대표자</div>
                        <div>김예슬</div>
                    </div>
                    <div>
                        <div>연락처</div>
                        <div>010-1234-5678</div>
                    </div>
                    <div>
                        <div>이메일</div>
                        <div>kimyeseul@example.com</div>
                    </div>
                </div>
            </div>

            <div className="applicantSection">
                <h3>포트폴리오</h3>
                <div className="applicantBox">(추후 구체화)</div>
            </div>

            <div className="applicantSection">
                <h3>요청 사항</h3>
                <div className="applicantBox">
                    피아노 사용이 가능한지 확인 부탁드립니다. 공연 전 간단한 리허설을 위해 1시간 정도 사전 사용이 가능하면 좋겠습니다.
                </div>
            </div>
        </div>
    )
}
