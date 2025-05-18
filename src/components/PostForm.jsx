import React from "react";
import ImagePicker from "./ImagePicker";

const PostForm = () => {
  return (
    <div className="rounded-4xl p-3.5 mb-5 bg-secondory">
      <form>
        <div className="bg-white p-2 flex items-start justify-between mb-3.5 rounded-2xl">
          <img
            src="/images/Dummy.png"
            alt=""
            className="w-8 h-8 object-cover rounded-[50%]  mr-2.5"
          />
          <textarea
            rows="6"
            cols="30"
            placeholder="What's Your Mind..........."
            className="grow-[1] border-none outline-none mt-1.5 placeholder:text-primary placeholder:font-light"
          ></textarea>
          <img
            src="/images/Smile - iconSvg.co.png"
            alt=""
            className="w-8 h-8 object-cover rounded-[50%]  mr-2.5"
          />
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <ImagePicker/>

          <label htmlFor="city-search">
            <div>
              <input
                type="text"
                id="city-search"
                placeholder="Type a city name"
                autoComplete="off"
              />
            </div>
          </label>

          <label htmlFor="public-private">
            <div>
              <span>
                <i className="fi fi-rr-globe"></i>
              </span>
              <span> Public</span>
            </div>
          </label>
          <button type="submit">
            Send &nbsp;<i className="fi fi-br-paper-plane paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
