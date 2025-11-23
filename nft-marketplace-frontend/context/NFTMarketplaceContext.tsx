"use client";

import React, { useState, useEffect, createContext, ReactNode } from "react";
import { ethers, BrowserProvider } from "ethers";
import axios from "axios";
import { useRouter } from "next/navigation";

// INTERNAL IMPORT
import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

declare global {
  interface Window {
    ethereum?: any;
  }
}

//--- FETCH SMART CONTRACT
const fetchContract = (signerOrProvider: ethers.Signer | ethers.Provider) =>
  new ethers.Contract(NFTMarketplaceAddress, NFTMarketplaceABI, signerOrProvider);

interface INFTMarketplaceContext {
  checkWalletConnection: () => Promise<void>;
  titleData: string;
  contract: ethers.Contract | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
  account: string | null;
  balance: string;
  uploadToIPFS: (file: File) => Promise<string | undefined>;
  createNFT: (name: string, price: string, image: string, description: string) => Promise<void>;
  createSale: (metadataUrl: string, price: string, isReselling?: boolean, tokenId?: string | number) => Promise<void>;
  fetchNFTs: () => Promise<any[]>;
  fetchMyNFTsOrListedNFTs: (type: any) => Promise<any[]>;
  buyNFT: (nft: any) => Promise<void>;
}

export const NFTMarketplaceContext = createContext<INFTMarketplaceContext>({
  checkWalletConnection: async () => { },
  titleData: "",
  contract: null,
  connectWallet: async () => { },
  isConnected: false,
  account: null,
  balance: "0",
  uploadToIPFS: async () => undefined,
  createNFT: async () => { },
  createSale: async () => { },
  fetchNFTs: async () => [],
  fetchMyNFTsOrListedNFTs: async () => [],
  buyNFT: async () => { }
});

interface NFTMarketplaceProviderProps {
  children: ReactNode;
}

