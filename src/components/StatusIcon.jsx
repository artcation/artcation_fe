import './StatusIcon.css'

export default function StatusIcon({text}) {
    const styles = {
        '확정': { color: 'white', background: 'var(--primary-color)', borderColor: 'var(--primary-color)' },
        '선정': { color: 'white', background: '#956BD8', borderColor: '#956BD8' },
        '지원 완료': { color: 'var(--primary-color)', background: 'white', borderColor: 'var(--primary-color)' },
        '모집중': { color: 'var(--primary-color)', background: 'var(--sub-color)', borderColor: 'var(--primary-color)' },
        '취소': { color: 'var(--error-color)', background: 'white', borderColor: 'var(--error-color)' },
        '미선정': { color: 'white', background: '#757575', borderColor: '#757575' },
        '검토중': { color: '#757575', background: '#F5F5F5', borderColor: '#757575' }
    };

    return (
        <div style={styles[text]} className='statusIcon'>
            {text}
        </div>
    )
}