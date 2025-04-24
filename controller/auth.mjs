import * as authRepository from "../data/auth.mjs";

// 회원가입 put create
export async function signup(req, res, next) {
  const { userid, password, name, email } = req.body;
  const user = await authRepository.createUser(userid, password, name, email);
  // if(users){res.status(201).json(user)}
  res.status(201).json(user);
}

// 로그인 post
export async function login(req, res, next) {
  const { userid, password } = req.body;
  req.session.user = { userid };
  const user = await authRepository.login(userid, password);
  //if(user){res.status(200).json(`${userid}님 로그인 완료`)}else{res.status(404).json(message: `${userid}님 아이디 또는 비밀번호를 확인하세요`)}
  res.status(200).json(user);
  res.send(`로그인 성공: ${userid}`);
}

export async function me(req, res, next) {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("로그인이 필요합니다");
  }
}

export async function logout(req, res, next) {
  req.session.destroy(() => {
    res.send("로그아웃 되었습니다");
  });
}
