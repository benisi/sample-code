import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";

export default function Main({ auth, children }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="pb-16 bg-gray-100 flex justify-center">
                <div className="px-16 py-4 box bottom flex justify-between bg-white fixed w-full">
                    <div><h1>BloGGG</h1></div>
                    <div>
                        {auth?.user ? (
                            <Link href={route("dashboard")} className="text-sm">
                                Dashboard
                            </Link>
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
