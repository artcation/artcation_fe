import { useParams } from "react-router";
import axiosInstance from "../../../api/axiosInstance";
import StatusIcon from "../../components/StatusIcon";
import './MyApplicationPage.css'
import { useEffect, useState } from "react";

export default function MyApplicationPage() {
    const [isEditing, setIsEditing] = useState(false);
    const { applicationId } = useParams();

    async function handleApplicationGet() {
        try {
            const response = await axiosInstance.get(`/artist/applications/${applicationId}`)
            console.log(response);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleApplicationGet();
    }, [])

    return (
        <>
            <div className="applicationPage">
                <div>
                    <StatusIcon text={'APPLIED'} />
                    <h1>00 요양원 가을 위로 공연</h1>
                </div>
                <div>
                    <h2>지원기관 확인</h2>
                    <div className="postingPerformanceInfo">
                        <div>
                            <div>공연일시</div>
                            <div>2026.10.22 (목) 14:00</div>
                        </div>
                        <div>
                            <div>장소명</div>
                            <div>00요양원 1층 강당</div>
                        </div>
                        <div>
                            <div>러닝타임</div>
                            <div>40분</div>
                        </div>
                        <div>
                            <div>장르</div>
                            <div>클래식</div>
                        </div>
                    </div>
                </div>
                <div className="applicationInputs">
                    <h2>지원 내용</h2>
                    <div>
                        <h3>내 포트폴리오<span>*</span></h3>
                        {
                            isEditing ?
                            <input type="text" /> :
                            <div>
                                포트폴리오
                            </div>
                        }
                    </div>
                    <div>
                        <h3>공연 계획<span>*</span></h3>
                        {
                            isEditing ?
                            <input type="text" /> :
                            <div>
                                계획
                            </div>
                        }
                    </div>
                    <div>
                        <h3>요청 사항</h3>
                        {
                            isEditing ?
                            <input type="text" /> :
                            <div>
                                요청
                            </div>
                        }
                    </div>
                </div>
                <div className="applicationButtons">
                    <button>지원취소</button>
                    {
                        isEditing ?
                        <button onClick={() => setIsEditing(false)} style={{ color: 'var(--primary-color)', backgroundColor: 'white' }}>수정완료</button> :
                        <button onClick={() => setIsEditing(true)}>수정하기</button>
                    }
                </div>
            </div>
        </>
    )
}