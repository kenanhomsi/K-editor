import { useState ,useRef} from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,

} from 'react-image-crop'
import {canvasPreview} from './canavasPreview'
import { canvasSaveCropImage } from './canvasSaveCropImage'
import{useDebounceEffect} from './useDebounceEffect'
import 'react-image-crop/dist/ReactCrop.css'
import './App.css'
import { Silder } from './Silder'
import Sidebar from './Sidebar'
const elementValue100=['Brightness','Contrast','Saturation']
const default1=100;
const default2=0;
const  Default_options=[
  {
    name:'Brightness',
    property:'brightness',
    value:100,
    icone:"fa-regular fa-sun",
    rang:{
      min:0,
      max:200
    },
    unit:'%'
  },
  {
    name:'Contrast',
    property:'contrast',
    value:100,
    icone:"fa-regular fa-sun",
    rang:{
      min:0,
      max:200
    },
    unit:'%'
  },
  {
    name:'Saturation',
    property:'saturate',
    value:100,
    icone:"fa-regular fa-sun",
    rang:{
      min:0,
      max:200
    },
    unit:'%'
  },
  {
    name:'Grayscale',
    property:'grayscale',
    value:0,
    icone:"fa-regular fa-sun",
    rang:{
      min:0,
      max:100
    },
    unit:'%'
  },
  {
    name:'Sepia',
    property:'sepia',
    value:0,
    icone:"fa-regular fa-sun",
    rang:{
      min:0,
      max:100
    },
    unit:'%'
  },{
    name:'Hue Rotate',
    property:'hue-rotate',
    value:0,
    icone:"fa-regular fa-sun",
    rang:{
      min:0,
      max:360
    },
    unit:'deg'
  },{
    name:'Blur',
    property:'blur',
    value:0,
    icone:"fa-solid fa-burst",
    rang:{
      min:0,
      max:20
    },
    unit:'px'
  }
]
const default_rotate={
  rotateX:0,
  rotateY:0,
  rotateZ:0,
  flipHorizontal:1,
  flipVertical:1
}
function centerAspectCrop(mediaWidth,mediaHeight,aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}
function App() {
  const [rotate_State,setrotate_State]=useState(default_rotate);
  const [image,setImage]=useState('https://i.pinimg.com/564x/21/84/28/218428e88eb7728195bb459831ff49bf.jpg');
  const [selectedOptionIndex,setselectedOptionIndex]=useState(0);
  const [options,setOptions]=useState(Default_options);
  const SelectedOption=options[selectedOptionIndex];
  const [cropImage,setrcropImage]=useState(false);
  const [DarkMode,setDarkMode]=useState(false);
  

    /* */
    
    const [imgSrc, setImgSrc] = useState()
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [scale] = useState(1)
    const [rotate] = useState(0)
    const [aspect] = useState(16 / 9)
    
  
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  function onDownloadCropClick() {
    canvasSaveCropImage(
      imgRef.current,
      previewCanvasRef.current,
      completedCrop,
      scale,
      rotate,
      setImage
    )
    setrcropImage(false);

  }
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate],
  )



    /* */


    function handleDarkModeClick(){
      setDarkMode((pre)=>!pre);
    }
    
    if(DarkMode){
      var r = document.querySelector(':root');
      r.style.setProperty('--bodyColor-first', '#303031');
      r.style.setProperty('--main-color', '#3429c7');
      r.style.setProperty('--middel-backColor', '#646465');
      r.style.setProperty('--active-color', '#548fe8');
      r.style.setProperty('--bar-color', '#303031');
    }else{
      var z = document.querySelector(':root');
      z.style.setProperty('--main-color', '#FD7259');
      z.style.setProperty('--bodyColor-first', '#d0cbcb');
      z.style.setProperty('--middel-backColor', '#f5eeee');
      z.style.setProperty('--active-color', '#ff6a00');
      z.style.setProperty('--bar-color', 'white');
    }
   function SaveImage(){
    
    var im=document.getElementById('main-img');
  var c = document.createElement('canvas');
  c.display='none';
        var ctx = c.getContext("2d");
         c.width = im.width;
         c.height = im.height;
const filtres=options.map((option)=>{
  return `${option.property}(${option.value}${option.unit})`
})
ctx.filter = filtres.join('');
ctx.translate(c.width / 2, c.height / 2);
if(rotate_State.rotateZ !== 0) {
  ctx.rotate(rotate_State.rotateZ * Math.PI / 180);
}
ctx.scale(rotate_State.flipHorizontal, rotate_State.flipVertical);
ctx.drawImage(im, -c.width / 2, -c.height / 2, c.width, c.height);
  // ctx.drawImage(im, -c.width / 2, -c.height / 2, c.width, c.height);
  const link = document.createElement('a');
  link.download = "image.jpg";
  link.href = c.toDataURL();
  link.click();
}

 function handleSlideChange({ target }) {
  setOptions((pre)=>{
    return pre.map((option,index)=>{
      if(index !== selectedOptionIndex) return option
      return {...option,value:target.value}
    })
  })

 }
 function getImageStyle(){
  const filtres=options.map((option)=>{
    return `${option.property}(${option.value}${option.unit})`
  })
  return {filter: filtres.join(' '),backgroundImage:`url(${image})`,transform: `rotateY(${rotate_State.rotateY}deg) rotateX(${rotate_State.rotateX}deg) rotateZ(${rotate_State.rotateZ}deg)`}
 }

 function CropImageStyle(b,objectFit,w,h){
  const filtres=options.map((option)=>{
    return `${option.property}(${option.value}${option.unit})`
  })
  
  return {filter: filtres.join(' '),transform: `rotateY(${rotate_State.rotateY}deg) rotateX(${rotate_State.rotateX}deg) rotateZ(${rotate_State.rotateZ}deg)`,border:`${b}`,objectFit:`${objectFit}`,width:`${w}px`,height:`${h}px`}
 }
 function handleInputChange(e){
  const urlimge=URL.createObjectURL(e.target.files[0]);
  setImage(urlimge);
  setImgSrc(urlimge);
  setOptions((pre)=>{
    return pre.map((option)=>{
      elementValue100.includes(option.name)?option.value=default1:option.value=default2;
      return{...option}

    })
  })
  setrotate_State(default_rotate);
 }
 function handleCropClike(){
  setrcropImage(true);
  setImgSrc(image);
 }
  return (
    <div className='container'>
            <div className="bar">
                  <h2>K_editor</h2>
               
            </div>
            <div className="body">
                  <div className="left">
                    <div className="up">
                    <input type='file' accept='image/png ,image/jpg,image/jpeg' id='input-file' onChange={handleInputChange}/>
                    <label className='Upload-image' htmlFor="input-file"><i className="fa-solid fa-cloud-arrow-up"></i> Upload image</label>
                    <button className='save-image' onClick={SaveImage}><i className="fa-solid fa-download"></i> save image</button>
                    </div>
                    <div className="down">
                      <button className='night-mode' onClick={handleDarkModeClick}><i className="fa-regular fa-moon"></i> night-mode</button>
                    </div>
                  </div>
                  <div className="middle">
                    
                    {!cropImage&&<figure>
                      <img src={image}  id='main-img'   style={getImageStyle()}/>
                    </figure>}
                    { cropImage&& !!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          // minWidth={400}
          minHeight={200}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={getImageStyle()}
            // style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {cropImage&& !!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              // {`${console.log()}`}
              style={
                CropImageStyle('1px solid black','contain',completedCrop.width,completedCrop.height)
               }
            />
          </div>
          <div>
            <button onClick={onDownloadCropClick}>Save Crop image</button>
            <button className='full' onClick={()=>{setrcropImage(false)}}><i className="fa-solid fa-expand"></i> full Screen</button>
          </div>
        </>
      )}
                    {!cropImage&&<div className="crop-selector">
                      <button className='crop' id='crop' onClick={handleCropClike}><i className="fa-solid fa-crop-simple"></i> crop</button>
                    </div>}
                    <Silder
                      min={SelectedOption.rang.min}
                      max={SelectedOption.rang.max}
                      value={SelectedOption.value}
                      handleChange={handleSlideChange}
                    />

                  </div>
                  <div className="right">
                    <Sidebar options={options} setrotate_State={setrotate_State} selectedOptionIndex={selectedOptionIndex} setselectedOptionIndex={setselectedOptionIndex} />
                  </div>  
            </div> 
        
    </div>
  )
}

export default App