export const NFTMarketplaceProvider = ({ children }: NFTMarketplaceProviderProps) => {
  const titleData = "Discover, collect, and sell NFTs";
  const router = useRouter();

  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState("0");

  // --- Pinata
  const PINATA_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2MjAxYTNmNi1jNWZmLTRiNjQtYjMzOC02OGQxM2NlY2U1OGEiLCJlbWFpbCI6InRoYW5ndHJhbjg4MjExMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJGUkExIn0seyJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MSwiaWQiOiJOWUMxIn1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiYTZkZTk4ZTk5ZWEzYTE4YzhiYjIiLCJzY29wZWRLZXlTZWNyZXQiOiJhNTFkMDg3YTAwZWEwNTY4ZGUxMmRhZjI0NWEzZGM2NWVjOWIyZDYwOTU3NDY2MzVlMmJjNjNjYjY0YWE5NWMzIiwiZXhwIjoxNzk1MzM0NzM3fQ.paKtNrMsOjzaz_TxYQ2Od3ClxyNR3xjZjpN6O0cz0Ko";
  const PINATA_GATEWAY = "https://olive-deliberate-octopus-539.mypinata.cloud";

  // --- CONNECT WALLET
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask!");

      const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const connectedContract = fetchContract(signer);
      setContract(connectedContract);

      setAccount(selectedAccount);
      const bal = await provider.getBalance(selectedAccount);
      setBalance(ethers.formatEther(bal));

      setIsConnected(true);
    } catch (error) {
      console.log("Connect wallet error:", error);
      setIsConnected(false);
      setAccount(null);
      setBalance("0");
      setContract(null);
    }
  };

  const checkWalletConnection = async () => {
    if (!window.ethereum) return;
    const accounts = await window.ethereum.request({ method: "eth_accounts" });
    if (accounts.length) await connectWallet();
  };

  useEffect(() => { checkWalletConnection(); }, []);

  // --- UPLOAD FILE TO IPFS
  const uploadToIPFS = async (file: File): Promise<string | undefined> => {
    try {
      if (!file) return;
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload-to-ipfs", { method: "POST", body: formData });
      const data = await res.json();
      return data.url; // luôn là HTTP URL
    } catch (error) {
      console.error("Upload error:", error);
      return undefined;

    }
  };

  // --- CREATE NFT (UPLOAD METADATA + MINT)
  const createNFT = async (name: string, price: string, imageUrl: string, description: string) => {
    if (!name || !price || !imageUrl || !description) return;

    try {
      const metadata = { name, description, image: imageUrl };
      const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadata),
      });

      const json = await res.json();
      if (!json.IpfsHash) return console.error("Pinata metadata upload failed:", json);

      const tokenURI = `${PINATA_GATEWAY}/ipfs/${json.IpfsHash}`;
      console.log("Metadata URL:", tokenURI);

      await createSale(tokenURI, price);
    } catch (error) {
      console.error("Create NFT error:", error);
    }
  };

  // --- CREATE SALE
  const createSale = async (metadataUrl: string, price: string, isReselling = false, tokenId?: string | number) => {
    if (!contract || !account) return;
    try {
      const priceParsed = ethers.parseUnits(price, "ether");
      const listingPrice = await contract.getListingPrice();

      const tx = isReselling && tokenId
        ? await contract.resellToken(tokenId, priceParsed, { value: listingPrice })
        : await contract.createToken(metadataUrl, priceParsed, { value: listingPrice });

      await tx.wait();
      router.push("/search-page");
    } catch (error) {
      console.error("Create Sale error:", error);
    }
  };

  // --- FETCH NFTs
  const fetchNFTs = async (): Promise<any[]> => {
    if (!contract) return [];
    try {
      const data = await contract.fetchMarketItem();
      const nfts = await Promise.all(data.map(async (nft: any) => {
        const tokenId = (nft.tokenId?.toNumber ? nft.tokenId.toNumber() : Number(nft.tokenId));
        let tokenURI = null;
        try {
          tokenURI = await contract.tokenURI(tokenId);
          if (!tokenURI) {
            console.warn(`tokenURI is empty or undefined for tokenId: ${tokenId}`);
            return null;
          }
          if (tokenURI.startsWith("ipfs://")) tokenURI = tokenURI.replace("ipfs://", `${PINATA_GATEWAY}/ipfs/`);
        } catch (err) {
          console.warn(`[WARN] Failed to fetch tokenURI for tokenId ${tokenId}:`, err);
          return null;
        }

        let metadata = null;
        try {
          const response = await axios.get(tokenURI);
          metadata = response.data;
        } catch (err) {
          console.error(`Error fetching metadata from URL ${tokenURI}:`, err);
          return null;
        }

        if (!metadata) {
          console.warn(`Metadata is null for tokenId: ${tokenId}`);
          return null;
        }

        const { name, description, image } = metadata;

        if (!image) {
          console.warn(`Image URL missing in metadata for tokenId: ${tokenId}`);
        }

        let imageUrl = "";
        if (image?.startsWith && image.startsWith("ipfs://")) {
          imageUrl = image.replace("ipfs://", `${PINATA_GATEWAY}/ipfs/`);
        } else {
          imageUrl = image || "";
        }

        const price = ethers.formatUnits(nft.price.toString(), "ether");

        return { tokenId, seller: nft.seller, owner: nft.owner, price, name, description, image: imageUrl, tokenURI };
      }));
      return nfts.filter(item => item !== null);
    } catch (error) {
      console.error("Fetch NFTs error:", error);
      return [];
    }
  };

  const fetchMyNFTsOrListedNFTs = async (type: string): Promise<any[]> => {
    if (!contract) return [];
    try {
      const data = type === "fetchItemsListed" ? await contract.fetchItemsListed() : await contract.fetchMyNFT();
      return await Promise.all(data.map(async (nft: any) => {
        const tokenId = (nft.tokenId?.toNumber ? nft.tokenId.toNumber() : Number(nft.tokenId));
        let tokenURI = await contract.tokenURI(tokenId);
        if (tokenURI.startsWith("ipfs://")) tokenURI = tokenURI.replace("ipfs://", `${PINATA_GATEWAY}/ipfs/`);
        const { data: { name, description, image } } = await axios.get(tokenURI);
        const imageUrl = image.startsWith("ipfs://") ? image.replace("ipfs://", `${PINATA_GATEWAY}/ipfs/`) : image;
        const price = ethers.formatUnits(nft.price.toString(), "ether");
        return { tokenId, seller: nft.seller, owner: nft.owner, price, name, description, image: imageUrl, tokenURI };
      }));
    } catch (error) {
      console.error("Fetch MyNFTs error:", error);
      return [];
    }
  };

  const buyNFT = async (nft: any) => {
    if (!contract) return;
    try {
      const price = ethers.parseUnits(nft.price.toString(), "ether");
      const tx = await contract.createMarketSale(nft.tokenId, { value: price });
      await tx.wait();

      router.push("/author-profile")
    } catch (error) {
      console.error("Buy NFT error:", error);
    }
  };

  return (
    <NFTMarketplaceContext.Provider value={{
      checkWalletConnection,
      titleData,
      contract,
      connectWallet,
      isConnected,
      account,
      balance,
      uploadToIPFS,
      createNFT,
      createSale,
      fetchNFTs,
      fetchMyNFTsOrListedNFTs,
      buyNFT
    }}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
