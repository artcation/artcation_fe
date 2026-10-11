import BottomButton from "../../components/bottomButton";
import StatusIcon from "../../components/StatusIcon";
import './ResultPage.css'
import character_selected from '../../assets/character_selected.png'
import character_confirmed from '../../assets/character_confirmed.png'
import PerformanceInfo from "../../components/PerformanceInfo";
import axiosInstance from "../../../api/axiosInstance";
import { useEffect, useState } from "react";

export default function ResultPage({applicationId}) {
    const [participateInfo, setParticipateInfo] = useState({});

    async function handleParticipateInfo() {
        try {
            const response = await axiosInstance.get(`/artist/applications/${applicationId}/participation`);
            setParticipateInfo(response.data.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    async function handleConfirm() {
        try {
            const response = await axiosInstance.post(`/artist/applications/${applicationId}/participation/confirm`);
            handleParticipateInfo();
        } catch (error) {
            console.log(error)
        }
    }

    async function handleCancel() {
        try {
            const response = await axiosInstance.post(`/artist/applications/${applicationId}/participation/cancel`);
            handleApplicationGet();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleParticipateInfo();
    }, []);

    return (
        <>
            <div className="postingPage applicationPage resultPage">
                <div>
                    <StatusIcon text={participateInfo?.status} />
                    <h1>{participateInfo?.performance?.title}</h1>
                </div>
                <div className="congratsContainer">
                    <div>{participateInfo.status == 'SELECTED' ? '선정일' : '확정일'} : {participateInfo.status == 'SELECTED' ? participateInfo.selectedAt : participateInfo.confirmedAt}</div>
                    <div>
                        <img src={participateInfo.status == 'SELECTED' ? character_selected : character_confirmed } alt="" />
                        <div>{participateInfo?.performance?.title}</div>
                        <div>{participateInfo.status == 'SELECTED' ? '선정을 축하드립니다!' : '참여 확정 완료!' }</div>
                    </div>
                    <div>{participateInfo.status == 'SELECTED' ? '*선정 후 3일 이내에 확정하지 않으면 자동 취소됩니다.' : ''}</div>
                </div>
                <div>
                    <h2>공연 정보</h2>
                    <PerformanceInfo info={participateInfo.performance} />
                </div>
                <div>
                    <h2>진행 안내</h2>
                    <div className="postingPerformanceInfo">
                        <div>
                            <div>주최</div>
                            <div>{participateInfo.progressGuide?.hostName}</div>
                        </div>
                        <div>
                            <div>연락처</div>
                            <div>{participateInfo.progressGuide?.phone}</div>
                        </div>
                        <div>
                            <div>주소</div>
                            <div>{participateInfo.progressGuide?.address}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>정산 안내</h2>
                    <div>
                        {participateInfo.settlementGuide}
                    </div>
                </div>
            </div>
            <div className="bottomBar">
                <BottomButton onClick={handleConfirm} text={participateInfo.status == 'SELECTED' ? `참여 확정하기 (D-${participateInfo.daysUntilConfirm})` : '참여 확정 완료'} type={participateInfo.status == 'SELECTED' ? 'primary' : 'inactive'} />
                <BottomButton onClick={handleCancel} text="참여 취소" type={participateInfo.status == 'SELECTED' ? "cancel" : 'inactive'} />
            </div>
        </>
    )
}