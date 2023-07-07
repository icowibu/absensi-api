import Absensi from "../../models/absensiModels.js";
import Anggota from "../../models/anggotaModel.js";

export const getDataKehadiran = async (id) => {
  const idAcara = id;
  Anggota.hasMany(Absensi, { foreignKey: "idAnggota" });
  Absensi.belongsTo(Anggota, { foreignKey: "idAnggota" });

  let response = {};

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

    response = {
      all: countAll,
      alHikmah: countAlHikmah,
      alFatah: countAlFatah,
      giriMekar: countGiriMekar,
      husbil: countHusbil,
    };
  } catch (e) {
    console.log(e.message);
  }

  return response;
};
