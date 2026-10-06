import BottomButton from "../../components/bottomButton";
import StatusIcon from "../../components/StatusIcon";
import './ResultPage.css'

export default function ResultPage() {
    return (
        <>
            <div className="applicationPage resultPage">
                <div>
                    <StatusIcon text={"SELECTED"} />
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
                    <div className="postingPerformanceInfo">
                        <div>
                            공연일시
                        </div>
                        <div>
                            장소명
                        </div>
                        <div>
                            러닝타임
                        </div>
                        <div>
                            장르
                        </div>
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
                <BottomButton text={"참여 확정하기 (D-2)"} type="primary" />
                <BottomButton text="참여 취소" type={"cancel"} />
            </div>
        </>
    )
}