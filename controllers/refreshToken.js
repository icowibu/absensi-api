import Admin from "../models/adminModels";
import jwt from "jsonwebtoken"

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus()
    } catch (error) {

    }
}