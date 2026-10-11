import { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import BottomButton from "../../components/bottomButton";
import './PostingPage.css';
import { useParams } from "react-router";

export default function PostingPage() {
    
    return (
        <>
            <div className="postingPage">
                <div>
                    <div>모집중</div>
                    <h1>00 요양원 가을 위로 공연</h1>
                </div>
                <div>
                    <div>
                        <h2>공연 정보</h2>
                        <div>등록일: 2026-09-18 13:40</div>
                    </div>
                    <div className="postingPerformanceInfo">
                        <div>
                            <div>공연일시</div>
                            <div>2026.10.22 (목) 14:00</div>
                        </div>
                        <div>
                            <div>모집 팀 수</div>
                            <div>2팀</div>
                        </div>
                        <div>
                            <div>주최</div>
                            <div>00요양원</div>
                        </div>
                        <div>
                            <div>러닝타임</div>
                            <div>40분</div>
                        </div>
                        <div>
                            <div>장르</div>
                            <div>클래식</div>
                        </div>
                        <div>
                            <div>마감일</div>
                            <div>2026-10-03</div>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>공연 내용</h2>
                    <div>
                        ○○요양원 입소 어르신을 위한 가을 위로 공연입니다. 친숙하고 편안하게 감상할 수 있는 클래식 곡을 중심으로 약 40분간 진행되며, 밝고 따뜻한 분위기의 프로그램을 희망합니다.
                    </div>
                </div>
                <div>
                    <h2>요청 사항</h2>
                    <div>
                        1. 어르신들이 익숙하게 들을 수 있는 곡 위주로 구성해 주세요.<br></br>2. 공연 시작 1시간 전까지 도착해 간단한 리허설을 진행해 주세요.
                    </div>
                </div>
                <div>
                    <h2>공연 환경</h2>
                    <div>
                        기본 스피커 제공 의자 3개 제공 보면대 2개 제공 추가 장비 필요 시 사전 협의
                    </div>
                </div>
                <div>
                    <h2>공연 장소</h2>
                    <div>
                        대전광역시 유성구 대학로 99 · ○○요양원 1층 강당
                    </div>
                </div>
            </div>
            <div className="bottomBar">
                <BottomButton text='지원하기 (D-6)' type='primary' />
            </div>
        </>
    )
}