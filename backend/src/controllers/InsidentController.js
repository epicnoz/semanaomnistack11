const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('insidents').count();

    response.header('X-Total-Count', count['count(*)']);

    const insidents = await connection('insidents')
      .join('ongs', 'ongs.id', 'insidents.ong_id')
      .limit(5)
      .offset( (page-1) * 5 )
      .select([
      'insidents.*', 
       'ongs.id', 
       'ongs.name', 
       'ongs.email', 
       'ongs.whatsapp', 
       'ongs.city', 
       'ongs.uf'
      ]);
    return response.json(insidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('insidents').insert({
      title, 
      description, 
      value, 
      ong_id,
    });
  
    return response.json({id});
  },

  async delete(request, response) {
    const {id} = request.params;
    const ong_id = request.headers.authorization;

    const insident = await connection('insidents')
     .where("id", id)
     .select('ong_id')
     .first();
    
    if (insident.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted'});
    }

    await connection('insidents')
     .delete()
     .where("id",id);
  
    return response.status(204).send();
  }
};