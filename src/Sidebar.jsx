import './sidebar.css'
const SideBarItem=( {name ,active,handleChange,icone}) => {
  return (
    <button className={`sidebar-item ${active ? 'active':''}`} onClick={handleChange}><i className={icone}></i> {name}</button>
  )
}
const Sidebar = ({options , selectedOptionIndex,setselectedOptionIndex,setrotate_State}) => {
  return (
    <div className="sidebar">
      <div className="options">
      {
        options.map((option,index)=>{
           return <SideBarItem
            key={index} 
           name={option.name} 
            icone={option.icone}
           active={index === selectedOptionIndex} 
           handleChange={()=> setselectedOptionIndex(index)}/>
          })

        }
        <div className='rotate-items'>
         
            <button onClick={()=>{setrotate_State((pre)=>{
              return{
                ...pre,
                rotateZ: pre.rotateZ + 90
              }
            })}}> <i className="fa-solid fa-rotate-right"></i></button>
            <button
            onClick={()=>{setrotate_State((pre)=>{
              return{
                ...pre,
                rotateZ: pre.rotateZ - 90
              }
            })}}><i className="fa-solid fa-rotate-left"></i></button>
            <button onClick={()=>{setrotate_State((pre)=>{
              return{
                ...pre,
                flipVertical:`${pre.flipVertical === 1 ? -1 : 1 }`,
                rotateY: pre.rotateY + 180
              }
            })}}> <i className="fa-solid fa-arrows-left-right"></i></button>
            <button onClick={()=>{setrotate_State((pre)=>{
              return{
                ...pre,
                flipHorizontal:`${pre.flipHorizontal === 1 ? -1 : 1}`,
                
                rotateX: pre.rotateX + 180
              }
            })}}><i className="fa-solid fa-arrows-up-down"></i></button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar