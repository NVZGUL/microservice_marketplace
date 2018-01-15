const { Pool } = require('pg');

const cs = process.env.NODE_ENV === 'test' ? process.env.DB_CONNECT_TEST : process.env.DB_CONNECT_DEV;


const pgDb = (tableName) => {
  const pool = new Pool({
    connectionString: cs,
  });

  /*
  const getShema = async () => {
    const query = `
      SELECT column_name, data_type FROM INFORMATION_SHEMA.COLUMNS
      WHERE TABLE_NAME=${tableName}
    `;
    try {
      return await pool.query(query);
    } catch (error) {
      error.status = 400;
      throw error;
    } finally {
      await pool.end();
    }
  };
  */
  // const columns = getShema().rows[0];

  return {
    test: async () => {
      try {
        return await pool.query('SELECT NOW()');
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },

    // get all data from the table
    getAll: async () => {
      try {
        return await pool.query(`SELECT * FROM ${tableName}`);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },

    getDetail: async (id) => {
      try {
        return await pool.query(`SELECT * FROM ${tableName} WHERE detail_id=${id}`);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },

    insert: async (data) => {
      const query = `
        INSERT INTO ${tableName}(user_id,username,password) 
        VALUES(${data.values}) 
        ON CONFLICT (user_id) DO UPDATE 
        SET username = excluded.username,
            password = excluded.password
      `;
      try {
        return await pool.query(query);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },

    search: async (param) => {
      const query = `
        SELECT * FROM ${tableName}
        WHERE (COLUMN1 LIKE '%${param}%)')
        OR (COLUMN2 LIKE '%${param}%')
      `;
      try {
        return await pool.query(query);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },
  };
};

module.exports = pgDb;
