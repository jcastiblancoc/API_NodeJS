const createConnection = require('./db');

async function getCategoria() {
  try {
    const connection = await createConnection();
    const [rows, fields] = await connection.execute('SELECT * FROM catergorias');
    console.log(rows);
    return rows;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
}

async function getCategoriaId(id) {
    try {
      const connection = await createConnection();
      const [rows, fields] = await connection.execute('SELECT * FROM catergorias WHERE id = ?', [id] );
      console.log(rows);
      return rows;
    } catch (error) {
      console.error('Error:', error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }


  async function addCategoria(nombre, descripcion, estado) {
    try {
      const connection = await createConnection();
      const [result, _] = await connection.execute('INSERT INTO catergorias (nombre, descripcion, estado) VALUES (?, ?, ?)', [nombre, descripcion, estado]);
      console.log('Inserted category:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  async function updateCategoria(id, updateParams) {
    try {
      const connection = await createConnection();
  
      let query = 'UPDATE catergorias SET ';
      const params = [];
      let i = 0;
  
      for (const key in updateParams) {
        query += `${key} = ?`;
        params.push(updateParams[key]);
        i += 1;
  
        if (i < Object.keys(updateParams).length) {
          query += ', ';
        }
      }
  
      query += ' WHERE id = ?';
      params.push(id);
  
      const [result, _] = await connection.execute(query, params);
      console.log('Updated category:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  

module.exports = {
  getCategoria: getCategoria,
  getCategoriaId: getCategoriaId,
  addCategoria: addCategoria,
  updateCategoria: updateCategoria
};
