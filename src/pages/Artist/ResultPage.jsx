import BottomButton from "../../components/bottomButton";
import StatusIcon from "../../components/StatusIcon";

export default function ResultPage() {
    return (
        <>
            <div>
                <div>
                    <StatusIcon />
                    <h1>00 요양원 가을 위로 공연</h1>
                </div>
                <div>
                    <div>선정일 : 2026 - 10 - 18</div>
                    <div>
                        <div>00요양원 가을 위로 공연</div>
                        <div>선정을 축하드립니다!</div>
                    </div>
                    <div>*선정 후 3일 이내에 확정하지 않으면 자동 취소됩니다.</div>
                </div>
                <div>
                    <h2>공연 정보</h2>
                    <div>

                    </div>
                </div>
                <div>
                    <h2>진행 안내</h2>
                    <div>

                    </div>
                </div>
                <div>
                    <h2>정산 안내</h2>
                    <div>
                        
                    </div>
                </div>
            </div>
            <div className="bottomBar">
                <BottomButton />
                <BottomButton />
            </div>
        </>
    )
}