import { useNavigate, useParams } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import StatusIcon from "../../components/StatusIcon";
import './MyApplicationPage.css'
import { useEffect, useState } from "react";
import PerformanceInfo from "../../components/PerformanceInfo";
import NoticePopup from "../../components/NoticePopup";
import character_cancel from "../../assets/character_cancel.png"
import ResultPage from './ResultPage';

export default function MyApplicationPage() {
    const [isEditing, setIsEditing] = useState(false);
    const { recruitmentId, applicationId } = useParams();
    const [applicationInfo, setApplicationInfo] = useState(null);
    const [recruitmentInfo, setRecruitmentInfo] = useState(null);
    const [applicationInputs, setApplicationInputs] = useState({});
    const navigate = useNavigate();
    const [popupIsVisible, setPopupIsVisible] = useState(false);

    async function handleApplicationGet() {
        try {
            const response = await axiosInstance.get(`/artist/applications/${applicationId}`)
            setApplicationInfo(response.data.data);
            setApplicationInputs({teamName: response.data.data.teamName, portfolio: response.data.data.portfolio, performancePlan: response.data.data.performancePlan, requestToHost: response.data.data.requestToHost});
        } catch (error) {
            console.log(error.response.data)
        }
    }

    async function handleRecruitmentGet() {
        try {
            const response = await axiosInstance.get(`/recruitments/${recruitmentId}/brief`);
            setRecruitmentInfo(response.data.data);
        } catch (error) {
            console.log(error.response.data)
        }
    }

    async function handleApplicationEdit() {
        try {
            const response = await axiosInstance.put(`/artist/applications/${applicationId}`, {
                teamName: applicationInputs.teamName,
                portfolio: applicationInputs.portfolio,
                performancePlan: applicationInputs.performancePlan,
                requestToHost: applicationInputs.requestToHost
            })
            setIsEditing(false);
            handleApplicationGet();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleApplicationCancel() {
        try {
            const response = await axiosInstance.post(`/artist/applications/${applicationId}/cancel`)
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleApplicationGet();
        handleRecruitmentGet();
    }, [])


    if (applicationInfo?.status == 'CONFIRMED' || applicationInfo?.status == 'SELECTED') {
        return (
            <ResultPage applicationId={applicationId} />
        )
    }

    return (
        <>
            <div className="applicationPage">
                <NoticePopup onLeftButtonClick={() => setPopupIsVisible(false)} onRightButtonClick={handleApplicationCancel} mainText={<p>지원을 <span>취소</span>하시겠어요?</p>} type={'cancel'} rightButtonText={'지원 취소'} subText={"취소한 지원서는 복구할 수 없습니다."} visibility={popupIsVisible} image={character_cancel}  />
                <div>
                    <StatusIcon text={applicationInfo?.status} />
                    <h1>{recruitmentInfo?.title}</h1>
                </div>
                <div>
                    <h2>지원기관 확인</h2>
                    <PerformanceInfo info={recruitmentInfo} />
                </div>
                <div className="applicationInputs">
                    <h2>지원 내용</h2>
                    <div>
                        <h3>팀명<span>*</span></h3>
                        {
                            isEditing ?
                            <input value={applicationInputs?.teamName} onChange={(e) => setApplicationInputs({...applicationInputs, teamName: e.target.value})} name="" id="portfolio" /> :
                            <div>
                                {applicationInfo?.teamName}
                            </div>
                        }
                    </div>
                    <div>
                        <h3>내 포트폴리오<span>*</span></h3>
                        {
                            isEditing ?
                            <textarea value={applicationInputs?.portfolio} onChange={(e) => setApplicationInputs({...applicationInputs, portfolio: e.target.value})} name="" id="portfolio" /> :
                            <div>
                                {applicationInfo?.portfolio}
                            </div>
                        }
                    </div>
                    <div>
                        <h3>공연 계획<span>*</span></h3>
                        {
                            isEditing ?
                            <textarea value={applicationInputs?.performancePlan} onChange={(e) => setApplicationInputs({...applicationInputs, performancePlan: e.target.value})} name="" id="performancePlan" /> :
                            <div>
                                {applicationInfo?.performancePlan}
                            </div>
                        }
                    </div>
                    <div>
                        <h3>요청 사항</h3>
                        {
                            isEditing ?
                            <input onChange={(e) => setApplicationInputs({...applicationInputs, requestToHost: e.target.value})} value={applicationInputs?.requestToHost} type="text" /> :
                            <div>
                                {applicationInfo?.requestToHost}
                            </div>
                        }
                    </div>
                </div>
                <div className="applicationButtons">
                    {
                        applicationInfo?.availableActions.includes('CANCEL') ? <button onClick={() => setPopupIsVisible(true)}>지원취소</button> : ''
                    }
                    
                    {
                        applicationInfo?.availableActions.includes('EDIT') ? (
                            isEditing ?
                            <button onClick={handleApplicationEdit} style={{ color: 'var(--primary-color)', backgroundColor: 'white' }}>수정완료</button> :
                            <button onClick={() => setIsEditing(true)}>수정하기</button>
                        ) : ''
                    }
                </div>
            </div>
        </>
    )
}