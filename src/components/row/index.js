import './index.css'

function Rows({ style = {}, left, center, right, onClick }){
  let finallStyle = {
    padding: '.5rem',
    borderBottom: '1px solid #e4e4e4',
    ...style,
  }

  return (
    <div onClick={onClick} style={finallStyle} className="rows">
      <div>{ left }</div>
      <div>{ center }</div>
      <div>{ right }</div>
    </div>
  )
}

export default Rows