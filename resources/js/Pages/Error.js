import Main from "@/Layouts/Main";
import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Error = ({ code, message }) => {
    return (
        <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center">
                <h2 className="text-7xl font-bold text-red-900">{code}</h2>
                <p className="font-semibold mt-4">{message}</p>
                <p>
                    Return <Link className="text-violet-800 font-semibold" href={route("home")}>home</Link>
                </p>
            </div>
        </div>
    );
};

Error.layout = (page) => <Main children={page} title="Error" />;

export default Error;
