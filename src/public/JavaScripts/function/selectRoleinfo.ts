import knex from "../static/knex";
import toSQL from "./toSQL";

async function selectRoleinfo(data: any) {
  var t = knex("role_info").select("*").where(data).toQuery();
  return (await toSQL(t))[0];
}

export default selectRoleinfo;
