const { Pool } = require('pg');

const cs = process.env.NODE_ENV === 'test' ? process.env.DB_CONNECT_TEST : process.env.DB_CONNECT_DEV;

const pool = new Pool({
  connectionString: cs,
});

// pool.query('CREATE TABLE ')

const pgDb = {
  get: async (tableName) => {
    const res = await pool.query(`SELECT * FROM ${tableName}`);
    await pool.end();
    return res;
  },

  insert: async (data, tableName) => {
    const query = `
      INSERT INTO ${tableName}(user_id,username,password) 
      VALUES(${data.values}) 
      ON CONFLICT (user_id) DO UPDATE 
      SET username = excluded.username,
          password = excluded.password
      RETURNING *
    `;
    const res = await pool.query(query);
    await pool.end();
    return res;
  },
};


module.exports = pgDb;
