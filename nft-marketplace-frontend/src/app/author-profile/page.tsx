"use client";

import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/authorPage.module.css";
import { Banner, NFTCardTwo } from "../../../collectionPage/collectionIndex";
import { Brand, Title } from "../../../components/componentsindex";
import FollowerTabCard from "../../../components/FollowerTab/FollowerTabCard/FollowerTabCard";
import images from "../../../img";
import {
    AuthorProfileCard,
    AuthorTaps,
    AuthorNFTCardBox,
} from "../../../authorPage/authorIndex";

// SMART CONTRACT
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const page = () => {
    const followerArray = [
        {
            background: images.creatorbackground1,
            user: images.user1,
        },
        {
            background: images.creatorbackground2,
            user: images.user2,
        },
        {
            background: images.creatorbackground3,
            user: images.user3,
        },
        {
            background: images.creatorbackground4,
            user: images.user4,
        },
        {
            background: images.creatorbackground5,
            user: images.user5,
        },
        {
            background: images.creatorbackground6,
            user: images.user6,
        },
    ];

    const [collectiables, setCollectiables] = useState(true);
    const [created, setCreated] = useState(false);
    const [like, setLike] = useState(false);
    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);

    const { fetchMyNFTsOrListedNFTs, account } = useContext(NFTMarketplaceContext);

    const [nfts, setNfts] = useState([]);
    const [myNTFs, setMyNFTs] = useState([]);

    useEffect(() => {
        fetchMyNFTsOrListedNFTs("fetchItemsListed").then((items: any) => {
            setNfts(items);
        })
    }, [])

    useEffect(() => {
        fetchMyNFTsOrListedNFTs("fetchMyNFTs").then((items: any) => {
            setMyNFTs(items);
        })
    }, [])

    return (
        <div className={Style.author}>
            <Banner bannerImage={images.creatorbackground2} />
            <AuthorProfileCard account={account } />
            <AuthorTaps
                setCollectiables={setCollectiables}
                setCreated={setCreated}
                setLike={setLike}
                setFollower={setFollower}
                setFollowing={setFollowing}
            />

            <AuthorNFTCardBox
                collectiables={collectiables}
                created={created}
                like={like}
                follower={follower}
                following={following}
                nfts={nfts}
                myNFTs={myNTFs}
            />
            <Title
                heading="Popular Creators"
                paragraph="Click on music icon and enjoy NTF music or audio"
            />
            <div className={Style.author_box}>
                {followerArray.map((el, i) => (
                    <FollowerTabCard key={i + 1} i={i} el={el} />
                ))}
            </div>

            <Brand />
        </div>
    )
}

export default page

