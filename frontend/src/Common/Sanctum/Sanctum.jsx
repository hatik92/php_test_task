import React from "react";

import { Sanctum } from "react-sanctum";

const sanctumConfig = {
  apiUrl: "http://foobar.test",
  csrfCookieRoute: "sanctum/csrf-cookie",
  signInRoute: "login",
  signOutRoute: "logout",
  userObjectRoute: "user",
};

const App = () => (
  <div className="my-application">
    <Sanctum config={sanctumConfig}>/* Your application code */</Sanctum>
  </div>
);