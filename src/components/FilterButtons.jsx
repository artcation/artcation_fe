import './FilterButtons.css'

export default function FilterButtons({filters, setFilters, type}) {
    console.log(filters);
    return (
        <div className="filterButtons">
            <button className={!filters.filter ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: null})}>
                <div>전체</div>
                <div>2</div>
            </button>
            <button className={filters.filter == 'CONFIRMED' ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: 'CONFIRMED'})}>
                <div>확정</div>
                <div>8</div>
            </button>
            <button className={filters.filter == 'SELECTED' ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: 'SELECTED'})}>
                <div>선정</div>
                <div>3</div>
            </button>
            <button className={filters.filter == 'APPLIED' ? 'selectedFilter' : ''} onClick={() => setFilters({...filters, filter: 'APPLIED'})}>
                <div>지원 완료</div>
                <div>4</div>
            </button>
            <button className={filters.filter == 'REJECTED_OR_CANCELED' | filters.filter == 'CANCELED' ? 'selectedFilter' : ''} onClick={() => type == 'artist' ? setFilters({...filters, filter: 'REJECTED_OR_CANCELED'}) : setFilters({...filters, filter: 'CANCELED'})}>
                <div>미선정·취소</div>
                <div>1</div>
            </button>
        </div>
    )
}