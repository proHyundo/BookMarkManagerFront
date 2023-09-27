import { Outlet } from "react-router-dom";
import { HeaderMenu } from "/src/components/HeaderMenu/HeaderMenu";

const RootLayout = () => {
  const links = [
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
        { link: "/contact", label: "Contact to Developer" }
      ],
    },
  ];
  return (
    <>
      <HeaderMenu links={links} />
      {/* <div size="lg" px="xs">
        <Outlet />
      </div> */}
      
      <Outlet />
    </>
  );
};

export default RootLayout;
