import knex from "../static/knex";
import toSQL from "./toSQL";

function addRoleinfo(deptcode: string, postcode: string, roletype: string) {
  return new Promise((resolve) => {
    var t = knex("role_info")
      .select(
        "role_name",
        "dept_name",
        "post_name1",
        "role_type",
        "dept_code",
        "post_code"
      )
      .where({ dept_code: deptcode, post_code: postcode, role_type: roletype })
      .toQuery();
    toSQL(t).then((result: Array<any>) => {
      if (result[0]) {
        resolve(result[0]);
      } else {
        resolve({
          message: "找不到的岗位信息",
          error_info: {
            dept_code: deptcode,
            post_code: postcode,
            role_type: roletype,
          },
        });
      }
    });
  });
}

export default addRoleinfo;
