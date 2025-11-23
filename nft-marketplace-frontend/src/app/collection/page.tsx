"use client";

import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import images from "../../../img";
import {
    Banner,
    CollectionProfile,
    NFTCardTwo,
} from "../../../collectionPage/collectionIndex";
import { Slider, Brand, Filter } from "../../../components/componentsindex";

// IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const page = () => {
    const { fetchNFTs } = useContext(NFTMarketplaceContext);

    const [nfts, setNfts] = useState([]);

    useEffect(() => {
            fetchNFTs().then((items: any) => {
                setNfts(items);
            })
        }, [])
    const collectionArray = [
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
        images.nft_image_3,
        images.nft_image_1,
        images.nft_image_2,
    ];
    return (
        <div>
            <Banner bannerImage={images.creatorbackground1} />
            <CollectionProfile />
            <Filter />
            <NFTCardTwo NFTData={nfts} />

            <Slider />
            <Brand />
        </div>
    )
}

export default page
