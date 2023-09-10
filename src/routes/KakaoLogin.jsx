import React, { useEffect, us } from "react";
import { redirect } from "react-router-dom";

const KakaoLogin = () => {
  // 1.해당 페이지가 로딩되었다면 url 에 인가코드가 담기게 된다.
  useEffect(() => {
    //2.인가코드를 추출할 변수 생성. 현재 url 주소를 가지고 있다.
    const url = new URL(window.location.href);

    //3.위에서 만든 URL 에서 code=  라고 써진 키값을 찾아서 벨류를 반환받음.
    const code = url.searchParams.get("code");

    //4.위에서 얻은 인가코드를 백엔드의 카카로 로그인주소로 보냄.
    fetch(import.meta.env.VITE_APP_SERVER + `/api/v1/user/social/kakao`, {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: {
        code: code,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>KakaoLogin</div>;
};

export default KakaoLogin;
