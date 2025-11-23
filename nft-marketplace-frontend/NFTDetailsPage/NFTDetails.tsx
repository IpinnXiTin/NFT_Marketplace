import React from "react";

//INTERNAL IMPORT
import { NFTDescription, NFTDetailsImg, NFTTabs } from "./NFTDetailsIndex";
import Style from "./NFTDetails.module.css";

interface NFTDetailsPageProps {
  nft: any
}

const NFTDetailsPage: React.FC<NFTDetailsPageProps> = ({nft}) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTDetailsImg nft={nft}/>
        <NFTDescription nft={nft}/>
      </div>
    </div>
  );
};

export default NFTDetailsPage;