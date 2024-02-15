import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabDecider from "@/app/(afterLogin)/home/_component/TabDecider";
import TabProvider from "./_component/TabProvider";

export default function Page() {
	return (
		<TabProvider>
			<Tab />
			<div>
				<TabDecider />
			</div>
		</TabProvider>
	);
}
