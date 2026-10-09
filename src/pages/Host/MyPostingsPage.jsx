import { Link } from 'react-router'
import StatusIcon from '../../components/StatusIcon'
import { HOST_POSTING_CREATE, hostPostingDetailPath } from '../../routes'
import Pagination from '../../components/Pagination'
import { MOCK_MY_POSTINGS } from './mockData'
import './MyPostingsPage.css'

const { summary, performances, currentPage, totalPages } = MOCK_MY_POSTINGS

const SUMMARY_CARDS = [
    { label: '전체', count: summary.total },
    { label: '확정', count: summary.confirmed },
    { label: '모집중', count: summary.recruiting },
    { label: '검토중', count: summary.reviewing },
    { label: '취소', count: summary.canceled },
]

function formatDate(date) {
    return date.replaceAll('-', '. ')
}

export default function MyPostingsPage() {
    return (
        <>
            <div className="myPostings">
                <div className="myPostingsHeader">
                    <h1>내 공고 관리</h1>
                    <Link to={HOST_POSTING_CREATE}>새 공고 등록하기</Link>
                </div>

                <ul>
                    <li>등록한 공연 공고의 모집 현황과 진행 상태를 확인할 수 있습니다.</li>
                    <li>지원자가 있는 공고는 지원자 검토가 시작된 이후 수정·삭제가 제한될 수 있습니다.</li>
                </ul>

                <div className="myPostingsSummary">
                    {SUMMARY_CARDS.map((item) => (
                        <div key={item.label} className={item.label == '전체' ? 'summaryCard summaryCardActive' : 'summaryCard'}>
                            <div>{item.label}</div>
                            <div>{item.count}</div>
                        </div>
                    ))}
                </div>

                <div className="myPostingsList">
                    <div>
                        <select>
                            <option>최신 지원 순</option>
                            <option>공연 일시 순</option>
                            <option>마감 임박 순</option>
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">공연명</th>
                                <th scope="col">공연 일시</th>
                                <th scope="col">마감일</th>
                                <th scope="col" colSpan={3}>지원 정보</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performances.map((posting) => (
                                <tr key={posting.performanceId}>
                                    <td>
                                        <div className="postingName">
                                            <StatusIcon text={posting.status} />
                                            <div>
                                                <Link to={hostPostingDetailPath(posting.performanceId)} title={posting.title}>{posting.title}</Link>
                                            </div>
                                            <div>등록일: {formatDate(posting.createdAt)}</div>
                                        </div>
                                    </td>
                                    <td>{formatDate(posting.performanceDate)}</td>
                                    <td>{formatDate(posting.applicationDeadline)}</td>
                                    <td className="postingApplicantTotal">
                                        <div>{posting.applicantCount ?? '-'}</div>
                                        <div>전체 지원자</div>
                                    </td>
                                    <td className="postingApplicantCount">
                                        <div>{posting.viewedCount ?? '-'}</div>
                                        <div>열람</div>
                                    </td>
                                    <td className="postingApplicantCount">
                                        <div>{posting.unviewedCount ?? '-'}</div>
                                        <div>미열람</div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Pagination onClick={() => {}} currentPage={currentPage} totalPages={totalPages} />
                </div>
            </div>
        </>
    )
}
