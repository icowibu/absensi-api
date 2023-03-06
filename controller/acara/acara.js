import DBConnection from "../../db/db.js"

export const getAcara=(req,res)=>{
    return res.status(200).send({
        status:0,
        data:{}
    })
}

export const getAcaraWaktu=(req,res)=>{
    const query=`
        SELECT * FROM acara_waktu ORDER BY id DESC LIMIT 100
    `
    DBConnection.query(query,(err,result)=>{
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

export const getAcaraWaktuByWaktu=(req,res)=>{
    const query=`
        SELECT a.*,aw.waktu_mulai,aw.waktu_selesai FROM acara_waktu AS aw
        LEFT JOIN acara AS a
        ON a.id=aw.acara_id
        WHERE aw.waktu_mulai <= ? AND aw.waktu_selesai >= ?
    `
    DBConnection.query(query,[
        req.query.waktu,
        req.query.waktu
    ],(err,result)=>{
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