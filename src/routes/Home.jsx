import { createStyles, Container, Group, Text, Button, Image, rem } from "@mantine/core";
import image from "/src/assets/home-welcome-banner.jpg";
import image_github from "/src/assets/image_github.png";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    boxSizing: 'border-box',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: 'relative',
    paddingTop: rem(120),
    paddingBottom: rem(120),

    [theme.fn.smallerThan('sm')]: {
      paddingBottom: rem(30),
      paddingTop: rem(30),
    },
  },

  image: {
    maxWidth: '40%',
    float: 'right',

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  image_github: {
    width: rem(32),
    marginRight: rem(8),

    [theme.fn.smallerThan('sm')]: {
      maxWidth: '100%',
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan('sm')]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan('sm')]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

const Home = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Container size={800} className={classes.inner}>
        <Image src={image} className={classes.image} />
        <h1 className={classes.title}>
          A{" "}
          <Text component="span" variant="gradient" gradient={{ from: "blue", to: "cyan" }} inherit>
            Bookmarks Tools
          </Text>{" "}
          Manage and Share with people
        </h1>

        <Text className={classes.description} color="dimmed">
          Build fully functional accessible web applications with ease – Mantine includes more than
          100 customizable components and hooks to cover you in any situation
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Get started
          </Button>

          <Button
            component="a"
            size="xl"
            variant="default"
            className={classes.control}
          >
            <img src={image_github} className={classes.image_github} />
            GitHub
          </Button>


        </Group>
      </Container>

    </div>
  );
};

export default Home;
