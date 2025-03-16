"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function BreadCrumbs ()  {
    const paths = usePathname();
    const pathNames = paths.split("/").filter((path) => path);
    const activePath = pathNames[pathNames.length - 1].split("-").join(" ");

    return (
        <div className="font-inter">
            <ul className="ml-0 flex gap-1 text-sm/[16px] flex-wrap items-center capitalize">
                <li className="transition-all ">
                    <Link href="/" className="text-[#acacac] hover:underline">
                        Home
                    </Link>
                </li>
                {pathNames.length > 0 && (
                <li>
                    <FiChevronRight className="ml-1" size={14} color="#acacac" />
                </li>
                )}
                {pathNames.map((link, idx) => {
                const href = `/${pathNames.slice(0, idx + 1).join("/")}`;
                const linkName = link.split("-").join(" ");
                return (
                    <React.Fragment key={idx}>
                    <li className={`${ activePath === linkName ? "" : ""}  transition-all `}>
                        <Link
                            href={href}
                            className="hover:underline text-white/60"
                        >
                        {linkName.replace(/_/g, " ")}
                        </Link>
                    </li>
                    {pathNames.length !== idx + 1 && (
                        <li>
                            <FiChevronRight className="ml-2" size={14} color="#acacac" />
                        </li>
                    )}
                    </React.Fragment>
                );
                })}
            </ul>
        </div>
    );
};

