import './Pagination.css'

export default function Pagination({ currentPage, totalPages }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="pagination">
            <button>&lt;</button>
            {pages.map((page) => (
                <button key={page} className={page == currentPage ? 'pageActive' : ''}>{page}</button>
            ))}
            <button>&gt;</button>
        </div>
    )
}
