import './NoticePopup.css'

export default function NoticePopup({ visibility, image, mainText, subText, buttonText = '닫기', onButtonClick }) {
    if (!visibility) {
        return null
    }

    return (
        <div className="noticePopupBg">
            <div className="noticePopup">
                {image && <img src={image} alt="" />}
                <div>
                    <p>{mainText}</p>
                    <p>{subText}</p>
                </div>
                <button onClick={onButtonClick}>{buttonText}</button>
            </div>
        </div>
    )
}
