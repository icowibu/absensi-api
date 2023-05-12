import Acara from "../../models/acaraModels.js";

export const createAcara = async (req, res) => {
  const { acara, tempat, hari, dari, sampai } = req.body;

  try {
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

export const getAllAcara = async (req, res) => {
  try {
    const response = await Acara.findAll();
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};
