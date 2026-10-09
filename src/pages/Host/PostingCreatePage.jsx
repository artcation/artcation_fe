import BottomButton from '../../components/BottomButton'
import PostingForm from './PostingForm'
import './PostingCreatePage.css'

export default function PostingCreatePage() {
    return (
        <>
            <div className="postingCreate">
                <h1>공연 공고 등록</h1>
                <PostingForm />
            </div>
            <div className="bottomBar">
                <BottomButton text="공고 등록하기" type="primary" />
            </div>
        </>
    )
}
