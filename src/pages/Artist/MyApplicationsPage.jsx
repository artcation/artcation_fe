import { useState } from "react";
import Pagination from "../../components/Pagination";
import './MyApplicationsPage.css'
import StatusIcon from "../../components/StatusIcon";
import FilterButtons from "../../components/FilterButtons";

export default function MyApplicationsPage() {
    const [filters, setFilters] = useState({ filter: null, orderBy: 'PERFORMANCE_DATE' });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    async function handleGetPerformances(pageNumber=1) {
        try {
            const response = await axiosInstance.get(
                '/performances', {
                    params: {
                        page: pageNumber,
                        date: filters.dateFrom ?? null,
                        keyword: searchKeyword ?? null,
                        sort: filters.orderBy,
                        regions: filters.regions?.map((r) => REGION_MAP[r]),
                        genres: filters.genres?.map((g) => GENRE_MAP[g]),
                    },
                    paramsSerializer: { indexes: null }
                }
            )
            setPerformances(response.data.data.content);
            setTotalPages(response.data.data.totalPages)
            console.log(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function handleNextPage(pageNumber) {
        setCurrentPage(pageNumber);
        handleGetPerformances(pageNumber);
    }

    return (
        <>
            <div className="myApplicationsPage">
                <h1>내 지원 현황</h1>
                <ul>
                    <li>지원한 공연 공고 내역을 확인할 수 있습니다.</li>
                    <li>모집이 마감된 이후에는 지원서 수정·취소가 제한됩니다.</li>
                    <li>선정 시 3일 이내에 확정하지 않으면 자동 취소됩니다.</li>
                </ul>
                <FilterButtons filters={filters} setFilters={setFilters} type={"artist"} />
                <div className="searchContainer">
                    <div className="selectContainer">
                        <select onChange={(e) => setFilters({...filters, orderBy: e.target.value})} value={filters.orderBy}>
                            <option>최근 지원 순</option>
                            <option value="PERFORMANCE_DATE">공연 일시 순</option>
                            <option value="DEADLINE">마감 임박 순</option>
                        </select>
                    </div>
                    <table>
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
                            <tr>
                                <td>
                                    <div>
                                        <div>
                                            <StatusIcon text={'CONFIRMED'} />
                                        </div>
                                        <div>
                                            <div>공연명</div>
                                            <div>대전 유성구 · 00 요양원</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    2026. 10. 22 (14:00)
                                </td>
                                <td>
                                    2026. 10. 01
                                </td>
                                <td>
                                    2026. 10. 15
                                </td>
                                <td>
                                    공연 안내
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Pagination onClick={handleNextPage} currentPage={currentPage} totalPages={totalPages}  />
                </div>
            </div>
        </>
    )
}