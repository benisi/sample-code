import React from "react";
import { formatDistance } from "date-fns";

const Post = ({ post }) => {
    const diffForHumans = (date) => {
        return formatDistance(new Date(date), new Date(), { addSuffix: true });
    };
    return (
        <div className="bg-white rounded p-4 mb-4">
            <div className="text-sm">
                <p className="capitalize font-semibold">{post.user.name}</p>
                <time className="text-slate-600">{diffForHumans(post.publication_date)}</time>
            </div>
            <h3 className="text-l py-4 font-semibold">{post.title}</h3>
            <p className="pb-2">{post.description}</p>
        </div>
    );
};

export default Post;
