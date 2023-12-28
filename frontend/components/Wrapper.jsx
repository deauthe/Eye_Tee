import React from "react";

const Wrapper = ({ children, className }) => {
    return (
        <div
            className={`w-full max-w-[1780px] px-5 md:px-3 mx-auto ${
                className || ""
            }`}
        >
            {children}
        </div>
    );
};

export default Wrapper;
