import React, { useState } from 'react';
import { Button } from "@mui/material";

const btnStyle = {
  marginLeft: 5,
  marginRight: 5,
  width: 70,
}

const Uploader = ({ setImgSrc, imgSrc }) => {

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: imgSrc,
  });

  let inputRef;

  const saveImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    
    if(e.target.files[0]){
      fileReader.readAsDataURL(e.target.files[0])
    }
    fileReader.onload = () => {
      setImage(
        {
          image_file: e.target.files[0],
          preview_URL: fileReader.result
        }
      )
    }
    
  }

  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "../img/user.png",
    });
  }

  return (
    <div className="uploader-wrapper">
      <input type="file" accept="image/*"
        onChange={saveImage}
        // 클릭할 때 마다 file input의 value를 초기화 하지 않으면 버그가 발생할 수 있다
        // 사진 등록을 두개 띄우고 첫번째에 사진을 올리고 지우고 두번째에 같은 사진을 올리면 그 값이 남아있음!
        onClick={(e)=>e.target.value = null}
        ref={refParam => inputRef = refParam}
        style={{ display: "none" }}
      />
      <div className="img-wrapper">
        <img 
          src={image.preview_URL}
          name='preview'
          width='150'
          height='150'
          style={{marginLeft : 42}}
          sx={{
            mx: 'auto',
            top : '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          
        />
      </div>

      <div className="upload-button">
        <Button color="inherit" style={btnStyle} variant="contained" onClick={() => inputRef.click()}>
          Upload
        </Button>
        <Button color="error" style={btnStyle} variant="contained" onClick={deleteImage}>
          Delete
        </Button>
        <Button type="primary" style={btnStyle} variant="contained" onClick={() => {setImgSrc(image.preview_URL)}}>
          Apply
        </Button>

      </div>

    </div>
  );
}

export default Uploader;