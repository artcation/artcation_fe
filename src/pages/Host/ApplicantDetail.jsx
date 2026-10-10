import { useState, useEffect } from 'react'
import './ApplicantDetail.css'
import axiosInstance from '../../../api/axiosInstance'

const REVIEW_RESULTS = ['선정', '보류', '미선정']

function formatDate(date) {
    return date.replaceAll('-', '. ')
}

export default function ApplicantDetail({recruitmentId, applicationId}) {
    const [reviewResult, setReviewResult] = useState('선정')
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        async function getDetail() {
            try {
                const response = await axiosInstance.get(`/host/recruitments/${recruitmentId}/applications/${applicationId}`);
                setDetail(response.data.data);
            } catch(error) {
                console.log(error);
            }
        }
        getDetail();
    }, [recruitmentId, applicationId])

    if (!detail) return null;

    return (
        <div className="applicantDetail">
            <div className="applicantDetailHeader">
                <div className="applicantProfile">
                    <div></div>
                    <div>
                        <div>{detail.teamName}</div>
                        <div>공연 이력 {detail.performanceCount}회 | 지원: {formatDate(detail.appliedAt)}</div>
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
                        <div>{detail.applicant.representative}</div>
                    </div>
                    <div>
                        <div>연락처</div>
                        <div>{detail.applicant.phone}</div>
                    </div>
                    <div>
                        <div>이메일</div>
                        <div>{detail.applicant.email}</div>
                    </div>
                </div>
            </div>

            <div className="applicantSection">
                <h3>포트폴리오</h3>
                <div className="applicantBox">{detail.portfolio}</div>
            </div>

            <div className="applicantSection">
                <h3>요청 사항</h3>
                <div className="applicantBox">
                    {detail.requestToHost}
                </div>
            </div>
        </div>
    )
}
