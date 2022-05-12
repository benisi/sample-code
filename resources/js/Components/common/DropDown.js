import React from "react";
import OutsideDetector from "./OutsideDetector";

const DropDown = ({ handleClose, children }) => {
    return (
        <OutsideDetector handleClose={() => handleClose()}>
            <div className="bg-white absolute shadow-md mt-2">{children}</div>
        </OutsideDetector>
    );
};

export default DropDown;
