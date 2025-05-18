import React, { useEffect, useState } from "react";
import Loading from "../pages/Loading";

const ShowPost = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/data.json");
      console.log(response);
      if (response.ok) {
        const data1 = await response.json();
        setData(data1.filter((f) => f.postId === 1));
        setLoading(false);
      }
    };
    getData();
  }, [0]);

  if (loading) {
    return <Loading/>
  }
  console.log(data);
  return (
    <div className="w-screen h-screen bg-white">
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full mb-2">
          <div className="flex gap-4 items-center">
            <img src={data[0].userImage} alt="" className="size-10" />
            <div className="flex flex-col">
              <h1>{data[0].userName}</h1>
              <h3>{data[0].date}</h3>
            </div>
          </div>
          <button>
            <i className="fi fi-rr-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPost;
