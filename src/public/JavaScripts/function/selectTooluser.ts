import knex from "../static/knex";
import addRoleinfo from "./addRoleinfo";
import toSQL from "./toSQL";

function selectTooluser(data: any) {
  return new Promise((resolve, reject) => {
    var q = knex("tool_user")
      .select(
        "name",
        "username",
        "role",
        "user_code",
        "dept_code",
        "post_code",
        "client_role",
        "role_type"
      )
      .where(data)
      .toQuery();
    toSQL(q).then(async (result) => {
      if (result[0]) {
        for (let index = 0; index < result.length; index++) {
          var user = result[index];
          user.role_info = await addRoleinfo(
            user.dept_code,
            user.post_code,
            user.role_type
          );
        }
        resolve(result);
      } else {
        reject("用户不存在");
      }
    });
  });
}

export default selectTooluser;
