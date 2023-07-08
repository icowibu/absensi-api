import Absensi from "../../models/absensiModels.js";
import Acara, { ArsipAcara } from "../../models/acaraModels.js";

export const createAcara = async (req, res) => {
  const { acara, tempat, hari, dari, sampai } = req.body;

  if (
    acara === "" ||
    tempat === "" ||
    hari === "" ||
    sampai === "" ||
    dari === ""
  ) {
    return res
      .status(400)
      .json({ msg: "pastikan kolom telah diisi semuanya !" });
  }

  try {
    // membuat 2 object: acara berisikan informasi detail tentang acara
    await Acara.create({
      acara,
      tempat,
      hari,
      dariJam: dari,
      sampaiJam: sampai,
    });
    res.status(201).json({ msg: "data acara berhasil ditambahkan" });
  } catch (e) {
    console.log(e.message);
  }
};

export const getAcaraById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Acara.findOne({
      where: { id },
    });
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

export const getAllAcara = async (req, res) => {
  try {
    const response = await Acara.findAll();
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

export const getArsipAcara = async (req, res) => {
  try {
    const response = await ArsipAcara.findAll();
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

export const getAcaraSekarang = async (req, res) => {
  const hariIni = new Date();
  const tahun = hariIni.getFullYear();
  const bulan = String(hariIni.getMonth() + 1).padStart(2, "0");
  const tanggal = String(hariIni.getDate()).padStart(2, "0");
  const tanggalString = `${tahun}-${bulan}-${tanggal}`;

  const acaraBerlangsung = (mulaiDari, sampaiJam) => {
    const now = new Date().getHours();
    const mulai = mulaiDari.substring(0, 2);
    const selesai = sampaiJam.substring(0, 2);
    console.log(mulai);
    console.log(selesai);
    console.log(now);
    console.log(now > mulai && now < selesai);
    return now > mulai && now < selesai;
  };

  try {
    const response = await Acara.findAll();
    const acaraHariIni = response.find((item) => item.hari === tanggalString);

    let adaAcaraHariIni;
    let sudahDiMulai;

    if (acaraHariIni === undefined) {
      adaAcaraHariIni = false;
    } else {
      adaAcaraHariIni = true;
      sudahDiMulai = acaraBerlangsung(
        acaraHariIni.dariJam,
        acaraHariIni.sampaiJam
      );
    }

    const temp = {
      adaAcaraHariIni,
      sudahDiMulai,
      idAcara: acaraHariIni.id,
    };
    res.status(200).json(temp);
  } catch (e) {
    console.log(e.message);
  }
};
