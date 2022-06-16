
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Moment from "react-moment";



function Post({ id, post}) {
  const [comments, setComments] = useState([]);
  const [likes_count, setLikes_count] = useState(post.likes_count);
  const [liked, setLiked] = useState(post.liked);
  const [errors, setErrors] = useState(false);


  const likePost = ()  => {
        const data ={user: localStorage.getItem("userid"),
          post: id};

        fetch('http://127.0.0.1:8000/api/post_like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'

          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(data => {
              setLikes_count(data.likes_count);
              setLiked(!liked)
            }).catch((e) => {
        console.log(e);
      });
  }

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
    >

        <img
          src={post.user.avatar?post.user.avatar:"/assets/default_avatar.jpg"}
//          {isLoggedIn ? <button>Logout</button> : <button>Login</button>}
//          src="/assets/default_avatar.jpg"
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4
                className="font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline inline-block"
              >
                {post?.user.username}
              </h4>
              <span
                className="text-sm sm:text-[15px] ml-1.5">
                @{post?.user.username}
              </span>
            </div>
            ·{" "}
            <span className="text-sm sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate}</Moment>
            </span>
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
               {post.movie.length>0 && (
                 <p>{post.movie.map((tag) => (
                        <a className="underline text-blue-500 hover:text-blue-700" href="#">#{tag.title}({tag.year}){" "}</a>
                ))}</p>
               )}
                {post?.text}
              </p>
          </div>

          <div className="inputicon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>


        {post?.image && (
                    <img src={post?.image} className="rounded-2xl max-w-[560px] max-h-[380px] object-cover mr-2"/>
            )}
        <div
          className="text-[#6e767d] flex justify-between w-10/12"
        >
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
//              setPostId(id);
//              setIsOpen(true);
            }}
          >
            <div className="inputicon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>


          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="inputicon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes_count > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes_count}
              </span>
            )}
          </div>

          <div className="inputicon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="inputicon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
