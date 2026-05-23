"use client";

import React from "react";
import { useDisclosure } from "@mantine/hooks";
import TopHeader from "./Header";
import Sidebar from "../sidebar/Sidebar";

function BaseLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle, close }] = useDisclosure();

    return (
        /* Full-screen shell — sidebar + main panel side by side */
        <div className="flex h-screen w-full overflow-hidden bg-slate-50">

            {/* Sidebar (sticky, full height) */}
            <Sidebar opened={opened} close={close} />

            {/* Main panel — stretches to fill remaining width */}
            <div className="flex flex-1 flex-col min-w-0 overflow-hidden">

                {/* Sticky top header */}
                <TopHeader onBurgerClick={toggle} opened={opened} />

                {/* Scrollable content area — NO white card, transparent background */}
                <main className="
                    flex-1
                    overflow-y-auto
                    overflow-x-hidden
                    bg-slate-100
                    px-4 py-4
                    sm:px-6 sm:py-8
                    md:px-8 md:py-8
                    lg:px-10 lg:py-10
                    xl:px-12 xl:py-10
                ">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default BaseLayout;