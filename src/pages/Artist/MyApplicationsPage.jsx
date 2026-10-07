export default function MyApplicationsPage() {
    return (
        <>
            <div>
                <h1>내 지원 현황</h1>
                <ul>
                    <li>지원한 공연 공고 내역을 확인할 수 있습니다.</li>
                    <li>모집이 마감된 이후에는 지원서 수정·취소가 제한됩니다.</li>
                    <li>선정 시 3일 이내에 확정하지 않으면 자동 취소됩니다.</li>
                </ul>
                <div>
                    <button>전체</button>
                    <button>확정</button>
                    <button>선정</button>
                    <button>지원 완료</button>
                    <button>미선정·취소</button>
                </div>
                <div>
                    
                </div>
            </div>
        </>
    )
}