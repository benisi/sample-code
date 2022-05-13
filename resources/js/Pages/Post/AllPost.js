import React, { useState } from "react";
import Post from "@/Components/Post";
import Main from "@/Layouts/Main";
import { Link, useRemember } from "@inertiajs/inertia-react";
import { ChevronDown, PlusCircle } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import DropDown from "@/Components/common/DropDown";
import { usePopper } from "react-popper";
import CreatePost from "./CreatePost";
import ReactTooltip from "react-tooltip";

const AllPost = ({ posts, sortBy, auth }) => {
    const renderPost = posts.data.map((post) => (
        <Post post={post} key={post.id} />
    ));

    const [sortedBy, setSortBy] = useRemember(sortBy);
    const [showSortOptions, setShowSortOptions] = useState(false);
    const sortOptions = ["recent", "oldest"];
    const handleSorting = (selectedSort) => {
        setSortBy(selectedSort);
        setShowSortOptions(false);
        Inertia.visit(appendSortToUrl(posts.path, selectedSort));
    };

    const appendSortToUrl = (url, selectedSort = null) => {
        const sortValue = selectedSort || sortedBy;
        const urlInstance = new URL(url);
        urlInstance.searchParams.append("sort_publication_date", sortValue);
        return urlInstance;
    };

    const [showCreatePostModal, setShowCreatePostModal] = useState(false);

    const closeModal = () => {
        setShowCreatePostModal(false);
    };

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: "arrow", options: { element: arrowElement } }],
        placement: "bottom-end",
    });

    return (
        <>
            <div className="mt-8 mb-2 flex justify-end text-violet-800">
                {auth.user && (
                    <>
                        <PlusCircle
                            onClick={() => setShowCreatePostModal(true)}
                            className="mr-4 cursor-pointer"
                            data-tip
                            data-for="addPost"
                        />
                        <ReactTooltip id="addPost" place="top" effect="solid">
                            Add a new post
                        </ReactTooltip>
                    </>
                )}
                <p
                    className="flex items-center text-sm cursor-pointer"
                    onClick={() => setShowSortOptions(!showSortOptions)}
                    ref={setReferenceElement}
                >
                    Sort by:{" "}
                    <span className="font-bold capitalize mx-1">
                        {sortedBy}
                    </span>{" "}
                    <ChevronDown size={12} />
                </p>
                {showSortOptions && (
                    <div ref={setPopperElement}>
                        <DropDown
                            handleClose={() => setShowSortOptions(false)}
                            style={styles["popper"]}
                            {...attributes["popper"]}
                        >
                            <ol className="px-4">
                                {sortOptions.map((option, index) => (
                                    <li
                                        key={index}
                                        className={`p-2 capitalize cursor-pointer ${
                                            option === sortedBy && "font-bold"
                                        }`}
                                        onClick={() => handleSorting(option)}
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ol>
                        </DropDown>
                        <div ref={setArrowElement} style={styles["arrow"]} />
                    </div>
                )}
            </div>
            <CreatePost
                showCreatePostModal={showCreatePostModal}
                closeModal={closeModal}
            />
            <div>{posts.data.length > 0 && renderPost}</div>
            {posts.data.length === 0 && (
                <div className="flex flex-col justify-center items-center mt-16">
                    <p>No posts available at the moment</p>
                </div>
            )}
            <div
                className={`flex ${
                    posts.prev_page_url ? "justify-between" : "justify-end"
                }`}
            >
                {posts.prev_page_url && (
                    <Link
                        className="rounded text-white bg-violet-800 px-4 py-2 cursor-pointer"
                        href={appendSortToUrl(posts.prev_page_url)}
                    >
                        Prev
                    </Link>
                )}
                {posts.next_page_url && (
                    <Link
                        className="p-2 rounded text-white bg-violet-800 px-4 py-2 cursor-pointer"
                        href={appendSortToUrl(posts.next_page_url)}
                    >
                        Next
                    </Link>
                )}
            </div>
        </>
    );
};

AllPost.layout = (page) => <Main children={page} />;

export default AllPost;
