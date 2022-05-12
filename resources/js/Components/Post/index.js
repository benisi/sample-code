import React from "react";
import { formatDistance } from "date-fns";
import ReactTooltip from "react-tooltip";

const Post = ({ post }) => {
    const diffForHumans = (date) => {
        return formatDistance(new Date(date), new Date(), {
            addSuffix: true,
            includeSeconds: true,
        });
    };
    return (
        <div className="bg-white rounded p-4 mb-4 shadow-md">
            <div className="text-sm">
                <p className="capitalize font-semibold text-violet-800">
                    {post.user.name}
                </p>
                <time className="text-slate-600" data-tip data-for="time">
                    {diffForHumans(post.publication_date)}
                </time>
                <ReactTooltip id="time" place="top" effect="solid">
                    {post.publication_date}
                </ReactTooltip>
            </div>
            <h3 className="text-l py-4 font-semibold">{post.title}</h3>
            <p className="pb-2">{post.description}</p>
        </div>
    );
};

export default Post;
