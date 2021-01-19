import mysql from "mysql";
import config from "../static/config";

var pool = mysql.createPool(config);
function toSQL(sqlQuery: string): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      connection.query(sqlQuery, (err, result) => {
        if (err) reject(err);
        connection.release();
        resolve(result);
      });
    });
  });
}
export default toSQL;
