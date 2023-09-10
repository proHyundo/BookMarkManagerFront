import { Form, Link, redirect, useRouteLoaderData } from "react-router-dom";

import { createStyles, Header, Menu, Group, Center, Burger, Container, rem, Image, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(56),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

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
  const accessToken = useRouteLoaderData('root');

  const [opened, { toggle }] = useDisclosure(false);
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
                {/**<IconChevronDown size="0.9rem" stroke={1.5} />*/}
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

  return (
    <Header height={72} mb={80}>
      <Container>
        <div className={classes.inner}>
          <Link to=".." type="images">
            <Image maw={150} mr="auto" radius="md" src="/src/assets/BrandLogo.png" alt="Bookmark Share Logo Image" />
          </Link>
          <Group spacing={5} className={classes.links}>
            <Link to="/manage" className={classes.link}>
              Manage
            </Link>
            {items}
            {accessToken && (
              <Form method="post" action={`/logout`}>
                <Button type="submit" className={classes.button} variant="light" radius="md" size="xs">
                  Logout
                </Button>
              </Form>
            )}
            {!accessToken && (
              <Link to="/login" type="button" className={classes.linkButton}>
                Login
              </Link>
            )}
          </Group>
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
        </div>
      </Container>
    </Header>
  );
}

export async function action(data) {
  const response = await fetch("http://localhost:9090/api/v1/user/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('userAccessToken'),
    },
    credentials: 'include',
  });
  if (response.status === 200) {
    localStorage.removeItem("userAccessToken");
    alert("로그아웃 되었습니다.");
  }
  return redirect("/");
}
