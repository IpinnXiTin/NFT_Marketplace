"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from "axios";
import Image from 'next/image';

// INTERNAL IMPORT
import Style from "../styles/resellToken.module.css";
import formStyle from "../../../accountPage/Form/Form.module.css";
import { Button } from "../../../components/componentsindex";

// IMPORT SMART CONTRACT DATA
import { NFTMarketplaceContext } from "../../../context/NFTMarketplaceContext";

const page = () => {

    const { createSale } = useContext(NFTMarketplaceContext);
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");

    const router = useRouter();

    const searchParams = useSearchParams();

    const id = searchParams.get("id");
    const tokenURI = searchParams.get("tokenURI");

    const fetchNFT = async () => {
        if (!tokenURI) return;

        const { data } = await axios.get(tokenURI);

        setPrice(data.price);
        setImage(data.image);
    }

    useEffect(() => {
        fetchNFT()
    }, [id])

    const resell = async () => {
        try {
            if (!tokenURI || !id) {
                console.error("Missing tokenURI or id");
                return;
            }
            await createSale(tokenURI, price, true, id);
            router.push('author-profile')
        } catch (error) {
            console.log("Error while resell", error);
        }
    }
    return (
        <div className={Style.reSellToken}>
            <div className={Style.reSellToken_box}>
                <h1>ReSell Your Token, Set Price</h1>
                <div className={formStyle.Form_box_input}>
                    <label htmlFor="name">Price</label>
                    <input
                        type="number"
                        min={1}
                        placeholder="reSell price"
                        className={formStyle.Form_box_input_userName}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div className={Style.reSellToken_box_image}>
                    {
                        image &&
                        <Image
                            src={image}
                            alt='resell nft'
                            width={400}
                            height={400}
                        />
                    }
                </div>

                <div className={Style.reSellToken_box_btn}>
                    <Button btnName='Resell NFT' handleClick={() => resell()}></Button>
                </div>
            </div>
        </div>
    )
}

export default page
