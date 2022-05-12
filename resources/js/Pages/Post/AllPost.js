import React, { useState } from "react";
import Post from "@/Components/Post";
import Main from "@/Layouts/Main";
import { Link, useRemember } from "@inertiajs/inertia-react";
import { ChevronDown, PlusCircle } from "lucide-react";
import { Inertia } from "@inertiajs/inertia";
import DropDown from "@/Components/common/DropDown";
import { usePopper } from "react-popper";

const AllPost = ({ posts, sortBy }) => {
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

    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        modifiers: [{ name: "arrow", options: { element: arrowElement } }],
        placement: "bottom-end",
    });

    return (
        <>
            <div className="mt-8 mb-1 flex">
                <PlusCircle className="mr-4" />
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
            </div>
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
            <div>{renderPost}</div>
            <div
                className={`flex ${
                    posts.prev_page_url ? "justify-between" : "justify-end"
                }`}
            >
                {posts.prev_page_url && (
                    <Link
                        className="p-2 bg-gray-200 rounded"
                        href={appendSortToUrl(posts.prev_page_url)}
                    >
                        Prev
                    </Link>
                )}
                {posts.next_page_url && (
                    <Link
                        className="p-2 bg-gray-200 rounded"
                        href={appendSortToUrl(posts.next_page_url)}
                    >
                        Next
                    </Link>
                )}
            </div>
        </>
    );
};

AllPost.layout = (page) => <Main children={page} title="Posts" />;

export default AllPost;
