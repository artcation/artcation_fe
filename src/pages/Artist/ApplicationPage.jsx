import axiosInstance from "../../../api/axiosInstance";
import BottomButton from "../../components/bottomButton";
import PerformanceInfo from "../../components/PerformanceInfo";
import './ApplicationPage.css';
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function ApplicationPage() {
    const [teamName, setTeamName] = useState('');
    const [portfolio, setPortfolio] = useState('');
    const [plan, setPlan] = useState('');
    const [request, setRequest] = useState('');
    const [info, setInfo] = useState({});
    const { recruitmentId } = useParams();

    async function handleInfoGet() {
        try {
            const response = await axiosInstance.get(
                `/recruitments/${recruitmentId}/brief`
            )
            setInfo(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handleInfoGet();
    }, [recruitmentId])

    async function handleApplicationSubmit() {
        try {
            const response = await axiosInstance.post(`/recruitments/${recruitmentId}/applications`, {
                teamName: teamName,
                portfolio: portfolio,
                performancePlan: plan,
                requestToHost: request
            })
            // 여기서 어떻게 할지 정하기
            console.log(response);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <>
            <div className="applicationPage">
                <h1>공연 지원서 작성</h1>
                <ul>
                    <li>공연에 제출할 포트폴리오와 지원 내용을 작성해 주세요.</li>
                    <li>작성한 정보를 확인한 후 지원을 완료해 주세요.</li>
                    <li>지원 전 공연 일정과 장소를 다시 한 번 확인해 주세요.</li>
                </ul>
                <div>
                    <h2>공연 정보</h2>
                    <PerformanceInfo info={info} />
                </div>
                <div className="applicationInputs">
                    <h2>지원 내용</h2>
                    <div>
                        <h3>팀명<span>*</span></h3>
                        <input value={teamName} onChange={(e) => setTeamName(e.target.value)} type="text" />
                    </div>
                    <div>
                        <h3>내 포트폴리오<span>*</span></h3>
                        <textarea value={portfolio} onChange={(e) => setPortfolio(e.target.value)} name="" id=""></textarea>
                    </div>
                    <div>
                        <h3>공연 계획<span>*</span></h3>
                        <textarea value={plan} onChange={(e) => setPlan(e.target.value)} name="" id=""></textarea>
                    </div>
                    <div>
                        <h3>요청 사항</h3>
                        <input value={request} onChange={(e) => setRequest(e.target.value)} type="text" placeholder="지원 기관에 전달할 메시지를 입력해 주세요." />
                    </div>
                </div>
            </div>
            <div className="bottomBar">
                <BottomButton onClick={handleApplicationSubmit} text='지원서 제출' type={teamName && plan && portfolio ? 'primary' : 'inactive'} />
            </div>
        </>
    )
}