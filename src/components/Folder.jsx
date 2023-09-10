import { createStyles, Card, Image, Avatar, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },

  folderImage: {
    marginLeft: 16,
  },
}));

const Folder = ({ id, folderName, folderCaption }) => {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p={2} className={classes.card}>
      <Group noWrap spacing={10}>
        <Image
          src={"/src/assets/folder_icon.png"}
          height={48}
          width={48}
          className={classes.folderImage}
        />
        <div className={classes.body}>
          <Text transform="uppercase" color="dimmed" weight={700} size="xs">
            카테고리
          </Text>
          <Text className={classes.title} mt="xs" mb="md">
            {folderName}
          </Text>
          <Group noWrap spacing="xs">
            <Text size="xs" color="dimmed">
              •
            </Text>
            <Text size="xs" color="dimmed">
              {folderCaption}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
};

export default Folder;
