import { Link } from "react-router"
import { HOST_POSTINGS } from "../routes"

export default function MainPage() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
                Artcation
            </div>
            <Link to="/artist">/artist</Link>
            <Link to="/artist/explore">/artist/explore</Link>
            <Link to="/host">/host</Link>
            <Link to={HOST_POSTINGS}>{HOST_POSTINGS}</Link>
            <Link to="/login">/login</Link>
        </div>
    )
}