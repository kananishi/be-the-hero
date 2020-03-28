const connection = require('../database/connection');
const repository = connection('incidents');

module.exports = {
    async create(request, response){
        let {title, description, value} = request.body;
        const ong_id = request.headers.authorization;
        let [id] = await connection('incidents')
                            .insert({title, description, value, ong_id});
        return response.json({id})
    },
    findAll,
    async delete(request, response){
        const { id } = request.params;
        console.log(id);
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents').where('id', id).select('*').first();
    
        if(incident.ong_id != ong_id){
            return response.status(401)
                            .json({"error":'Operation not permitted'});
        }
    
        await connection('incidents').where('id', id).del() ;
        return response.status(204).send();
    }
};

async function findAll(request, response){
    const [count] = await connection('incidents').count();
    response.header('X-Total-Count', count['count(*)']);

    const {page = 1 } = request.query;
    const incidents = await connection('incidents')
        .join('ongs', 'ong.id','=','incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf');
        
    return response.json(incidents);
};