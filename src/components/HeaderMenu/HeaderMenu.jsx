import React, { useRef } from "react";
import { Form, Link, redirect, useRouteLoaderData } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

import {
    createStyles,
    Menu,
    Group,
    Center,
    Burger,
    Container,
    rem,
    Image,
    Button,
    Drawer,
    ScrollArea,
    Divider,
} from "@mantine/core";
import styles from "./HeaderMenu.module.css";
import image from "/src/assets/BrandLogo.png";

const useStyles = createStyles((theme) => ({
    // links: {
    //     [theme.fn.smallerThan("sm")]: {
    //         display: "none",
    //     },
    // },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },

    linkButton: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.blue[7],
        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.blue[0],
        },
    },
}));

export function HeaderMenu({ links }) {
    const accessToken = useRouteLoaderData("root");

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const { classes } = useStyles();

    // map 을 열어서 반복적으로 Menu 컴포넌트를 생성.
    const items = links.map((link) => {
        // links 라는 속성이 있으면 Menu 컴포넌트를 links에 담긴 개수만큼 생성.
        const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <a href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
                            <Center>
                                <span className={classes.linkLabel}>{link.label}</span>
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <a key={link.label} href={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
                {link.label}
            </a>
        );
    });

    const ref = useRef(links);

    return (
        <header className="w-full">
            <div className="flex max-w-screen-2xl justify-between items-center h-20 px-16  mx-auto">
                <Link to=".." type="images" className="w-40">
                    <img src="/src/assets/BrandLogo.png" alt="Bookmark Share Logo Image" className="" />
                </Link>
                <div className="flex justify-between items-center">
                    <Link to="/manage">Manage</Link>
                    {items}
                    {accessToken && (
                        <Form method="post" action={`/logout`}>
                            <button type="submit">Logout</button>
                        </Form>
                    )}
                    {!accessToken && (
                        <Link to="/login" type="button">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
        // <header className={styles.header}>
        //     <Container size="lg">
        //         <div className={styles.inner}>
        //             <Link to=".." type="images">
        //                 <Image maw={150} mr="auto" radius="md" src={image} alt="Bookmark Share Logo Image" />
        //             </Link>
        //             <Group spacing={5} className={classes.links}>
        //                 <Link to="/manage" className={classes.link}>
        //                     Manage
        //                 </Link>
        //                 {items}
        //                 {accessToken && (
        //                     <Form method="post" action={`/logout`}>
        //                         <Button type="submit" className={classes.button} variant="light" radius="md" size="xs">
        //                             Logout
        //                         </Button>
        //                     </Form>
        //                 )}
        //                 {!accessToken && (
        //                     <Link to="/login" type="button" className={classes.linkButton}>
        //                         Login
        //                     </Link>
        //                 )}
        //             </Group>
        //             <Burger
        //                 opened={drawerOpened}
        //                 onClick={toggleDrawer}
        //                 className={classes.burger}
        //                 size="sm"
        //                 ref={ref}
        //             />
        //         </div>
        //     </Container>
        //     <Drawer
        //         opened={drawerOpened}
        //         onClose={closeDrawer}
        //         size="75%"
        //         padding="md"
        //         title="Menu Drawer"
        //         zIndex={1000000}
        //         position="right"
        //     >
        //         <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
        //             <Divider my="sm" />

        //             <a href="#" className={classes.link}>
        //                 Home
        //             </a>
        //             <a href="#" className={classes.link}>
        //                 Manage
        //             </a>
        //             <a href="#" className={classes.link}>
        //                 Support
        //             </a>

        //             <Divider my="sm" />

        //             <Group justify="center" grow pb="xl" px="md">
        //                 <Button variant="default">Log in</Button>
        //                 <Button>Sign up</Button>
        //             </Group>
        //         </ScrollArea>
        //     </Drawer>
        // </header>
    );
}

export async function action(data) {
    const response = await fetch(import.meta.env.VITE_APP_SERVER + "/api/v1/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("userAccessToken"),
        },
        credentials: "include",
    });
    if (response.status === 200) {
        localStorage.removeItem("userAccessToken");
        alert("로그아웃 되었습니다.");
    }
    return redirect("/");
}
