import { ethers } from "ethers";
import contractABI from "@/abis/YourContractABI.json";

const sendToBlockchain = async (diagnosis: any) => {
  if (!window.ethereum) {
    alert("Please connect MetaMask!");
    return;
  }

  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "YOUR_DEPLOYED_CONTRACT_ADDRESS",
      contractABI,
      signer
    );

    const tx = await contract.storeDiagnosis(
      diagnosis.image_hash,
      diagnosis.prediction,
      Math.floor(diagnosis.confidence_score * 100), // Assuming float, convert to uint8
      diagnosis.model_version,
      diagnosis.diagnosis_by
    );

    await tx.wait();

    console.log("Transaction Successful:", tx.hash);
    alert(`Prediction logged to blockchain! Tx Hash: ${tx.hash}`);
  } catch (error) {
    console.error("Blockchain transaction failed:", error);
    alert("Failed to log the prediction on-chain.");
  }
};
