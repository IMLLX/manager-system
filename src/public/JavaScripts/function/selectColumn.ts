import knex from "../static/knex";
import toSQL from "./toSQL";

async function selectColumn(name: string) {
  if (name) {
    var rest = "";
    if (name === "dept_name") rest = "dept_code";
    if (name === "post_name1") rest = "post_code";
    if (name === "role_name") rest = "client_role_code";
    var t = knex("role_info").distinct(name, rest).toQuery();
    return await toSQL(t);
  }
  return "BAD_REQUEST"
}

export default selectColumn;
