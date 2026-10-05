import './Pagination.css'

export default function Pagination({ onClick, currentPage, totalPages }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="pagination">
            <button>&lt;</button>
            {pages.map((page) => (
                <button onClick={() => onClick(page)} key={page} className={page == currentPage ? 'pageActive' : ''}>{page}</button>
            ))}
            <button>&gt;</button>
        </div>
    )
}
