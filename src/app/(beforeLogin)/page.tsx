import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Main from "@/app/(beforeLogin)/_component/Main";

export default async function Page() {
	const session = await auth();
	if (session?.user) redirect("/home");

	return <Main />;
}
