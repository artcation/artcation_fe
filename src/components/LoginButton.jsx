import './LoginButton.css'

export default function LoginButton({ onClick, text, type, find }) {
  return (
    <button onClick={type != 'inactive' ? onClick : null} className={'loginButtonDefault ' + (find ? 'findButton ' : '') + (type == 'active' ? 'loginButtonActive' : 'loginButtonInactive') }>
      {text}
    </button>
  );
}