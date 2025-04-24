import express from "express";
import postsRouter from "./router/post.mjs";
import authRouter from "./router/auth.mjs";
import session from "express-session";

const app = express();

app.use(express.json());

app.use(
  session({
    secret: "!@#$%%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use("/posts", postsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  // 라우터에 있는 데이터가 안 읽힐 경우 실행
  res.sendStatus(404);
});

app.listen(8080, () => {
  console.log("서버 실행 중");
});
