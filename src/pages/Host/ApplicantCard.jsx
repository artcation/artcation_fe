import StatusIcon from '../../components/StatusIcon'
import './ApplicantCard.css'

export default function ApplicantCard() {
    return (
        <div className="applicantCard">
            <div></div>
            <div>
                <div>팀 이름</div>
                <div>지원: 2026. 09. 28</div>
            </div>
            <div>
                <StatusIcon text="SELECTED" />
                <div>D-3</div>
            </div>
        </div>
    )
}
