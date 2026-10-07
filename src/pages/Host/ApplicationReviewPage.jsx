import { useState } from 'react'
import './ApplicationReviewPage.css'
import { MOCK_POSTING_DETAIL } from './mockData'
import StatusIcon from '../../components/StatusIcon'
import Pagination from '../../components/Pagination'
import NoticePopup from '../../components/NoticePopup'
import ApplicantCard from './ApplicantCard'
import ApplicantDetail from './ApplicantDetail'
import icon_popup_sent from '../../assets/icon_popup_sent.png'
import icon_popup_saved from '../../assets/icon_popup_saved.png'

const FILTERS = ['전체', '확정', '선정', '보류', '미선정']

export default function ApplicationReviewPage() {
    
    const [filter, setFilter] = useState('전체')
    const [popup, setPopup] = useState('')

    return (
        <>
            <div>
                <div className="postingReviewHeader">
                    <StatusIcon text={MOCK_POSTING_DETAIL.status} />
                    <h1>{MOCK_POSTING_DETAIL.title}</h1>
                </div>
                <div className="reviewSummary">
                    <div className="postingSummaryCard">
                        <div>
                            <div>
                                <div>공연일자</div>
                                <div>2026. 10. 22</div>
                            </div>
                            <div>
                                <div>지원 마감일</div>
                                <div>2026. 10. 15</div>
                            </div>
                        </div>
                        <div>
                            <div className="summaryHighlight">
                                <div>목표 모집 팀</div>
                                <div>2</div>
                            </div>
                            <div className="summaryHighlight">
                                <div>확정</div>
                                <div>1</div>
                            </div>
                            <div>
                                <div>선정 완료</div>
                                <div>2</div>
                            </div>
                            <div>
                                <div>보류 / 미선정</div>
                                <div>12</div>
                            </div>
                            <div className="summaryTotal">
                                <div>전체</div>
                                <div>13</div>
                            </div>
                        </div>
                    </div>
                    <p className="reviewSummaryNote">* 선정 후 3일 이내에 아티스트가 확정하지 않으면 자동 취소됩니다.</p>
                </div>
                <div className="reviewMain">
                    <h2>지원자 심사 및 결과 처리</h2>
                    <div className="reviewFilters">
                        {FILTERS.map((name) => (
                            <button
                                key={name}
                                className={filter == name ? 'filterActive' : ''}
                                onClick={() => setFilter(name)}
                            >
                                {name}
                            </button>
                        ))}
                    </div>
                    <div className="reviewBody">
                        <div className="applicantList">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                                <ApplicantCard key={item} />
                            ))}
                            <Pagination onClick={() => {}} currentPage={1} totalPages={2} />
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
                mainText="임시 저장 완료"
                subText="작성 중인 내용이 저장되었습니다."
                onButtonClick={() => setPopup('')}
            />
            <NoticePopup
                visibility={popup == 'sent'}
                image={icon_popup_sent}
                mainText={<><span>결과 전송</span> 완료!</>}
                subText="지원자에게 결과 안내가 완료되었습니다."
                onButtonClick={() => setPopup('')}
            />
        </>
    )
}