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
                        onLeftButtonClick ?
                        <button onClick={onLeftButtonClick}>{leftButtonText}</button> : ''
                    }
                    {
                        rightButtonText ?
                        <button className={`${type}Button`} onClick={onRightButtonClick}>{rightButtonText}</button> : ''
                    }
                </div>
            </div>
        </div>
    )
}
