import StatusIcon from '../../components/StatusIcon'
import icon_activedropdown from '../../assets/icon_activedropdown.png'
import './ExplorePage.css'
import { useState, useRef, useEffect } from 'react'
import axiosInstance from '../../../api/axiosInstance'
import Pagination from '../../components/Pagination'

export default function ExplorePage() {
    const [filters, setFilters] = useState({ regions: [], dateFrom: null, genres: [], orderBy: 'PERFORMANCE_DATE' });
    const [searchKeyword, setSearchKeyword] = useState('');
    const [open, setOpen] = useState('');
    const [performances, setPerformances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const menuRef = useRef(null);
    const dateRef = useRef(null);

    const GENRES = {
        'CLASSIC': '클래식',
        'POPULAR': '대중음악',
        'JAZZ': '재즈',
        'KOREAN_TRADITIONAL': '국악'
    }

    const REGION_MAP = {
        '대전': 'DAEJEON',
        '충북': 'CHUNGBUK',
        '충남': 'CHUNGNAM',
    };

    const GENRE_MAP = {
        '클래식': 'CLASSIC',
        '대중음악': 'POPULAR',
        '재즈': 'JAZZ',
        '국악': 'KOREAN_TRADITIONAL',
    };

    function handleResetFilters() {
        setFilters({ regions: [], dateFrom: null, genres: [] });
    }

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

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(null);
            }
        }
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    useEffect(() => {
        handleGetPerformances();
    }, [filters]);

    return (
        <>
            <div className='explorePage'>
                <h1>공연 공고</h1>
                <div className='searchContainer'>
                    <div>
                        <label htmlFor="searchKeyword">검색어</label>
                        <input onChange={(e) => setSearchKeyword(e.target.value)} id="searchKeyword" type="text" placeholder='공연명 또는 기관명을 검색해보세요' />
                        <button onClick={() => handleGetPerformances()}>검색</button>
                    </div>
                    <div ref={menuRef}>
                        <button onClick={handleResetFilters} className={'allButton ' + (filters.regions.length > 0 || filters.dateFrom || filters.genres.length > 0 ? '' : 'showAll')} >전체</button>
                        <div className='dateContainer'>
                            <button style={{backgroundImage: open == 'dateFrom' ? `url(${icon_activedropdown})` : ''}} className={'optionButton ' + (open == 'dateFrom' ? 'showAll' : '')}>날짜</button>
                            <input ref={dateRef} onClick={() => {dateRef.current.showPicker(); setOpen('dateFrom')}} onChange={(e) => {setFilters({...filters, dateFrom: e.target.value}); setOpen(null)}} type="date" min={new Date().toLocaleDateString('sv-SE')} />
                        </div>
                        <div className='optionContainer'>
                            <button onClick={() => setOpen('region')} style={{backgroundImage: open == 'region' ? `url(${icon_activedropdown})` : ''}} className={'optionButton ' + (open == 'region' ? 'showAll' : '')}>지역</button>
                            <div style={{display: open == 'region' ? 'block' : 'none'}} className='optionList'>
                                {['대전', '충북', '충남'].map((r) => (
                                    <div onClick={() => {setFilters({...filters, regions: filters.regions.includes(r) ? filters.regions : [...filters.regions, r]}); setOpen(null)}} key={r}>
                                        {r}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='optionContainer'>
                            <button onClick={() => setOpen('genre')} style={{backgroundImage: open == 'genre' ? `url(${icon_activedropdown})` : ''}} className={'optionButton ' + (open == 'genre' ? 'showAll' : '')}>장르</button>
                            <div style={{display: open == 'genre' ? 'block' : 'none'}} className='optionList'>
                                {['클래식', '대중음악', '재즈', '국악'].map((g) => (
                                    <div onClick={() => {setFilters({...filters, genres: filters.genres.includes(g) ? filters.genres : [...filters.genres, g]}); setOpen(null)}} key={g}>
                                        {g}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: filters.regions && filters.dateFrom && filters.genres ? 'flex' : ''}} className='filters'>
                        {
                            <div style={{ display: filters.dateFrom ? 'block' : 'none' }}>{Number(filters.dateFrom?.split('-')[1])}월 {Number(filters.dateFrom?.split('-')[2])}일 이후 <button onClick={() => setFilters({...filters, dateFrom: null})}></button></div>
                        }
                        {
                            filters.regions.map((r) => (
                                <div key={filters.regions.indexOf(r)}>{r} <button onClick={() => setFilters({...filters, regions: filters.regions.filter((x) => x != r)})}></button></div>
                            ))
                        }
                        {
                            filters.genres.map((g) => (
                                <div key={filters.genres.indexOf(g)}>{g} <button onClick={() => setFilters({...filters, genres: filters.genres.filter((x) => x != g)})}></button></div>
                            ))
                        }
                    </div>
                    <div>
                        <select onChange={(e) => setFilters({...filters, orderBy: e.target.value})} value={filters.orderBy}>
                            <option value="PERFORMANCE_DATE">공연 일시 순</option>
                            <option value="DEADLINE">마감 임박 순</option>
                        </select>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">공연일시</th>
                                <th scope="col">공고명</th>
                                <th scope="col">장르</th>
                                <th scope="col">러닝타임</th>
                                <th scope="col">마감</th>
                                <th scope="col">지원현황</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                performances?.map((p) => (
                                    <tr key={p.performanceId}>
                                        <td className='resultDateTime'>
                                            <div>{p.performanceDate.split('-')[1]}월 {p.performanceDate.split('-')[2]}일</div>
                                            <div>{p.startTime}</div>
                                        </td>
                                        <td>
                                            <div className='resultStatus'>
                                                <StatusIcon text={p.status} />
                                                <div>{p.title}</div>
                                                <div>{p.address} · {p.hostName}</div>
                                            </div>
                                        </td>
                                        <td>{GENRES[p.genre]}</td>
                                        <td>{p.runningTime}분</td>
                                        <td className='resultDueDate'>
                                            <div>{p.daysUntilDeadline > 0 ? 'D-' + p.daysUntilDeadline : (p.daysUntilDeadline == 0 ? 'D-DAY' : '모집 마감') }</div>
                                            <div>마감일: {p.applicationDeadline}</div>
                                        </td>
                                        <td className='resultInformation'>
                                            <div>모집 {p.recruitTeamCount}팀</div>
                                            <div>지원 {p.applicantCount}팀</div>
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