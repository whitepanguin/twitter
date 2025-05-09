import MongoDb from "mongodb";
import { getUsers } from "../db/database.mjs";
const ObjectId = MongoDb.ObjectId;

// 회원가입 put create
export async function createUser(user) {
  return getUsers()
    .insertOne(user)
    .then((result) => result.insertedId.toString());
}

// 로그인 get
export async function login(userid, password) {
  const founduser = users.find((user) => user.userid === userid);
  if (founduser) {
    if (founduser.password == password) {
      return founduser;
    } else {
      return { message: "Password Incorrect" };
    }
  } else {
    return { message: "UserId Incorrect" };
  }
}

export async function findByUserid(userid) {
  return getUsers().find({ userid }).next().then(mapOptionalUser);
}

export async function findByid(id) {
  return getUsers()
    .find({ _id: new ObjectId(id) })
    .next()
    .then(mapOptionalUser);
}

// id라는 항목을 새롭게 만들어서 user_id의 정보를 복사해서 넣어주는 함수다
function mapOptionalUser(user) {
  return user ? { ...user, id: user._id.toString() } : user;
}
