import BottomButton from '../../components/BottomButton'
import PostingForm from './PostingForm'
import './PostingCreatePage.css'
import { useNavigate } from 'react-router';
import { hostPostingDetailPath } from '../../routes';
import axiosInstance from '../../../api/axiosInstance';
import { useRef } from 'react'

export default function PostingCreatePage() {
    const navigate = useNavigate();
    const formRef = useRef(null);

    async function handleSubmit() {
        if (!formRef.current.reportValidity()) return;
        const data = Object.fromEntries(new FormData(formRef.current));

        try {
            const response = await axiosInstance.post('/host/recruitments', {
                ...data,
                runningTime: Number(data.runningTime),
                recruitTeamCount: Number(data.recruitTeamCount),
                budget: data.budget ? Number(data.budget.replaceAll(',', '')) : undefined,
            });
            navigate(hostPostingDetailPath(response.data.data.recruitmentId));
        } catch (error) {
            alert(error.response?.data?.message ?? '공고 등록에 실패했습니다.');
        }
    }

    return (
        <>
            <div className="postingCreate">
                <h1>공연 공고 등록</h1>
                <form ref={formRef} className="postingCreateForm" onSubmit={(e) => e.preventDefault()}>
                    <PostingForm />
                </form>
            </div>
            <div className="bottomBar">
                <BottomButton text="공고 등록하기" type="primary" onClick={handleSubmit} />
            </div>
        </>
    )
}
