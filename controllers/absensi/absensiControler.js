import Absensi from "../../models/absensiModels.js";
import Anggota from "../../models/anggotaModel.js";

export const getDataAbsensi = async (req, res) => {
  try {
    const response = await Absensi.findAll();
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

// memerlukan id acara. fungsinya untuk melihat jumlah orang yang mengikuti acara
export const getDataKehadiranKelompok = async (req, res) => {
  const idAcara = req.params.id;
  Anggota.hasMany(Absensi, { foreignKey: "idAnggota" });
  Absensi.belongsTo(Anggota, { foreignKey: "idAnggota" });

  try {
    const data = await Absensi.findAll({
      where: { idAcara, status: "hadir" },
      include: [
        {
          model: Anggota,
          attributes: ["kelompok"],
        },
      ],
    });

    const countAll = data.length;
    const countAlHikmah = data.filter(
      (item) => item.anggotum.kelompok === "al-hikmah"
    ).length;
    const countAlFatah = data.filter(
      (item) => item.anggotum.kelompok === "al-fatah"
    ).length;
    const countHusbil = data.filter(
      (item) => item.anggotum.kelompok === "husbil"
    ).length;
    const countGiriMekar = data.filter(
      (item) => item.anggotum.kelompok === "giri mekar"
    ).length;

    const count = {
      all: countAll,
      alHikmah: countAlHikmah,
      alFatah: countAlFatah,
      giriMekar: countGiriMekar,
      husbil: countHusbil,
    };
    res.status(200).json(count);
  } catch (e) {
    console.log(e.message);
  }
};

export const getDataHadirId = async (req, res) => {
  try {
    const response = await Absensi.findAll({
      where: {
        idAcara: req.params.id,
        status: "hadir",
      },
    });
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

export const getDataIzinId = async (req, res) => {
  try {
    const response = await Absensi.findAll({
      where: {
        idAcara: req.params.id,
        status: "izin",
      },
    });
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

// req.body yang diharapkan = {idAcara: 1, idAnggota: 1, status: hadir}
export const updateAbsensi = async (req, res) => {
  console.log("mengupdate absensi ...");
  const { idAcara, idAnggota, status } = req.body;

  // pengecekan (dilakukan supaya tidak terjadi data double)
  try {
    const anggota = await Absensi.findOne({ where: { idAnggota, idAcara } });
    if (anggota === null) {
      await Absensi.create({ idAcara, idAnggota, status });
    } else {
      anggota.status = status;
      await anggota.save();
    }

    res.status(200).json({ msg: "berhasil menambahkan data" });
  } catch (error) {
    console.log("gagal mengupdate absensi");
  }
};
