import './NoticePopup.css'

export default function NoticePopup({ visibility, image, mainText, subText, leftButtonText = '닫기', onLeftButtonClick, rightButtonText, onRightButtonClick, type}) {
    if (!visibility) {
        return null
    }

    return (
        <div className="noticePopupBg">
            <div className="noticePopup">
                {image && <img src={image} alt="" />}
                <div>
                    {mainText}
                    <p>{subText}</p>
                </div>
                <div>
                    <button onClick={onLeftButtonClick}>{leftButtonText}</button>
                    {
                        rightButtonText ?
                        <button className={type == 'cancel' ? 'cancelButton' : (type == 'primary' ? 'primaryButton' : '')} onClick={onRightButtonClick}>{rightButtonText}</button> : ''
                    }
                </div>
            </div>
        </div>
    )
}
