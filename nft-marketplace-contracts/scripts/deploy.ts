import { ethers } from "hardhat";

async function main() {
  // Lấy contract factory
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");

  // Deploy contract
  const nftMarketplace = await NFTMarketplace.deploy(); 

  // ethers v6: nftMarketplace.target là địa chỉ
  console.log("NFTMarketplace deployed to:", nftMarketplace.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
