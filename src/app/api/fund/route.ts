import {NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {fundNode} from "../../../utils/uploadFile";



//"/api/fund"
export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await fundNode();
    return NextResponse.json("Node Funded", {
        status: 200,
      });
}