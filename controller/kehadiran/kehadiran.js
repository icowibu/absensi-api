import util from 'util';
import DBConnection from '../../db/db.js';

export const createKehadiran=async(req,res)=>{
    const body=req.body;
    const q=await util.promisify(DBConnection.query).bind(DBConnection)
    DBConnection.beginTransaction()
    // 1. Ambil Semua user yang belum melakukan absen saja
    let query=`
        SELECT awu.id,user.id AS user_id FROM user
        LEFT JOIN acara_waktu_user AS awu
            ON awu.user_id=user.id AND awu.acara_waktu_id=?
        WHERE user.id IN (?) AND user.deleted_status=0 AND awu.id IS NULL
    `
    let queryRes;

    try{
        queryRes=await q(query,[body.acara_waktu_id,body.user_id.map((data,i)=>data)])
    }catch(err){
        DBConnection.rollback()
        return res.status(500).send({
            status:0,
            data:err,
            message:"ENGGA ADA USERNYA"
        })
    }
    // 2. Create Presensi

    if(queryRes.length == 0){
        DBConnection.commit()
        return res.status(201).send({
            status:0,
            data:[],
            message:"ENGGA ADA HASILNYA"
        })
    }

    let queryData=[]
    for(let data of queryRes){
        queryData.push([
            data.user_id,
            body.acara_waktu_id
        ])
    }
    
    try{
        queryRes=await q(`
            INSERT INTO acara_waktu_user
            (user_id,acara_waktu_id) VALUES ?
        `,[queryData])
    }catch(err){

        DBConnection.rollback()
        return res.status(500).send({
            status:0,
            data:err,
            message:"ENGGA BISA PAS INSERT"
        })
    }

    DBConnection.commit()
    return res.status(201).send({
        status:1,
        data:queryRes
    })
}

export const getKehadiranByAcaraWaktuID=(req,res)=>{
    let query=`
        SELECT awu.*
        FROM acara_waktu_user AS awu
        LEFT JOIN user
            ON user.id=awu.user_id
        WHERE awu.acara_waktu_id=?
    `
    DBConnection.query(query,[req.query.acara_waktu_id],(err,result)=>{
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

export const getBelumHadirByAcaraWaktuID=(req,res)=>{
    let query=`
        SELECT user.*,'false' AS checked
        FROM user AS user
        LEFT JOIN acara_waktu_user AS awu
            ON user.id=awu.user_id AND awu.acara_waktu_id=?
        WHERE awu.id IS NULL
    `
    DBConnection.query(query,[req.query.acara_waktu_id],(err,result)=>{
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
