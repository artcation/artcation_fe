import './StatusIcon.css'

export default function StatusIcon({text}) {
    const styles = {
        'CONFIRMED': { message: '확정', color: 'white', background: 'var(--primary-color)', borderColor: 'var(--primary-color)' },
        'SELECTED': { message: '선정', color: 'white', background: '#956BD8', borderColor: '#956BD8' },
        'APPLIED': { message: '지원 완료', color: 'var(--primary-color)', background: 'white', borderColor: 'var(--primary-color)' },
        'RECRUITING': { message: '모집중', color: 'var(--primary-color)', background: 'var(--sub-color)', borderColor: 'var(--primary-color)' },
        'CANCELED': { message: '취소', color: 'var(--error-color)', background: 'white', borderColor: 'var(--error-color)' },
        'REJECTED': { message: '미선정', color: 'white', background: '#757575', borderColor: '#757575' },
        'IN_REVIEW': { message: '검토중', color: '#757575', background: '#F5F5F5', borderColor: '#757575' },
        'ON_HOLD': { message: '보류', color: '#757575', background: 'white', borderColor: '#757575' }
    };

    return (
        <div style={styles[text]} className='statusIcon'>
            {styles[text]?.message}
        </div>
    )
}