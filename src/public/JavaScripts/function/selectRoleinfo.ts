import knex from "../static/knex";
import toSQL from "./toSQL";

async function selectRoleinfo(data: any) {
  var t = knex("role_info")
    .select(
      "role_name",
      "dept_code",
      "dept_name",
      "post_code",
      "post_name1",
      "role_type"
    )
    .where(data)
    .toQuery();
  return await toSQL(t);
}

export default selectRoleinfo;
