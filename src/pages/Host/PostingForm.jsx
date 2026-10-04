import './PostingForm.css'

export default function PostingForm() {
    return (
        <>
            <div className="postingSection">
                <h2>호스트 기본 정보</h2>
                <div className="hostInfo">
                    <div>
                        <div>주최</div>
                        <div>00요양원</div>
                    </div>
                    <div></div>
                    <div>
                        <div>연락처</div>
                        <div>010-1234-5678</div>
                    </div>
                    <div>
                        <div>지역</div>
                        <div>대전 유성구</div>
                    </div>
                    <div>
                        <div>이메일</div>
                        <div className="hostEmail">contact@artcation.example</div>
                    </div>
                    <div>
                        <div>상세 주소</div>
                        <div>대전광역시 유성구 대학로 99</div>
                    </div>
                </div>
            </div>

            <div className="postingSection">
                <h2>공연 정보</h2>
                <div className="postingInputs">
                    <div>
                        <label htmlFor="title">공고명<span>*</span></label>
                        <div>
                            <input id="title" type="text" />
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="placeName">장소명<span>*</span></label>
                        <div>
                            <input id="placeName" type="text" placeholder="ex) OO 요양원 1층 강당" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="performanceDate">공연 일자 및 시간<span>*</span></label>
                        <div>
                            <input id="performanceDate" type="date" />
                            <input type="time" />
                            <select defaultValue="">
                                <option value="" disabled>러닝 타임</option>
                                <option>30분</option>
                                <option>40분</option>
                                <option>50분</option>
                                <option>60분</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="applicationDeadline">지원 마감일<span>*</span></label>
                        <div>
                            <input id="applicationDeadline" type="date" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="genre">희망 장르 및 모집 팀 수<span>*</span></label>
                        <div>
                            <select id="genre" defaultValue="">
                                <option value="" disabled>희망장르</option>
                                <option>클래식</option>
                                <option>대중음악</option>
                                <option>재즈</option>
                                <option>국악</option>
                            </select>
                            <input className="recruitTeamCount" type="number" min="1" placeholder="모집 팀 수" />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="budget">예산</label>
                        <div>
                            <input id="budget" type="text" placeholder="ex) 300,000" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="postingSection">
                <h2>공연 내용</h2>
                <textarea
                    className="postingTextBox postingDescription"
                    placeholder={'공연의 목적과 희망하는 프로그램 내용을 입력해 주세요.\n현장에서 제공 가능한 보유 장비를 함께 입력해 주세요.'}
                />
            </div>

            <div className="postingSection">
                <h2>요청 사항</h2>
                <textarea
                    className="postingTextBox postingRequest"
                    placeholder={'공연 진행 시 필요한 요청 사항을 입력해 주세요.\n예) 공연 시작 1시간 전까지 도착해 주세요.'}
                />
            </div>

            <div className="postingSection">
                <h2>첨부 자료</h2>
                <div className="postingTextBox postingFiles">
                    <p>PDF, DOCX, HWP, JPG, PNG 형식의 파일을 첨부해 주세요.</p>
                    <label htmlFor="files">업로드</label>
                    <input id="files" type="file" multiple accept=".pdf,.docx,.hwp,.jpg,.jpeg,.png" />
                </div>
            </div>
        </>
    )
}
