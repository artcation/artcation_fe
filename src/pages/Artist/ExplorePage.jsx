import StatusIcon from '../../components/StatusIcon'
import icon_activedropdown from '../../assets/icon_activedropdown.png'
import './ExplorePage.css'
import { useState, useRef, useEffect } from 'react'

export default function ExplorePage() {
    const [filters, setFilters] = useState({ regions: [], dateFrom: null, genres: [] });
    const [open, setOpen] = useState(null);
    const menuRef = useRef(null);
    const dateRef = useRef(null);

    function handleResetFilters() {
        setFilters({ regions: [], dateFrom: null, genres: [] });
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

    return (
        <>
            <div className='explorePage'>
                <h1>공연 공고</h1>
                <div className='searchContainer'>
                    <div>
                        <label htmlFor="searchKeyword">검색어</label>
                        <input id="searchKeyword" type="text" placeholder='공연명 또는 기관명을 검색해보세요' />
                        <button>검색</button>
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
                            <div style={{ display: filters.dateFrom ? 'block' : 'none' }}>{Number(filters.dateFrom.split('-')[1])}월 {Number(filters.dateFrom.split('-')[2])}일 이후 <button onClick={() => setFilters({...filters, dateFrom: null})}></button></div>
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
                        <select>
                            <option value="">공연 일시 순</option>
                            <option value="">마감 임박 순</option>
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
                            <tr>
                                <td className='resultDateTime'>
                                    <div>10월 7일</div>
                                    <div>14:00</div>
                                </td>
                                <td>
                                    <div className='resultStatus'>
                                        <StatusIcon text='모집중' />
                                        <div>00 요양원 가을 위로 공연</div>
                                        <div>대전 유성구 · 00 요양원</div>
                                    </div>
                                </td>
                                <td>클래식</td>
                                <td>40분</td>
                                <td className='resultDueDate'>
                                    <div>D-6</div>
                                    <div>마감일: 2026. 10. 3</div>
                                </td>
                                <td className='resultInformation'>
                                    <div>모집 2팀</div>
                                    <div>지원 7팀</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}