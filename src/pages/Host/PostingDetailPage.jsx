import BottomButton from '../../components/BottomButton'
import PostingForm from './PostingForm'
import './PostingDetailPage.css'
import StatusIcon from '../../components/StatusIcon'
import { MOCK_POSTING_DETAIL } from './mockData'

export default function PostingDetailPage() {
    return (
        <>
            <div>
                <div className="postingDetailHeader">
                    <div>
                        <StatusIcon text={MOCK_POSTING_DETAIL.status} />
                        <h1>{MOCK_POSTING_DETAIL.title}</h1>
                    </div>
                    <div>
                        <button className='postingCancelBtn'>공고 취소</button>
                        <button className='postingCloseBtn'>조기 마감</button>
                    </div>
                </div>
                <PostingForm posting={MOCK_POSTING_DETAIL} />
            </div>
            
            <div className="bottomBar">
                <BottomButton text="변경사항 저장" type="sub" />
            </div>
        </>
    )
}
