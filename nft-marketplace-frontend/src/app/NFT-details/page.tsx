"use client";

import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "next/navigation";

//INTERNAL IMPORT
import { Button, Category, Brand } from "../../../components/componentsindex";
import NFTDetailsPage from "../../../NFTDetailsPage/NFTDetails";

// IMPORT SMART CONTRACT IMPORT DATA
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";
import { image } from "framer-motion/client";

const NFTDetails = () => {
  const { account } = useContext(NFTMarketplaceContext);

  const [nft, setNft] = useState<{
    image: string | null;
    tokenId: string | null;
    name: string | null;
    owner: string | null;
    price: string | null;
    seller: string | null;
    description: string | null;
    tokenURI: string | null;
  }>({
    image: null,
    tokenId: null,
    name: null,
    owner: null,
    price: null,
    seller: null,
    description: null,
    tokenURI: null
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    setNft({
      image: searchParams.get("image"),
      tokenId: searchParams.get("tokenId"),
      name: searchParams.get("name"),
      owner: searchParams.get("owner"),
      price: searchParams.get("price"),
      seller: searchParams.get("seller"),
      description: searchParams.get("description"),
      tokenURI: searchParams.get("tokenURI"),
    });
  }, [searchParams]);
  return (
    <div> 
      <NFTDetailsPage nft={nft} />
      <Category />
      <Brand />
    </div>
  );
};

export default NFTDetails;