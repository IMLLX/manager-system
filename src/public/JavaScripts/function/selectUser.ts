import knex from "../static/knex";
import toSQL from "./toSQL";

async function roleAdder(user: any) {
  var t = knex("role_info")
    .select("role_name", "dept_code", "dept_name", "post_code", "role_type")
    .where({
      dept_code: user.dept_code,
      post_code: user.post_code,
      role_type: user.role_type,
    })
    .toQuery();
  user.role_info = (await toSQL(t))[0];
  delete user.dept_code, delete user.post_code, delete user.role_type;
  return user;
}

function selectUser(userClientCode: Number) {
  return new Promise((resolve, reject) => {
    var t = knex("tool_user")
      .select(
        "name",
        "username",
        "sex",
        "role",
        "user_code",
        "client_role",
        "role_type",
        "dept_code",
        "post_code"
      )
      .where({ user_code: userClientCode })
      .toQuery();
    toSQL(t)
      .then((result: any) => {
        if (result[0]) {
          result = result[0];
          roleAdder(result).then((result) => {
            resolve(result);
          });
        } else {
          resolve({
            message: "找不到用户 " + userClientCode.toString(),
            error: true,
            userCode: userClientCode,
          });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default selectUser;
