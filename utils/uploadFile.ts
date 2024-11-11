
import { Uploader } from "@irys/upload";
import { Arbitrum } from "@irys/upload-ethereum";

interface Tags {
    tags?: {
        name: string;
        value: string;
    }[];
}
 
const getIrysUploader = async () => {
  const rpcURL = "https://endpoints.omniatech.io/v1/arbitrum/sepolia/public"; 
  const irysUploader = await Uploader(Arbitrum)
    .withWallet(process.env.PRIVATE_KEY)
    .withRpc(rpcURL)
    .devnet();
  return irysUploader;
};


const fundNode = async () => {
    try {
        const irys = await getIrysUploader();
        const fundTx = await irys.fund(irys.utils.toAtomic(0.005));
        console.log(
          `Successfully funded ${irys.utils.fromAtomic(fundTx.quantity)} ${
            irys.token
          }`
        );
      } catch (e) {
        console.log("Error funding node ", e);
      }
}


const uploadData = async (dataToUpload: string, tags: Tags) => {
    const irys = await getIrysUploader();
try {
	const receipt = await irys.upload(dataToUpload, tags);
	console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return receipt.id;
} catch (e) {
	console.log("Error uploading data ", e);
}
}

const uploadFile = async (fileToUpload: string, tags: Tags) => {
    const irys = await getIrysUploader();
try {
	const response = await irys.uploadFile(fileToUpload, tags);
	console.log(`File uploaded ==> https://gateway.irys.xyz/${response.id}`);
    return response.id;
} catch (e) {
	console.log("Error uploading file ", e);
}
}


export { fundNode, uploadData, uploadFile }