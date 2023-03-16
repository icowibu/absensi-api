import getAge from "get-age";
import Anggota from "../../models/anggotaModel.js";


export const getAnggota = async (req, res) => {
    try {
        const response = await Anggota.findAll()
        res.status(200).json(response)
    } catch (e) {
        console.log(e.message)
    }
}

export const getAnggotaById = async (req, res) => {
    try {
        const anggota = await Anggota.findOne({
            where: {
                id: req.params.id
            }
        })
        if (anggota === null) return res.status(400).json({ msg: "data bisa ditemukan" })
        res.status(200).json(anggota)
    } catch (e) {
        console.log(e.message)
    }
}

export const createAnggota = async (req, res) => {
    const { nama, noTelp, hobi, kelompok, gender, ttl } = req.body

    const umur = getAge(ttl)
    const anggota = {
        nama, noTelp, hobi, kelompok, gender, ttl, umur
    }

    try {
        await Anggota.create(anggota)
        res.status(201).json({ msg: "data anggota berhasil ditambahkan" })
    } catch (e) {
        console.log(e.message)
    }
}

export const updateAnggota = async (req, res) => {
    console.log(req.body)
    try {
        await Anggota.update(req.body, { where: { id: req.params.id } })
        res.status(201).json({ msg: "data anggota berhasil diupdate" })
    } catch (e) {
        console.log(e.message)
    }
}

export const deleteAnggota = async (req, res) => {
    try {
        await Anggota.destroy({ where: { id: req.params.id } })
        res.status(201).json({ msg: "data anggota berhasil dihapus" })
    } catch (e) {
        console.log(e.message)
    }
} 