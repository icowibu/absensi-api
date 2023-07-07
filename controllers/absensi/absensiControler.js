import Absensi from "../../models/absensiModels.js";
import Acara, { ArsipAcara } from "../../models/acaraModels.js";
import Anggota from "../../models/anggotaModel.js";

export const getDetailAbsensi = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const anggota = await Anggota.findAll();
  const arrayHadir = await Absensi.findAll({
    where: {
      idAcara: id,
      status: "hadir",
    },
  });

  const arrayIzin = await Absensi.findAll({
    where: {
      idAcara: id,
      status: "izin",
    },
  });

  const pengembalian = anggota
    .filter((i) => i.kelompok === req.params.kel)
    .map((i) => {
      const hadir = arrayHadir.find(
        (idHadir) => idHadir.idAnggota === i.idAnggota
      );
      const izin = arrayIzin.find((idIzin) => idIzin.idAnggota === i.idAnggota);

      let status = "bolos";
      if (hadir) {
        status = "hadir";
      } else if (izin) {
        status = "izin";
      }
      return {
        idAcara: id,
        nama: i.nama,
        kelompok: i.kelompok,
        statusKehadiran: status,
        idAnggota: i.idAnggota,
      };
    });

  res.json(pengembalian);
};

export const getDataKehadiranById = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const anggota = await Anggota.findAll();
  const arrayHadir = await Absensi.findAll({
    where: {
      idAcara: id,
      status: "hadir",
    },
  });

  const arrayIzin = await Absensi.findAll({
    where: {
      idAcara: id,
      status: "izin",
    },
  });

  const pengembalian = anggota.map((i) => {
    const hadir = arrayHadir.find(
      (idHadir) => idHadir.idAnggota === i.idAnggota
    );
    const izin = arrayIzin.find((idIzin) => idIzin.idAnggota === i.idAnggota);

    let status = "bolos";
    if (hadir) {
      status = "hadir";
    } else if (izin) {
      status = "izin";
    }
    return {
      idAcara: id,
      nama: i.nama,
      kelompok: i.kelompok,
      statusKehadiran: status,
      idAnggota: i.idAnggota,
    };
  });

  res.json(pengembalian);
};

export const getDataAbsensi = async (req, res) => {
  try {
    const response = await Absensi.findAll();
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

// memerlukan id acara. fungsinya untuk melihat jumlah orang yang mengikuti acara
export const getJumlahDataKehadiranById = async (req, res) => {
  const idAcara = req.params.id;
  Anggota.hasMany(Absensi, { foreignKey: "idAnggota" });
  Absensi.belongsTo(Anggota, { foreignKey: "idAnggota" });

  const countData = (data) => {
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

    return {
      countAll,
      countAlHikmah,
      countAlFatah,
      countHusbil,
      countGiriMekar,
    };
  };

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

    const jumlahAnggota = {
      alHikmah,
      alFatah,
      husbil,
      giriMekar,
      all,
    };

    const dataHadir = await Absensi.findAll({
      where: { idAcara, status: "hadir" },
      include: [
        {
          model: Anggota,
          attributes: ["kelompok"],
        },
      ],
    });

    const dataIzin = await Absensi.findAll({
      where: { idAcara, status: "izin" },
      include: [
        {
          model: Anggota,
          attributes: ["kelompok"],
        },
      ],
    });

    const hadir = countData(dataHadir);
    const izin = countData(dataIzin);
    const bolos = {
      countAll: jumlahAnggota.all - (hadir.countAll + izin.countAll),
      countAlHikmah:
        jumlahAnggota.alHikmah - (hadir.countAlHikmah + izin.countAlHikmah),
      countAlFatah:
        jumlahAnggota.alFatah - (hadir.countAlFatah + izin.countAlFatah),
      countHusbil:
        jumlahAnggota.husbil - (hadir.countHusbil + izin.countHusbil),
      countGiriMekar:
        jumlahAnggota.giriMekar - (hadir.countGiriMekar + izin.countGiriMekar),
    };

    const response = {
      hadir,
      izin,
      bolos,
    };

    res.status(200).json(response);
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
    console.log(response);
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

export const submitAbsensi = async (req, res) => {
  console.log("mensubmit absensi ...");
  const { acara, kehadiran, idAcara } = req.body;
  console.log(kehadiran);

  // pengecekan (dilakukan supaya tidak terjadi data double)
  try {
    const data = await ArsipAcara.findOne({ where: { idAcara } });
    console.log(data);
    if (data === null) {
      await ArsipAcara.create({ acara, kehadiran, idAcara });
    } else {
      data.acara = acara;
      data.kehadiran = kehadiran;
      await data.save();
    }
    res.status(200).json({ msg: "berhasil mensubmit kehadiran" });
  } catch (error) {
    console.log(error.message);
    res.json({ msg: "gagal mensubmit absensi" });
  }
};
