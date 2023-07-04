const { pipeline } = require("stream/promises");
const { from, to } = require("pg-copy-streams");

const acquireConnection = async client => client.acquireConnection();

async function copyFrom(sql, src) {
    const con = await acquireConnection(this.client);
    const dest = con.query(from(sql));
    await pipeline(src, dest);
}

async function copyTo(sql, dest) {
    const con = await acquireConnection(this.client);
    const src = con.query(to(sql));
    await pipeline(src, dest);
}

exports.extend = knex => {
    knex.QueryBuilder.extend("copyFrom", copyFrom);
    knex.QueryBuilder.extend("copyTo", copyTo);
};
