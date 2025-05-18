import React from 'react'

const ImagePicker = () => {
  return (
    <div className="flex items-center">
      <input
        type="file"
        accept="image/*"
        id="image-picker"
        className="hidden"
        multiple
      />
      <label
        htmlFor="image-picker"
        className="cursor-pointer inline-flex items-center px-4 py-2 text-black font-bold"
      >
        <span className="mr-2">
          <i className="fi fi-rr-copy-image"></i>
        </span>
        <span>Image/Video</span>
      </label>
    </div>
  )
}

export default ImagePicker
