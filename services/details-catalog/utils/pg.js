const { Pool } = require('pg');

const cs = process.env.NODE_ENV === 'test' ? process.env.DB_CONNECT_TEST : process.env.DB_CONNECT_DEV;

const switchColumns = (col) => {
  switch (col) {
    case 'Код':
      return 'code';
    case 'Кат.номер':
      return 'category';
    case 'Наименование':
      return 'description';
    case 'Цена':
      return 'price';
    default:
      return col;
  }
};

/**
 * ORM
 * @constructor
 * @param {string} table - Table name.
 */
const pgDb = (table) => {
  const pool = new Pool({
    connectionString: cs,
  });
  return {
    test: async () => {
      const query = `
      CREATE TABLE IF NOT EXISTS ${table}(
        code integer PRIMARY KEY,
        category varchar(256) NOT NULL,
        description varchar(256),
        price float(6) NOT NULL
      )
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

    drop: async () => {
      try {
        return await pool.query(`DROP TABLE ${table}`);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },
    /**
     * SELECT data from the table
     * @constructor
     * @param {Array[String]} fields - array of columns names
     */
    getData: async (fields) => {
      const columns = fields.reduce((a, b) => a.concat(',').concat(b));
      try {
        return await pool.query(`SELECT ${columns} FROM ${table}`);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },

    getDetail: async (id) => {
      try {
        return await pool.query(`SELECT * FROM ${table} WHERE code=${id}`);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },
    /**
     * Insert and update on conflict
     * @constructor
     * @param {Object} data - Data must contains two fields arr - insert array, header - columns
     */
    insert: async (data) => {
      const arr = data.arr.reduce((a, b) => a.concat(b));
      /* eslint-disable */
      const values = data.arr
        .map((a, id) => a.map((el, i) => `$${1 + i + id * a.length}`))
        .map(l => `(${l.reduce((a, b) => a + ',' + b)})`)
        .reduce((a, b) => `${a},${b}`);
      /* elsint-enable */
      const columns = data.header
        .map(switchColumns)
        .reduce((a, b) => a + ',' + b);
      const query = `
        INSERT INTO ${table}(${columns})
        VALUES ${values}
        ON CONFLICT (code) DO UPDATE 
        SET category = excluded.category,
            description = excluded.description,
            price = excluded.price
      `;
      try {
        return await pool.query(query, arr);
      } catch (error) {
        error.status = 400;
        throw error;
      } finally {
        await pool.end();
      }
    },

    search: async (param) => {
      const query = `
        SELECT * FROM ${table}
        WHERE (description LIKE '%${param}%)')
        OR (category LIKE '%${param}%')
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
