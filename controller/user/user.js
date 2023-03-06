import DBConnection from "../../db/db"

export const getUserByKelompokID=(req,res)=>{
    let query=`
        SELECT * FROM user
        WHERE kelompok_id=? AND is_active=1
    `
    DBConnection.query(query,[req.query.kelompok_id],(err,result)=>{
        if(err){
            return res.status(500).send({
                status:0,
                data:err
            })
        }
        return res.status(200).send({
            status:1,
            data:result
        })
    })
}

