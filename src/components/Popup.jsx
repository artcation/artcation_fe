import './Popup.css';
import icon_check from '../assets/icon_check.png'
import { useNavigate } from 'react-router';

export default function Popup({visibility, mainText, subText, type}) {
    const navigate = useNavigate();

  return (
    <div style={visibility ? {display: "flex"} : {display: "none"}} className='popupBg'>
        <div className='popup'>
            <img src={icon_check} alt="icon" />
            <div>
                <p>{mainText}</p>
                <p>{subText}</p>
            </div>
            <button onClick={() => navigate("/")}>메인 화면으로 이동</button>
        </div>
    </div>
  );
}