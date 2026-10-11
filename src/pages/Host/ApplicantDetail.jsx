import { useState, useEffect } from 'react'
import './ApplicantDetail.css'
import axiosInstance from '../../../api/axiosInstance'
import StatusIcon from '../../components/StatusIcon'

const REVIEW_RESULTS = [
    { value: 'SELECTED', label: '선정' },
    { value: 'ON_HOLD', label: '보류' },
    { value: 'REJECTED', label: '미선정' },
]

function formatDate(date) {
    return date.replaceAll('-', '. ')
}

export default function ApplicantDetail({recruitmentId, applicationId, changedStatus, onReviewChange, onViewed}) {
    const [detail, setDetail] = useState(null)

    useEffect(() => {
        async function getDetail() {
            try {
                const response = await axiosInstance.get(`/host/recruitments/${recruitmentId}/applications/${applicationId}`);
                setDetail(response.data.data);
                onViewed(applicationId);
            } catch(error) {
                console.log(error);
            }
        }
        getDetail();
    }, [recruitmentId, applicationId, onViewed])

    if (!detail) return null;

    const reviewStatus = changedStatus ?? detail.reviewStatus;

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
                {detail.reviewStatus === 'CONFIRMED'
                    ? <StatusIcon text='CONFIRMED' />
                    : (
                        <div className="reviewToggle">
                            {REVIEW_RESULTS.map((item) => (
                                <button key={item.value} className={reviewStatus == item.value ? 'toggleActive' : ''}
                                    onClick={() => onReviewChange(applicationId, item.value)}>
                                    {item.label}
                                </button>
                            ))}
                        </div>                        
                    )}
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
