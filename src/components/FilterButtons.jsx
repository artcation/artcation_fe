import './FilterButtons.css'

export default function FilterButtons({filters, setFilters, type, data}) {
    console.log(filters);
    return (
        <div className="filterButtons">
            <button className={!filters.filter ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: null})}>
                <div>전체</div>
                <div>{data.total}</div>
            </button>
            <button className={filters.filter == 'CONFIRMED' ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: 'CONFIRMED'})}>
                <div>확정</div>
                <div>{data.confirmed}</div>
            </button>
            <button className={filters.filter == (type == 'artist' ? 'SELECTED' : 'RECRUITING') ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: type == 'artist' ? 'SELECTED' : 'RECRUITING'})}>
                <div>{type == 'artist' ? '선정' : '모집중'}</div>
                <div>{type == 'artist' ? data.selected : data.recruiting}</div>
            </button>
            <button className={filters.filter == (type == 'artist' ? 'APPLIED' : 'IN_REVIEW') ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: type == 'artist' ? 'APPLIED' : 'IN_REVIEW'})}>
                <div>{type == 'artist' ? '지원 완료' : '검토중'}</div>
                <div>{type == 'artist' ? data.applied : data.reviewing}</div>
            </button>
            <button className={filters.filter == 'REJECTED_OR_CANCELED' | filters.filter == 'CANCELED' ? 'selectedFilter' : ''} onClick={() => type == 'artist' ? setFilters({...filters, filter: 'REJECTED_OR_CANCELED'}) : setFilters({...filters, filter: 'CANCELED'})}>
                <div>{type == 'artist' ? '미선정·취소' : '취소'}</div>
                <div>{type == 'artist' ? data.rejectedOrCanceled : data.canceled}</div>
            </button>
        </div>
    )
}