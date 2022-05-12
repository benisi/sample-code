import React, { useEffect, useRef } from "react";

export default function TextArea({
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    rows = 6,
    cols,
    placeholder
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            rows={rows}
            name={name}
            value={value}
            className={
                `border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm ` +
                className
            }
            ref={input}
            autoComplete={autoComplete}
            required={required}
            onChange={(e) => handleChange(e)}
            cols={cols}
            placeholder={placeholder}
        />
    );
}
