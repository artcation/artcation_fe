import StatusIcon from '../../components/StatusIcon'
import './ApplicantCard.css'

function formatDate(date) {
    return date.replaceAll('-','. ')
}

export default function ApplicantCard({ applicant }) {
    return (
        <div className="applicantCard">
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
