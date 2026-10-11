import './NoticePopup.css'

export default function NoticePopup({ visibility, image, mainText, subText, leftButtonText = '닫기', onLeftButtonClick, rightButtonText, onRightButtonClick, type}) {
    if (!visibility) {
        return null
    }

    return (
        <div className="noticePopupBg">
            <div className="noticePopup">
                {image && <img style={ type === 'primary' ? { width: '2rem' } : {} } src={image} alt="" />}
                <div>
                    <p>{mainText}</p>
                    <p>{subText}</p>
                </div>
                <div>
                    {
                        rightButtonText != '메인 화면으로 이동' ?
                        <button onClick={onLeftButtonClick}>{leftButtonText}</button> : ''
                    }
                    {
                        rightButtonText ?
                        <button className={type == 'cancel' ? 'cancelButton' : (type == 'primary' ? 'primaryButton' : '')} onClick={onRightButtonClick}>{rightButtonText}</button> : ''
                    }
                </div>
            </div>
        </div>
    )
}
