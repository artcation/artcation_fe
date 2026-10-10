import { Link } from 'react-router'
import StatusIcon from '../../components/StatusIcon'
import { HOST_POSTING_CREATE, hostPostingDetailPath, hostApplicationReviewPath } from '../../routes'
import Pagination from '../../components/Pagination'
import './MyPostingsPage.css'
import { useEffect, useState } from 'react'
import axiosInstance from '../../../api/axiosInstance'

const SORT_OPTIONS = [
    {value: 'RECENT', label: '최신 지원 순'},
    {value: 'PERFORMANCE_DATE', label: '공연 일시 순'},
    {value: 'DEADLINE', label: '마감 임박 순'},
]

function formatDate(date) {
    return date.replaceAll('-', '. ')
}

export default function MyPostingsPage() {

    const [summary, setSummary] = useState({total: 0, confirmed: 0, recruiting: 0, reviewing: 0, canceled: 0});
    const [postings, setPostings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState('RECENT');

    useEffect(() => {
        async function getSummary() {
            try{
                const response = await axiosInstance.get('/host/recruitments/summary');
                setSummary(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getSummary();
    }, [])

    useEffect(() => {
        async function getPostings() {
            try {
                const response = await axiosInstance.get('/host/recruitments', {
                    params:{
                        sort: sort,
                        page: currentPage, 
                    },
                })
                setPostings(response.data.data.content);
                setTotalPages(response.data.data.totalPages);
            } catch (error) {
                console.log(error)
            }
        }
        getPostings();
    }, [sort, currentPage])

    function handleSortChange(e) {
        setSort(e.target.value);
        setCurrentPage(1);
    }

    const summaryCards = [
        { label: '전체', count: summary.total },
        { label: '확정', count: summary.confirmed },
        { label: '모집중', count: summary.recruiting },
        { label: '검토중', count: summary.reviewing },
        { label: '취소', count: summary.canceled },
    ]

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
                    {summaryCards.map((item) => (
                        <div key={item.label} className={item.label == '전체' ? 'summaryCard summaryCardActive' : 'summaryCard'}>
                            <div>{item.label}</div>
                            <div>{item.count}</div>
                        </div>
                    ))}
                </div>

                <div className="myPostingsList">
                    <div>
                            <select value={sort} onChange={handleSortChange}>
                                {SORT_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
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
                            {postings.map((posting) => (
                                <tr key={posting.recruitmentId}>
                                    <td>
                                        <div className="postingName">
                                            <StatusIcon text={posting.status} />
                                            <div>
                                                <Link to={hostPostingDetailPath(posting.recruitmentId)} title={posting.title}>{posting.title}</Link>
                                            </div>
                                            <div>등록일: {formatDate(posting.createdAt)}</div>
                                        </div>
                                    </td>
                                    <td>{formatDate(posting.performanceDate)}</td>
                                    <td>{formatDate(posting.applicationDeadline)}</td>
                                    <td className="postingApplicantTotal">
                                        <div>
                                            {posting.availableActions?.includes('REVIEW_APPLICATIONS')
                                                ? <Link to={hostApplicationReviewPath(posting.recruitmentId)}>{posting.applicantCount}</Link>
                                                : (posting.applicantCount ?? '-')}
                                        </div>
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

                    <Pagination onClick={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />

                </div>
            </div>
        </>
    )
}
