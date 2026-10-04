import './ExplorePage.css'

export default function ExplorePage() {
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
                    <div>
                        <button>전체</button>
                        <button>날짜</button>
                        <select name="" id="">
                            <option value="" selected disabled >지역</option>
                            <option value="">대전</option>
                            <option value="">충북</option>
                            <option value="">충남</option>
                        </select>
                        <select name="" id="">
                            <option value="" selected disabled >장르</option>
                            <option value="">클래식</option>
                            <option value="">대중음악</option>
                            <option value="">재즈</option>
                            <option value="">국악</option>
                        </select>
                    </div>
                </div>
                <div className='exploreResults'>
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
                                <th scope="col"></th>
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
                                        <div>모집중</div>
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
                                <td>
                                    <button></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}