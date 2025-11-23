import React from 'react';
import Image from "next/image";
import { MdVerified } from "react-icons/md";

// INTERNAL IMPORT
import Style from './DaysComponent.module.css';
import images from "../../../img";

interface DayComponentProps {
    i: number;
    el: any;
}

const DaysComponent: React.FC<DayComponentProps> = ({i, el}) => {
    return (
        <div className={Style.daysComponent}>
            <div className={Style.daysComponent_box}>
                <div className={Style.daysComponent_box_img}>
                    <Image
                        src={el.background}
                        className={Style.daysComponent_box_img_img}
                        alt="profile background"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div className={Style.daysComponent_box_profile}>
                    <div className={Style.daysComponent_box_profile_item}>
                        <Image
                            src={images.creatorbackground2}
                            alt="profile"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={Style.daysComponent_box_profile_item}>
                        <Image
                            src={images.creatorbackground2}
                            alt="profile"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={Style.daysComponent_box_profile_item}>
                        <Image
                            src={images.creatorbackground2}
                            alt="profile"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>

                <div className={Style.daysComponent_box_title}>
                    <h2>Amazing Collection</h2>
                    <div className={Style.daysComponent_box_title_info}>
                        <div className={Style.daysComponent_box_title_info_profile}>
                            <div className={Style.daysComponent_box_title_info_profile_img}>
                                <Image
                                    src={el.user}
                                    alt="profile"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            <p>
                                Creator
                                <span>
                                    Shoaib Bhai
                                    <small>
                                        <MdVerified />
                                    </small>
                                </span>
                            </p>
                        </div>

                        <div className={Style.daysComponent_box_title_info_price}>
                            <small>1.255 ETH</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DaysComponent