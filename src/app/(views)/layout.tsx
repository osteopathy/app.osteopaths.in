import { validateRequest } from "@/lib/auth"
import { BottomBar } from "./navbars";

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const { user, session } = await validateRequest();
    return <>
        {children}
        <BottomBar />
    </>
}
