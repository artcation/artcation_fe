import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import './ApplicationsPage.css'
import StatusIcon from "../../components/StatusIcon";
import FilterButtons from "../../components/FilterButtons";
import axiosInstance from "../../../api/axiosInstance";
import { useNavigate } from "react-router";

export default function ApplicationsPage() {
    const [filters, setFilters] = useState({ filter: null, orderBy: 'RECENT' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [applications, setApplications] = useState(null);
    const [summary, setSummary] = useState({});
    const navigate = useNavigate();

    const REGIONS = {
        'DAEJEON': '대전',
        'CHUNGBUK': '충북',
        'CHUNGNAM': '충남'
    };

    async function handleGetApplications(pageNumber=1) {
        try {
            const response = await axiosInstance.get(
                '/artist/applications', {
                    params: {
                        page: pageNumber,
                        status: filters.filter ?? null,
                        sort: filters.orderBy,
                    },
                    paramsSerializer: { indexes: null }
                }
            )
            setApplications(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleApplicationSummary() {
        try {
            const response = await axiosInstance.get('/artist/applications/summary');
            setSummary(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleNextPage(pageNumber) {
        setCurrentPage(pageNumber);
        handleGetApplications(pageNumber);
    }

    useEffect(() => {
        handleGetApplications();
    }, [filters]);

    useEffect(() => {
        handleApplicationSummary();
    }, []);

    return (
        <>
            <div className="myApplicationsPage">
                <h1>내 지원 현황</h1>
                <ul>
                    <li>지원한 공연 공고 내역을 확인할 수 있습니다.</li>
                    <li>모집이 마감된 이후에는 지원서 수정·취소가 제한됩니다.</li>
                    <li>선정 시 3일 이내에 확정하지 않으면 자동 취소됩니다.</li>
                </ul>
                <FilterButtons data={summary} filters={filters} setFilters={setFilters} type={"artist"} />
                <div className="searchContainer">
                    <div className="selectContainer">
                        <select onChange={(e) => setFilters({...filters, orderBy: e.target.value})} value={filters.orderBy}>
                            <option value="RECENT">최근 지원 순</option>
                            <option value="PERFORMANCE_DATE">공연 일시 순</option>
                            <option value="DEADLINE">마감 임박 순</option>
                        </select>
                    </div>
                    <table className="applicationsTable">
                        <thead>
                            <tr>
                                <th scope="col">공고명</th>
                                <th scope="col">공연일시</th>
                                <th scope="col">지원일</th>
                                <th scope="col">마감일</th>
                                <th scope="col">지원 정보</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applications?.map((a) => (
                                    <tr key={a.applicationId}>
                                        <td>
                                            <div>
                                                <div>
                                                    <StatusIcon text={a.status} />
                                                </div>
                                                <div>
                                                    <div>{a.title}</div>
                                                    <div>{REGIONS[a.region]} · {a.hostName}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="tableDateTime">
                                                <div>{a.performanceDate}</div>
                                                <div>({a.startTime})</div>
                                            </div>
                                        </td>
                                        <td>
                                            {a.appliedAt}
                                        </td>
                                        <td>
                                            {a.applicationDeadline}
                                        </td>
                                        <td onClick={() => navigate(`/application/${a.recruitmentId}/${a.applicationId}`)} style={ a.status == 'CANCELED' ? {textDecoration: 'none'} : null }>
                                            {
                                                ['CONFIRMED', 'SELECTED', 'APPLIED'].includes(a.status) ? '지원서 확인' : (a.status == 'CANCELED' ? '-' : '공연 안내')
                                            }
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <Pagination onClick={handleNextPage} currentPage={currentPage} totalPages={totalPages}  />
                </div>
            </div>
        </>
    )
}