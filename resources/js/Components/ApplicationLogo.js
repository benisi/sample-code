import { Link } from "@inertiajs/inertia-react";
import React from "react";

export default function ApplicationLogo() {
    const appName = "BloGGG";
    return (
        <h1 className="text-violet-800 text-2xl font-bold">
            <Link href={route("home")}>{appName}</Link>
        </h1>
    );
}
