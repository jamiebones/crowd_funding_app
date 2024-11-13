import {NextApiRequest, NextApiResponse } from "next";
import {fundNode, uploadData } from "../../../../utils/uploadFile";
import { NextResponse, NextRequest } from "next/server";


type Results = {
    transactionIds: string[];
    errors: {fileName: string, errorMessage: string | unknown}[];
};

type Project = {
  markdownContent: string;
  amount: string;
  date: string;
}


export async function POST(req: Request, res: Response) {
        if (req.method === 'POST') {
            const formdata = await req.formData();
            const files = formdata.getAll("files") as File[];
            let project = formdata.get("projectDetails") as string;
            let details: Project = JSON.parse(project) as Project
            console.log(details)
            let results: Results = {
                transactionIds: [],
                errors: []
              };
          
        // Upload each file
    for (const file of files) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const fileBuffer = Buffer.from(arrayBuffer);
          const tags = [ {name: "Content-Type", value: file.type}]
          const transID = await uploadData(fileBuffer, tags);
          console.log(`Transaction ${transID} uploaded`);
          if ( transID ){
            results.transactionIds.push(transID);
          }
  
        } catch (error: any) {
          console.error(`Error uploading file in index ${file.name}:`, error);
        }
      }
      
      let projectData = {
         details: details.markdownContent,
         amount: details.amount,
         date: details.date,
         media: results.transactionIds
      }

      let stringifyData = JSON.stringify(projectData);
      try {
        const transID = await uploadData(stringifyData, null);
        return NextResponse.json(transID, {
          status: 200
        })
      } catch (error: any) {
        console.error(`Error uploading details failed:`, error);
        return NextResponse.json("uploading of project details failed", {
          status: 500
        })
      }
      //res.status(200).json(transID);
    }else {
      return NextResponse.json(
        { error: "Method not allowed" },
        {
          status: 405
        }
      );
    }
    
}