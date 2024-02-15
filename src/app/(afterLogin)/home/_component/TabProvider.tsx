"use client";

import { ReactNode, createContext, useState } from "react";

interface Props {
	children: ReactNode;
}

export const TabContext = createContext({ tab: "detailed", setTab: (tab: "detailed" | "brief") => {} });

export default function TabProvider({ children }: Props) {
	const [tab, setTab] = useState("detailed");

	return <TabContext.Provider value={{ tab, setTab }}>{children}</TabContext.Provider>;
}
