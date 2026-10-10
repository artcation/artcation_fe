import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import BottomButton from '../../components/BottomButton'
import PostingForm from './PostingForm'
import './PostingDetailPage.css'
import StatusIcon from '../../components/StatusIcon'
import axiosInstance from '../../../api/axiosInstance'

export default function PostingDetailPage() {
    const { id } = useParams();
    const [posting, setPosting] = useState(null);

    useEffect(() => {
        async function getPosting() {
            try {
                const response = await axiosInstance.get(`/host/recruitments/${id}`);
                setPosting(response.data.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPosting();
    }, [id])

    if (!posting) return null;

    const actions = posting.availableActions ?? [];

    return (
        <>
            <div>
                <div className="postingDetailHeader">
                    <div>
                        <StatusIcon text={posting.status} />
                        <h1>{posting.title}</h1>
                    </div>
                    <div>
                        {actions.includes('CANCEL') && <button className='postingCancelBtn'>공고 취소</button>}
                        {actions.includes('CLOSE_EARLY') && <button className='postingCloseBtn'>조기 마감</button>}
                    </div>
                </div>
                <PostingForm posting={posting} />
            </div>

            {actions.includes('EDIT') && (
                <div className="bottomBar">
                    <BottomButton text="변경사항 저장" type="sub" />
                </div>
            )}
        </>
    )
}
