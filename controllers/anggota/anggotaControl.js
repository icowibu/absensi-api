import getAge from "get-age";
import Anggota from "../../models/anggotaModel.js";

export const getAnggota = async (req, res) => {
  try {
    const response = await Anggota.findAll();
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

export const getAmountAnggota = async (req, res) => {
  try {
    const all = await Anggota.count();
    const alHikmah = await Anggota.count({
      where: { kelompok: "al-hikmah" },
    });
    const husbil = await Anggota.count({
      where: { kelompok: "husbil" },
    });
    const alFatah = await Anggota.count({
      where: { kelompok: "al-fatah" },
    });
    const giriMekar = await Anggota.count({
      where: { kelompok: "giri mekar" },
    });
    console.log(all);

    const jumlah = {
      alHikmah,
      alFatah,
      husbil,
      giriMekar,
      all,
    };
    res.status(200).json(jumlah);
  } catch (e) {
    console.log(e.message);
  }
};

export const getAnggotaById = async (req, res) => {
  try {
    const anggota = await Anggota.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (anggota === null)
      return res.status(400).json({ msg: "data bisa ditemukan" });
    res.status(200).json(anggota);
  } catch (e) {
    console.log(e.message);
  }
};

export const createAnggota = async (req, res) => {
  const { nama, noTelp, hobi, kelompok, gender, ttl, status } = req.body;

  let idAnggota = "";
  switch (kelompok) {
    case "al-hikmah":
      idAnggota += "1";
      break;
    case "husbil":
      idAnggota += "2";
      break;
    case "giri mekar":
      idAnggota += "3";
      break;
    case "al-fatah":
      idAnggota += "4";
      break;
  }

  function hashNameTo4DigitNumber(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash += name.charCodeAt(i);
    }
    const fourDigitNumber = hash % 10000;
    return fourDigitNumber.toString().padStart(4, "0");
  }

  const hashName = hashNameTo4DigitNumber(nama);
  console.log(hashName);
  idAnggota += hashName;

  console.log(idAnggota);
  const anggota = {
    nama,
    noTelp,
    hobi,
    kelompok,
    gender,
    ttl,
    idAnggota,
    status,
  };

  if (
    anggota.nama === "" ||
    anggota.noTelp === "" ||
    anggota.hobi === "" ||
    anggota.kelompok === "" ||
    anggota.gender === "" ||
    anggota.ttl === ""
  ) {
    return res.status(400).json({ msg: "harap diisi yg kosongnya" });
  }

  try {
    await Anggota.create(anggota);
    res.status(201).json({ msg: "data anggota berhasil ditambahkan" });
  } catch (e) {
    console.log("gagal menambahkan data anggota");
    res.status(400).json({ msg: e.message });
  }
};

export const updateAnggota = async (req, res) => {
  console.log(req.body);
  try {
    await Anggota.update(req.body, { where: { id: req.params.id } });
    res.status(201).json({ msg: "data anggota berhasil diupdate" });
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteAnggota = async (req, res) => {
  try {
    await Anggota.destroy({ where: { id: req.params.id } });
    res.status(201).json({ msg: "data anggota berhasil dihapus" });
  } catch (e) {
    console.log(e.message);
  }
};
