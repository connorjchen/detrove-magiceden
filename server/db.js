import mysql from "mysql2";
import dotenv from "dotenv";
import ssh from "ssh2";
import fs from "fs";

dotenv.config();

const dbServer = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

const tunnelConfig = {
  host: process.env.TUNNEL_HOST2,
  port: process.env.TUNNEL_PORT,
  username: process.env.TUNNEL_USERNAME,
  privateKey: fs.readFileSync(process.env.TUNNEL_PRIVATE_KEY),
};

const forwardConfig = {
  srcHost: process.env.FORWARD_SRC_HOST,
  srcPort: process.env.FORWARD_SRC_PORT,
  dstHost: process.env.DB_HOST,
  dstPort: process.env.DB_PORT,
};

const sshClient = new ssh.Client();

const SSHConnection = new Promise((resolve, reject) => {
  sshClient
    .on("ready", () => {
      sshClient.forwardOut(
        forwardConfig.srcHost,
        forwardConfig.srcPort,
        forwardConfig.dstHost,
        forwardConfig.dstPort,
        (err, stream) => {
          if (err) reject(err);

          // create a new DB server object including stream
          const updatedDbServer = {
            ...dbServer,
            stream,
          };
          // connect to mysql
          const connection = mysql.createConnection(updatedDbServer);
          // check for successful connection
          // resolve or reject the Promise accordingly
          connection.connect((error) => {
            if (error) {
              reject(error);
            }
            resolve(connection);
          });
        }
      );
    })
    .connect(tunnelConfig);
});

export const query = async (sqlQuery, params) => {
  const connection = await SSHConnection;

  try {
    const [rows, fields] = await connection.promise().query(sqlQuery, params);
    return rows;
  } catch (error) {
    throw error;
  }
};

export default SSHConnection;
