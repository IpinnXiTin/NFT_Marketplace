import React from "react";
import Image from "next/image";

interface NFTTabsProps {
    dataTab: any,
    icon?: any
}

//INTERNAL IMPORT
import Style from "./NFTTabs.module.css";
const NFTTabs: React.FC<NFTTabsProps> = ({ dataTab, icon }) => {
    return (
        <div className={Style.NFTTabs}>
            {dataTab.map((el: any, i: any) => (
                <div className={Style.NFTTabs_box} key={i + 1}>
                    <Image
                        src={el}
                        alt="profile image"
                        width={40}
                        height={40} 
                        className={Style.NFTTabs_box_img}
                    />
                    <div className={Style.NFTTabs_box_info}>
                        <span>
                            Offer by $770 by <span>Shoaib Bhai</span>
                            {icon}
                        </span>

                        <small>Jun 14 - 4:12 PM</small>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default NFTTabs
