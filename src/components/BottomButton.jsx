import './BottomButton.css'

export default function BottomButton({ onClick, text, type }) {
  return (
    <button onClick={type != 'inactive' ? onClick : null} className={'buttonDefault ' + (type == 'primary' ? 'primaryButton' : (type == 'sub' ? 'subButton' : (type == 'cancel' ? 'cancelButton' : (type == 'inactive' ? 'inactiveButton' : ''))))}>
      {text}
    </button>
  );
}