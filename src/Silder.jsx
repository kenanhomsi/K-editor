import './Silder.css'
export const Silder = ({ min , max , value , handleChange }) => {
  return (
    <div className="Silder-container">
        <input type="range" max={max} min={min} value={value} onChange={handleChange} className="silder" />
    </div>
  )
}
