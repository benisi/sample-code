import React, { useRef, useEffect } from "react";

function useOutsideDetector(
    ref,
    handleClose
) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClose(false);
            }
        }

        document.addEventListener("mousedown", (event) =>
            handleClickOutside(event)
        );
        return () => {
            document.removeEventListener("mousedown", (event) =>
                handleClickOutside(event)
            );
        };
    }, [ref]);
}

const OutsideDetector = (props) => {
    const wrapperRef = useRef(null);
    useOutsideDetector(wrapperRef, props.handleClose);

    return <div ref={wrapperRef}>{props.children}</div>;
};

export default OutsideDetector;
