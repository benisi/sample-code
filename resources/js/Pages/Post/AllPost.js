import React from "react";
import Post from "@/Components/Post";
import Main from "@/Layouts/Main";

const AllPost = ({ posts }) => {
    const renderPost = posts.data.map((post) => (
        <Post post={post} key={post.id} />
    ));
    return (
        <>
            <div className="">{renderPost}</div>
        </>
    );
};

AllPost.layout = (page) => <Main children={page} title="Posts" />;

export default AllPost;
