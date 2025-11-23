"use client";

import React, { useEffect, useState, useContext } from "react";

// INTERNAL IMPORT
import Style from '../styles/searchPage.module.css';
import { Slider, Brand, Filter } from '../../../components/componentsindex';
import { SearchBar } from '../../../searchPage/searchPageIndex';
import { NFTCardTwo, Banner } from '../../../collectionPage/collectionIndex';
import images from '../../../img';

// SMART CONTRACT IMPORT
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const page = () => {
    const { fetchNFTs } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState<any[]>([]);
    const [nftsCopy, setNftsCopy] = useState<any[]>([]);

    useEffect(() => {
        fetchNFTs().then((item: any) => {
            if (item && Array.isArray(item)) {
                setNfts([...item].reverse());
                setNftsCopy(item);
            } else {
                setNfts([]);
                setNftsCopy([]);
                console.warn("fetchNFTs returned undefined or not an array");
            }
        }).catch((error) => {
            console.error("fetchNFTs error:", error);
            setNfts([]);
            setNftsCopy([]);
        });
    }, []);

    const onHandleSearch = (value: string) => {
        const filteredNFTS = nftsCopy.filter(
            ({ name }: any) => name.toLowerCase().includes(value.toLowerCase())
        );

        setNfts(filteredNFTS);
    }

    const onClearSearch = () => {
        setNfts(nftsCopy); 
    }

    // const collectionArray = [
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3,
    //     images.nft_image_1,
    //     images.nft_image_2,
    //     images.nft_image_3
    // ];
    return (
        <div className={Style.searchPage}>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar
                onHandleSearch={onHandleSearch}
                onClearSearch={onClearSearch} />
            <Filter />
            <NFTCardTwo NFTData={nfts} />
            <Slider />
            <Brand />
        </div>
    )
}

export default page
