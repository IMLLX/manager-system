import knex from "../static/knex";
import toSQL from "./toSQL";

function selectUser(userClientCode: Number) {
  return new Promise((resolve, reject) => {
    var t = knex("role_info")
      .select("role_dpCode", "role_name", "role_code", "client_role_code")
      .where({ client_role_code: userClientCode })
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
