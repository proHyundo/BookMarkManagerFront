// librairies import
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// local import
import { HeaderMenu } from "/src/components/HeaderMenu/HeaderMenu";

const RootLayout = ({ children }) => {
    const queryClient = new QueryClient();

    const links = [
        { link: "/manage", label: "Manage"},
        {
            link: "#1",
            label: "Others",
            links: [
                { link: "/community", label: "Community" },
                { link: "/trend", label: "Trending" },
                { link: "/schedule", label: "Schedule" },
            ],
        },
        { link: "/pricing", label: "Pricing" },
        {
            link: "#2",
            label: "Support",
            links: [
                { link: "/faq", label: "FAQ" },
                { link: "/contact", label: "Contact to Dev" },
            ],
        },
    ];
    return (
        <>
            <HeaderMenu links={links} />
            {children ?? (
                <QueryClientProvider client={queryClient}>
                    <Outlet />
                </QueryClientProvider>
            )}
        </>
    );
};

export default RootLayout;
