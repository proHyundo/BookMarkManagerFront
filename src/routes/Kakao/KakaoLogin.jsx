// libraries import
import axios from "axios";
import React, { useEffect, us } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const KakaoLogin = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const url = new URL(window.location.href);
        const kakaoAuthCode = url.searchParams.get("code");
        const kakaoUserOriginRequest = url.searchParams.get("state");
        axios
            .post(
                import.meta.env.VITE_APP_SERVER + `/api/v1/social/kakao/${kakaoUserOriginRequest}`,
                {
                    kakaoAuthCode: kakaoAuthCode,
                },
                {
                    headers: {
                        "Content-type": "application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res);
                if(kakaoUserOriginRequest === "login") {
                    localStorage.setItem("userAccessToken", res.data.data.userAccessToken);
                    navigate("/");
                }

                if(kakaoUserOriginRequest === "signup") {
                    window.alert("회원가입이 완료되었습니다. 로그인 해주세요.");
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("로그인 실패.");
                navigate("/login");
            });
    }, []);

    return (
        <div className="flex flex-col items-center mt-4 h-full">
            <AiOutlineLoading3Quarters className="animate-spin text-xl mb-4" />
            <p>Processing Kakao Login</p>
        </div>
    );
};

export default KakaoLogin;
