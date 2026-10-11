import { Link } from "react-router"
import { HOST_POSTINGS } from "../routes"

export default function MainPage() {
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