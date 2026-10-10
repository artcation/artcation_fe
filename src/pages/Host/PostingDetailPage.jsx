import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
import BottomButton from '../../components/BottomButton'
import './PostingDetailPage.css'
import StatusIcon from '../../components/StatusIcon'
import axiosInstance from '../../../api/axiosInstance'
import { HOST_POSTINGS } from '../../routes'
import PostingForm from './PostingForm'
import { toRecruitmentBody } from './recruitmentBody'

export default function PostingDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [posting, setPosting] = useState(null);
    const formRef = useRef(null);

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

    async function handleSave() {
        if (!formRef.current.reportValidity()) return;
        const body = toRecruitmentBody(formRef.current);

        try {
            await axiosInstance.put(`/host/recruitments/${id}`, body);
            setPosting({...posting, ...body});
            alert('공고가 수정되었습니다.');
        }
        catch (error) {
            alert(error.response?.data?.message ?? '저장에 실패했습니다.');
        }
    }

    async function handleCancel() {
        if (!window.confirm('공고를 취소하시겠습니까? 들어온 지원도 모두 취소됩니다')) return;
        try {
            await axiosInstance.post(`/host/recruitments/${id}/cancel`);
            navigate(HOST_POSTINGS);
        } catch (error) {
            alert(error.response?.data?.message ?? '공고 취소에 실패했습니다.');
        }
    }

    async function handleClose() {
        if (!window.confirm('모집을 조기 마감하시겠습니까?')) return;
        try {
            await axiosInstance.post(`/host/recruitments/${id}/close`);
            setPosting({ ...posting, status: 'IN_REVIEW', availableActions: [] });
        } catch (error) {
            alert(error.response?.data?.message ?? '조기 마감에 실패했습니다.');
        }
    }

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
                        {actions.includes('CANCEL') && <button className='postingCancelBtn' onClick={handleCancel}>공고 취소</button>}
                        {actions.includes('CLOSE_EARLY') && <button className='postingCloseBtn' onClick={handleClose}>조기 마감</button>}
                    </div>
                </div>
                <form ref={formRef} className="postingDetailForm" onSubmit={(e) => e.preventDefault()}>
                    <PostingForm posting={posting} />
                </form>
            </div>

            {actions.includes('EDIT') && (
                <div className="bottomBar">
                    <BottomButton text="변경사항 저장" type="sub" onClick={handleSave}/>
                </div>
            )}
        </>
    )
}
