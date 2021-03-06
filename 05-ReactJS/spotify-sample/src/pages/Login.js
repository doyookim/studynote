import React from "react";
import { redirect_uri } from "../config";

const client_id = process.env.REACT_APP_CLIENT_ID;
//const client_id = "9c0faa352d534e0aa4d5d89e7071d08f";

const scope = "user-read-private user-read-email";

let url = "https://accounts.spotify.com/authorize";
url += "?response_type=token";
url += "&client_id=" + encodeURIComponent(client_id);
url += "&scope=" + encodeURIComponent(scope);
url += "&redirect_uri=" + encodeURIComponent(redirect_uri);

function Login() {
  return (
    <>
      <h2>Login</h2>
      <a href={url}>스포티파이 로그인~!</a>
    </>
  );
}

export default Login;
