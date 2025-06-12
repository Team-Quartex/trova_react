import React from 'react';

const PostImage = ({ images }) => {
  if (!images || images.length === 0) return null;

  const commonClass = 'w-full h-full object-cover rounded-xl';

  switch (images.length) {
    case 1:
      return (
        <div className="w-full h-[300px]">
          <img src={images[0]} alt="" className={commonClass} />
        </div>
      );
    case 2:
      return (
        <div className="grid grid-cols-2 gap-3">
          {images.map((img, i) => (
            <img key={i} src={img} alt="" className={commonClass} />
          ))}
        </div>
      );
    case 3:
      return (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img, i) => (
            <img key={i} src={img} alt="" className={commonClass} />
          ))}
        </div>
      );
    case 4:
      return (
        <div className="grid grid-cols-2 grid-rows-2 gap-3">
          {images.map((img, i) => (
            <img key={i} src={img} alt="" className={commonClass} />
          ))}
        </div>
      );
    case 5:
      return (
        <div className="grid grid-cols-6 grid-rows-7 gap-3 h-[400px]">
          <img src={images[0]} alt="" className={`${commonClass} col-span-3 row-span-4`} />
          <img src={images[1]} alt="" className={`${commonClass} col-span-3 row-span-4`} />
          <img src={images[2]} alt="" className={`${commonClass} col-span-2 row-span-3`} />
          <img src={images[3]} alt="" className={`${commonClass} col-span-2 row-span-3`} />
          <img src={images[4]} alt="" className={`${commonClass} col-span-2 row-span-3`} />
        </div>
      );
    default:
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <img key={i} src={img} alt="" className={commonClass} />
          ))}
        </div>
      );
  }
};

export default PostImage;
