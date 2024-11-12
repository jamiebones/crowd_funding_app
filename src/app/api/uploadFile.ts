import {NextApiRequest, NextApiResponse } from "next"

//"/api/uploadFile"
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // This code runs only on the server
    res.status(200).json({ message: "This is server-side only" });
}