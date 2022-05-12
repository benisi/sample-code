import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import DropDown from "@/Components/common/DropDown";
import { ChevronDown } from "lucide-react";

export default function Main({ children }) {
    const auth = children.props.auth;
    const title = children.props.title;
    const [showMenuOptions, setShowMenuOptions] = useState(false);
    return (
        <>
            <Head title={title} />
            <div className="pb-16 bg-gray-100 flex justify-center min-h-screen">
                <div className="md:px-16 px-4 py-4 box bottom flex justify-between bg-white fixed w-full shadow-md">
                    <div>
                        <h1 className="text-violet-800 text-2xl font-bold">
                            <Link href={route("home")}>BloGGG</Link>
                        </h1>
                    </div>
                    <div>
                        {auth.user ? (
                            <div>
                                <Link
                                    className="text-sm flex items-center"
                                    onClick={() =>
                                        setShowMenuOptions(!showMenuOptions)
                                    }
                                >
                                    {auth.user.name} <ChevronDown size={15} />
                                </Link>

                                {showMenuOptions && (
                                    <DropDown
                                        handleClose={() =>
                                            setShowMenuOptions(false)
                                        }
                                    >
                                        <ol className="py-2 px-4">
                                            <li>
                                                <Link
                                                    href={route("dashboard")}
                                                    as="button"
                                                    className="underline text-sm text-gray-600 hover:text-gray-900"
                                                >
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                    className="underline text-sm text-gray-600 hover:text-gray-900 mt-2"
                                                >
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ol>
                                    </DropDown>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="text-semibold text-violet-800"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route("register")}
                                    className="ml-4 text-sm text-white bg-violet-800 px-4 py-2 rounded cursor-pointer"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="md:w-2/5 w-full mt-16 mx-4 md:mx-0">{children}</div>
            </div>
        </>
    );
}
