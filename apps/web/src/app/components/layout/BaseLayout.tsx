"use client";

import React from "react";
import { Box, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import TopHeader from "./Header";
import Sidebar from "../sidebar/Sidebar";

function BaseLayout({ children }: { children: React.ReactNode }) {
    const [opened, { toggle, close }] = useDisclosure();

    return (
        <Flex h="100vh" w="100%" style={{ overflowX: "hidden", background: "#F5F8FA" }}>
            <Sidebar opened={opened} close={close} />

            <Flex direction="column" flex={1} style={{ overflow: "visible", minWidth: 0 }}>
                <TopHeader onBurgerClick={toggle} opened={opened} />

                <Flex direction="column" flex={1} style={{ overflow: "auto" }}>
                    <Box
                        flex={1}
                        m={{ base: "md", sm: 30 }}
                        p="xl"
                        style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "17px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.04), 0 1px 8px rgba(0,0,0,0.02)",
                            border: "1px solid rgba(0,0,0,0.05)",
                        }}
                    >
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default BaseLayout;