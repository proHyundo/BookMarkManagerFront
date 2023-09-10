import { Outlet } from "react-router-dom";
import { SimpleGrid, Container  } from "@mantine/core";
import { HeaderMenu } from "/src/components/HeaderMenu";

const RootLayout = () => {
  const links = [
    {
      link: "#1",
      label: "Learn",
      links: [
        { link: "/docs", label: "Documentation" },
        { link: "/resources", label: "Resources" },
        { link: "/community", label: "Community" },
        { link: "/blog", label: "Blog" },
      ],
    },
    { link: "/about", label: "About" },
    { link: "/pricing", label: "Pricing" },
    {
      link: "#2",
      label: "Support",
      links: [
        { link: "/faq", label: "FAQ" },
        { link: "/demo", label: "Book a demo" },
        { link: "/forums", label: "Forums" },
      ],
    },
  ];
  return (
    <>
      <HeaderMenu links={links} />
      {/* <SimpleGrid cols={6} spacing="xs" verticalSpacing="xs"> */}
      <Container size="lg" px="xs">
        <Outlet />
      </Container>
      {/* </SimpleGrid> */}
    </>
  );
};

export default RootLayout;
