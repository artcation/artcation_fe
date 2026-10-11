import { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import BottomButton from "../../components/bottomButton";
import './PostingPage.css';
import { useNavigate, useParams } from "react-router";
import StatusIcon from "../../components/StatusIcon";

export default function PostingPage() {
    const [ postingInfo, setPostingInfo ] = useState('');
    const { recruitmentId } = useParams();
    const navigate = useNavigate();

    const GENRES = {
        'CLASSIC': '클래식',
        'POPULAR': '대중음악',
        'JAZZ': '재즈',
        'KOREAN_TRADITIONAL': '국악'
    }

    async function handlePostingInfo() {
        try {
            const response = await axiosInstance.get(
                `/recruitments/${recruitmentId}`
            )
            setPostingInfo(response.data.data);
            console.log(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        handlePostingInfo();
    }, [])

    return (
        <>
            <div className="postingPage">
                <div>
                    <StatusIcon text={postingInfo?.status} />
                    <h1>{postingInfo.title}</h1>
                </div>
                <div>
                    <div>
                        <h2>공연 정보</h2>
                        <div>등록일: {postingInfo.performance?.createdAt}</div>
                    </div>
                    <div className="postingPerformanceInfo">
                        <div>
                            <div>공연일시</div>
                            <div>{postingInfo.performance?.performanceDate} ({new Date(postingInfo.performance?.performanceDate).toLocaleDateString('ko-KR', { weekday: 'short' })}) {postingInfo.performance?.performanceTime}</div>
                        </div>
                        <div>
                            <div>모집 팀 수</div>
                            <div>{postingInfo.performance?.recruitTeamCount}팀</div>
                        </div>
                        <div>
                            <div>주최</div>
                            <div>{postingInfo.performance?.hostName}</div>
                        </div>
                        <div>
                            <div>러닝타임</div>
                            <div>{postingInfo.performance?.runningTime}분</div>
                        </div>
                        <div>
                            <div>장르</div>
                            <div>{GENRES[postingInfo.performance?.genre]}</div>
                        </div>
                        <div>
                            <div>마감일</div>
                            <div>{postingInfo.performance?.applicationDeadline}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>공연 내용</h2>
                    <div>
                        {postingInfo.description}
                    </div>
                </div>
                <div>
                    <h2>요청 사항</h2>
                    <div>
                        {postingInfo.requestToArtist}
                    </div>
                </div>
                <div>
                    <h2>공연 장소</h2>
                    <div>
                        {postingInfo.address} · {postingInfo.placeName}
                    </div>
                </div>
            </div>
            <div className="bottomBar">
                <BottomButton onClick={() => navigate(`/apply/${recruitmentId}`)} text={postingInfo?.availableActions?.includes('APPLY') ? `지원하기 (D-${postingInfo?.daysUntilDeadline == 0 ? 'DAY' : postingInfo?.daysUntilDeadline})` : (postingInfo?.availableActions?.includes('APPLIED') ? '지원 완료' : '모집 마감')} type={postingInfo?.availableActions?.includes('APPLY') ? 'primary' : 'inactive'} />
            </div>
        </>
    )
}