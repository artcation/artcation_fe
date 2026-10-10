export default function PerformanceInfo({ info }) {
    const GENRES = {
        'CLASSIC': '클래식',
        'POPULAR': '대중음악',
        'JAZZ': '재즈',
        'KOREAN_TRADITIONAL': '국악'
    }

    return (
        <div className="postingPerformanceInfo">
            <div>
                <div>공연일시</div>
                <div>{info?.performanceDate} ({new Date(info?.performanceDate).toLocaleDateString('ko-KR', { weekday: 'short' })}) {info?.startTime}</div>
            </div>
            <div>
                <div>장소명</div>
                <div>{info?.placeName}</div>
            </div>
            <div>
                <div>러닝타임</div>
                <div>{info?.runningTime}분</div>
            </div>
            <div>
                <div>장르</div>
                <div>{GENRES[info?.genre]}</div>
            </div>
        </div>
    )

}