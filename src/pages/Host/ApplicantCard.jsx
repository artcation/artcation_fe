import StatusIcon from '../../components/StatusIcon'
import './ApplicantCard.css'

function formatDate(date) {
    return date.replaceAll('-','. ')
}

export default function ApplicantCard({ applicant, onClick }) {
    return (
        <div className="applicantCard" onClick={onClick}>
            <div></div>
            <div>
                <div>{applicant.teamName}</div>
                <div>지원: {formatDate(applicant.appliedAt)}</div>
            </div>
            <div>
                <StatusIcon text={applicant.reviewStatus} />
                {applicant.daysUntilConfirm != null && <div>D-{applicant.daysUntilConfirm}</div>}
            </div>
        </div>
    )
}
