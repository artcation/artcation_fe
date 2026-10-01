import './LoginButton.css'

export default function LoginButton({ onClick, text, type }) {
  return (
    <button onClick={type != 'inactive' ? onClick : null} className={'loginButtonDefault ' + (type == 'active' ? 'loginButtonActive' : 'loginButtonInactive')}>
      {text}
    </button>
  );
}