import React, { useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import DropDown from "@/Components/common/DropDown";

export default function Main({ children }) {
    const auth = children.props.auth;
    const [showMenuOptions, setShowMenuOptions] = useState(false);
    return (
        <>
            <Head title="Welcome" />
            <div className="pb-16 bg-gray-100 flex justify-center min-h-screen">
                <div className="px-16 py-4 box bottom flex justify-between bg-white fixed w-full">
                    <div>
                        <h1>BloGGG</h1>
                    </div>
                    <div>
                        {auth.user ? (
                            <div>
                                <Link
                                    href={route("dashboard")}
                                    className="text-sm"
                                    onClick={() =>
                                        setShowMenuOptions(!showMenuOptions)
                                    }
                                >
                                    Dashboard
                                </Link>

                                {showMenuOptions && (
                                    <DropDown
                                        handleClose={() =>
                                            setShowMenuOptions(false)
                                        }
                                    >
                                        <ol className="py-2 px-4">
                                            <Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="underline text-sm text-gray-600 hover:text-gray-900"
                                            >
                                                Log Out
                                            </Link>
                                        </ol>
                                    </DropDown>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href={route("login")} className="text-sm">
                                    Log in
                                </Link>

                                <Link
                                    href={route("register")}
                                    className="ml-4 text-sm"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="w-2/5 mt-16">{children}</div>
            </div>
        </>
    );
}
