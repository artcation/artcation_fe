import { useState } from 'react'
import './ApplicationReviewPage.css'
import StatusIcon from '../../components/StatusIcon'
import Pagination from '../../components/Pagination'
import NoticePopup from '../../components/NoticePopup'
import ApplicantCard from './ApplicantCard'
import ApplicantDetail from './ApplicantDetail'
import icon_popup_sent from '../../assets/icon_popup_sent.png'
import icon_popup_saved from '../../assets/icon_popup_saved.png'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import axiosInstance from '../../../api/axiosInstance'


const FILTERS = [
    {value: null, label: '전체'},
    {value: 'CONFIRMED', label: '확정'},
    {value: 'SELECTED', label: '선정'},
    {value: 'ON_HOLD', label: '보류'},
    {value: 'REJECTED', label: '미선정'},
]

function formatDate(date) {
    return date.replaceAll('-','. ')
}

export default function ApplicationReviewPage() {

    const { id } = useParams();
    const [summary, setSummary] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState(null)
    const [popup, setPopup] = useState('')

    useEffect(() => {
        async function getSummary() {
            try {
                const response = await axiosInstance.get(`/host/recruitments/${id}/applications/summary`);
                setSummary(response.data.data);
            } catch (error) {
                console.log(error);
            }
        
        } getSummary();
    }, [id])

    useEffect(() => {
        async function getApplicants() {
            try {
                const response = await axiosInstance.get(`/host/recruitments/${id}/applications`, {
                    params: {
                        reviewStatus: filter ?? undefined,
                        page: currentPage,
                    }
                });
                setApplicants(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            } catch (error) {
                console.log(error);
            }
        }
        getApplicants();
    }, [id, filter, currentPage]);

    if(!summary) return null;

    return (
        <>
            <div>
                <div className="postingReviewHeader">
                    <StatusIcon text={summary.recruitmentStatus} />
                    <h1>{summary.recruitmentTitle}</h1>
                </div>
                <div className="reviewSummary">
                    <div className="postingSummaryCard">
                        <div>
                            <div>
                                <div>공연일자</div>
                                <div>{formatDate(summary.performanceDate)}</div>
                            </div>
                            <div>
                                <div>지원 마감일</div>
                                <div>{formatDate(summary.applicationDeadline)}</div>
                            </div>
                        </div>
                        <div>
                            <div className="summaryHighlight">
                                <div>목표 모집 팀</div>
                                <div>{summary.recruitTeamCount}</div>
                            </div>
                            <div className="summaryHighlight">
                                <div>확정</div>
                                <div>{summary.confirmed}</div>
                            </div>
                            <div>
                                <div>선정 완료</div>
                                <div>{summary.selected}</div>
                            </div>
                            <div>
                                <div>보류 / 미선정</div>
                                <div>{summary.notSelected}</div>
                            </div>
                            <div className="summaryTotal">
                                <div>전체</div>
                                <div>{summary.total}</div>
                            </div>
                        </div>
                    </div>
                    <p className="reviewSummaryNote">* 선정 후 3일 이내에 아티스트가 확정하지 않으면 자동 취소됩니다.</p>
                </div>
                <div className="reviewMain">
                    <h2>지원자 심사 및 결과 처리</h2>
                    <div className="reviewFilters">
                        {FILTERS.map((item) => (
                            <button
                                key={item.label}
                                className={filter == item.value ? 'filterActive' : ''}
                                onClick={() => {setFilter(item.value); setCurrentPage(1);}}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <div className="reviewBody">
                        <div className="applicantList">
                            {applicants.map((applicant) => (
                                <ApplicantCard key={applicant.applicationId} applicant={applicant} />
                            ))}
                            <Pagination onClick={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />
                        </div>

                        <div className="reviewDetailColumn">
                            <ApplicantDetail />
                            <div className="reviewActions">
                                <button className="reviewDraftBtn" onClick={() => setPopup('saved')}>임시 저장</button>
                                <button className="reviewSaveBtn" onClick={() => setPopup('sent')}>결과 저장하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <NoticePopup
                visibility={popup == 'saved'}
                image={icon_popup_saved}
                mainText={<p>임시 저장 완료</p>}
                subText="작성 중인 내용이 저장되었습니다."
                onLeftButtonClick={() => setPopup('')}
            />
            <NoticePopup
                visibility={popup == 'sent'}
                image={icon_popup_sent}
                mainText={<p><span>결과 전송</span> 완료!</p>}
                subText="지원자에게 결과 안내가 완료되었습니다."
                onLeftButtonClick={() => setPopup('')}
            />
        </>
    )
}