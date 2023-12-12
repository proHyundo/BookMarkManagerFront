// libraries import
import { Form, redirect } from "react-router-dom";
import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
    rem,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
    wrapper: {
        minHeight: rem(720),
        backgroundSize: "cover",
        backgroundImage:
            "url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)",
    },

    form: {
        borderRight: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]}`,
        minHeight: rem(700),
        maxWidth: rem(500),
        paddingTop: rem(80),

        [theme.fn.smallerThan("sm")]: {
            maxWidth: "100%",
        },
    },

    title: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
}));

const Login = () => {
    const { classes } = useStyles();

    const openKakaoLogin = () => {
        let url = import.meta.env.VITE_KAKAO_LOGIN_URL+"&state=login";
        location.href = url;
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    Welcome back to Bookmark-Tool!
                </Title>
                <Form method="POST">
                    <TextInput label="Email address" placeholder="Bookmarkshare@gmail.com" size="md" name="email" />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" name="pwd" />
                    <Checkbox label="Keep me logged in" mt="xl" size="md" />
                    <Button fullWidth mt="xl" size="md" type="submit" className="bg-blue-500">
                        Login
                    </Button>
                </Form>

                <Text className="text-center mt-5 mb-5">Or Try with</Text>

                <div onClick={openKakaoLogin} className="flex justify-center">
                    <img
                        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                        width="200"
                        alt="카카오 로그인 버튼"
                    />
                </div>

                <button
                    className="bg-slate-200 rounded-md w-full h-10 mt-5"
                    onClick={() => {
                        fetch(import.meta.env.VITE_APP_SERVER + "/api/test/developer/whoami/port", {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Access-Control-Allow-Origin": import.meta.env.VITE_APP_SERVER,
                            },
                            baseURL: import.meta.env.VITE_APP_SERVER,
                            withCredentials: true,
                            sameSite: "none",
                            credentials: "include",
                        }).then((res) => {
                            console.log(res);
                        });
                    }}
                >
                    Fetch 통신 테스트
                </button>
            </Paper>
        </div>
    );
};

export default Login;

export async function action(data) {
    const formData = await data.request.formData();
    const postData = Object.fromEntries(formData);
    const response = await fetch(import.meta.env.VITE_APP_SERVER + "/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": import.meta.env.VITE_APP_SERVER,
            Origin: import.meta.env.VITE_APP_SERVER,
        },
        baseURL: import.meta.env.VITE_APP_SERVER,
        withCredentials: true,
        sameSite: "none",
        credentials: "include",
    });
    const resData = await response.json();
    console.log(resData);
    if (resData.code === 200) {
        localStorage.setItem("userAccessToken", resData.userAccessToken);
        return redirect("/");
    } else {
        alert("Invalid Credentials");
        return redirect("/login");
    }
}
