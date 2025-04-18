import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { ethers } from "ethers";
import { Web3Provider } from "ethers";
import contractABI from "@/abis/ContractAbi.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = "0x8dc8b7442d4aa2bc8195621446480e1854e953b9";


export default function DemoSection() {

  const sendToBlockchain = async (diagnosis: any) => {
    if (!window.ethereum) {
      alert("Please connect your MetaMask wallet!");
      return;
    }

    try {
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      const tx = await contract.storeDiagnosis(
        diagnosis.image_hash,
        diagnosis.prediction,
        Math.floor(diagnosis.confidence_score * 100), // Convert float to uint8
        diagnosis.model_version,
        diagnosis.diagnosis_by
      );

      await tx.wait();

      console.log("Transaction Hash:", tx.hash);
      alert(`Prediction logged to Blockchain! Tx Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Error sending to blockchain:", error);
      alert("Failed to log prediction on-chain.");
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("No file selected!");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".png")) {
      alert("Only .png files are allowed!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(process.env.REACT_APP_FLASK_API as string, {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      console.log("Prediction received from Flask:", result);
      alert(`Prediction: ${result.prediction} (Confidence: ${result.confidence_score})`);

      sendToBlockchain(result);

    } catch (error) {
      console.error("Error sending file to Flask API:", error);
      alert("Error processing the image.");
    }
  };

  return (
    <section id="demo" className="py-20">
      <div className="container px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Live Demo</h2>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Bloom Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Upload a medical image for analysis
              </p>
              <label htmlFor="file-upload" className="cursor-pointer">
                <input
                  id="file-upload"
                  type="file"
                  accept=".png"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="inline-block px-4 py-2 bg-white text-black rounded-md">
                  Upload Image
                </span>
              </label>
            </div>
            <Button className="w-full mt-4" size="lg">
              Predict & Log to Blockchain
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
