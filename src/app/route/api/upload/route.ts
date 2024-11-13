import {NextApiRequest, NextApiResponse } from "next";
import {fundNode, uploadData } from "../../../../../utils/uploadFile";

type Results = {
    transactionIds: string[];
    errors: {fileName: string, errorMessage: string | unknown}[];
};

//"/api/uploadFile"
export async function POST(req: NextApiRequest, res: NextApiResponse) {
        if (req.method === 'POST') {
            const files = JSON.parse(req.body).files;
            const project = JSON.parse(req.body).projectDetails;
            let results: Results = {
                transactionIds: [],
                errors: []
              };
        // Upload each file
    for (const [index, file] of files.entries()) {
        try {
          const fileBuffer = Buffer.from(file);
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
         details: project.markdownContent,
         amount: project.amount,
         date: project.date,
         media: results.transactionIds
      }

      let stringifyData = JSON.stringify(projectData);
      try {
        const transID = await uploadData(stringifyData, null);
        res.status(200).json(transID);
      } catch (error: any) {
        console.error(`Error uploading details failed:`, error);
        res.status(500).json("uploading of project details failed")
      }
    
      //res.status(200).json(transID);
    }else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    
}