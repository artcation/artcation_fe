import { Link, useNavigate } from "react-router"
import { HOST_POSTINGS } from "../routes"
import { useEffect } from "react"

export default function MainPage() {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/explore');
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
                Artcation
            </div>
            <Link to="/explore">공고 조회</Link>
            <Link to="/applications">내 지원 목록</Link>
            <Link to={HOST_POSTINGS}>내 공고 목록</Link>
            <Link to="/login">로그인</Link>
        </div>
    )
}