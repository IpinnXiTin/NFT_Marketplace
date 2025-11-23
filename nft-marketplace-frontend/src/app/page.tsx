"use client";

import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import Style from '../app/styles/page.module.css';
import {
    HeroSection,
    Service,
    BigNFTSlider,
    Subscribe,
    Category,
    Filter,
    Title,
    NFTCard,
    Collection,
    AudioLive,
    FollowerTab,
    Slider,
    Brand,
    Video
} from "../../components/componentsindex";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

export default function Home() {

    const { checkWalletConnection } = useContext(NFTMarketplaceContext);
    const { fetchNFTs } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState<any[]>([]);
    const [nftsCopy, setNftsCopy] = useState<any[]>([]);

    useEffect(() => {
        checkWalletConnection();
        fetchNFTs().then((item: any) => {
            if (item && Array.isArray(item)) {
                setNfts([...item].reverse());
                setNftsCopy(item);
                console.log(item);
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
    return (
        <div className={Style.homePage}>
            <HeroSection />
            <Service />
            <BigNFTSlider />
            <Title
                heading="Audio Collection"
                paragraph="Discover the most outstanding NFTs in all topics of life."
            />
            <AudioLive />

            <FollowerTab />
            <Title
                heading="Explore NFTs Video"
                paragraph="Click on play icon & enjoy NFTs Video."
            />
            <Slider />
            <Title
                heading="New Collection"
                paragraph="Discover the most outstanding NFTs in all topics of life."
            />
            <Collection />
            <Title
                heading="Featured NFTs"
                paragraph="Discover the most outstanding NFTs in all topics of life."
            />
            <Filter />
            <NFTCard NFTData={nfts}/>
            <Title
                heading="Browse by category"
                paragraph="Explore the NFTs in the most featured categories."
            />
            <Category />
            <Subscribe />
            <Brand />
            <Video />
        </div>
    );
}
