import knex from "../static/knex";
import toSQL from "./toSQL";

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
          resolve(result);
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
