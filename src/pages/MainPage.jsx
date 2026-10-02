import { Link } from "react-router"

export default function MainPage() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>
                Artcation
            </div>
            <Link to="/artist">/artist</Link>
            <Link to="/host">/host</Link>
            <Link to="/login">/login</Link>
        </div>
    )
}