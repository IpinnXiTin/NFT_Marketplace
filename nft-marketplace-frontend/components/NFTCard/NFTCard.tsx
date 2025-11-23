"use client"

import React, { useState, useContext } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./NFTCard.module.css";
import images from "../../img";

interface NFTCardProps {
    NFTData: any
}

const NFTCard: React.FC<NFTCardProps> = ({NFTData}) => {

    // const featureArray = [
    //     images.nft_image_1, 
    //     images.nft_image_2, 
    //     images.nft_image_3,
    //     images.nft_image_1, 
    //     images.nft_image_2, 
    //     images.nft_image_3, 
    //     images.nft_image_1, 
    //     images.nft_image_2, 
    //     images.nft_image_3,  
    // ];

    const [like, setLike] = useState(true);

    const likeNft = () => setLike(!like);

    return (
        <div className={Style.NFTCard}>
            {NFTData.map((el: any, i: any) => (
                <div className={Style.NFTCard_box} key={i + 1}>
                    <div className={Style.NFTCard_box_img}>
                        <Image
                            src={el.image}
                            alt="NFT images"
                            width={500}
                            height={500}
                            className={Style.NFTCard_box_img_img}
                            objectFit="cover"
                        />
                    </div>

                    <div className={Style.NFTCard_box_update}>
                        <div className={Style.NFTCard_box_update_left}>
                            <div
                                className={Style.NFTCard_box_update_left_like}
                                onClick={() => likeNft()}
                            >
                                {like ? (
                                    <AiOutlineHeart />
                                ) : (
                                    <AiFillHeart
                                        className={Style.NFTCard_box_update_left_like_icon}
                                    />
                                )}
                                {""} 22
                            </div>
                        </div>

                        <div className={Style.NFTCard_box_update_right}>
                            <div className={Style.NFTCard_box_update_right_info}>
                                <small>Remaining time</small>
                                <p>3h : 15m : 20s</p>
                            </div>
                        </div>
                    </div>

                    <div className={Style.NFTCard_box_update_details}>
                        <div className={Style.NFTCard_box_update_details_price}>
                            <div className={Style.NFTCard_box_update_details_price_box}>
                                <h4>{el.name}</h4>

                                <div className={Style.NFTCard_box_update_details_price_box_box}>
                                    <div
                                        className={Style.NFTCard_box_update_details_price_box_bid}
                                    >
                                        <small>Current Bid</small>
                                        <p>{el.price}ETH</p>
                                    </div>
                                    <div
                                        className={Style.NFTCard_box_update_details_price_box_stock}
                                    >
                                        <small>61 in stock</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={Style.NFTCard_box_update_details_category}>
                            <BsImages />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NFTCard
