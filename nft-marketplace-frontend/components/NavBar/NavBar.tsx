"use client"

import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { DiJqueryLogo } from "react-icons/di";

// IMPORT ICON
import { MdNotifications } from 'react-icons/md';
import { BsSearch } from 'react-icons/bs';
import { CgMenuLeft, CgMenuRight } from 'react-icons/cg';

// INTERNAL IMPORT
import Style from './NavBar.module.css'
import { Discover, HelpCenter, Notification, Profile } from './index';
import { Button } from "../componentsindex";
import images from "../../img";

// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from '../../context/NFTMarketplaceContext';

const NavBar = () => {

	// USESTATE COMPONENT
	const [discover, setDiscover] = useState(false);
	const [help, setHelp] = useState(false);
	const [notification, setNotification] = useState(false);
	const [profile, setProfile] = useState(false);
	const [openSideMenu, setOpenSideMenu] = useState(false);

	const router = useRouter();

	const openMenu = (e: React.MouseEvent<HTMLParagraphElement>) => {
		const btnText = (e.target as HTMLElement).innerText;
		if (btnText == "Discover") {
			setDiscover(true);
			setHelp(false);
			setNotification(false);
			setProfile(false);
		} else if (btnText == "Help Center") {
			setDiscover(false);
			setHelp(true);
			setNotification(false);
			setProfile(false);
		} else {
			setDiscover(false);
			setHelp(false);
			setNotification(false);
			setProfile(false);
		}
	}

	const openNotification = () => {
		if (!notification) {
			setNotification(true);
			setDiscover(false);
			setHelp(false);
			setProfile(false);
		} else {
			setNotification(false);
		}
	}

	const openProfile = () => {
		if (!profile) {
			setProfile(true);
			setNotification(false);
			setDiscover(false);
			setHelp(false);
		} else {
			setProfile(false);
		}
	}

	const openSideBar = () => {
		if (!openSideMenu) {
			setOpenSideMenu(true);
		} else {
			setOpenSideMenu(false);
		}
	}

	const { account, connectWallet } = useContext(NFTMarketplaceContext);

	return (
		<div className={Style.navbar}>
			<div className={Style.navbar_container}>
				{/* NAVBAR LEFT SECTION */}
				<div className={Style.navbar_container_left}>
					<div className={Style.logo}>
						<DiJqueryLogo size={35} onClick={() => router.push('/')}/>
					</div>
					<div className={Style.navbar_container_left_box_input}>
						<div className={Style.navbar_container_left_box_input_box}>
							<input type="text" placeholder='Search NFT' />
							<BsSearch onClick={() => { }} className={Style.search_icon} />
						</div>
					</div>
					
				</div>

				{/* NAVBAR RIGHT SECTION */}
				<div className={Style.navbar_container_right}>
					{/* DISCOVER MENU */}
					<div className={Style.navbar_container_right_discover}>
						<p onClick={(e) => openMenu(e)}>
							Discover
						</p>
						{discover && (
							<div className={Style.navbar_container_right_discover_box}>
								<Discover />
							</div>
						)}
					</div>

					{/* HELP CENTER MENU */}
					<div className={Style.navbar_container_right_help}>
						<p onClick={(e) => openMenu(e)}>
							Help Center
						</p>
						{help && (
							<div className={Style.navbar_container_right_help_box}>
								<HelpCenter />
							</div>
						)}
					</div>

					{/* NOTIFICATION */}
					<div className={Style.navbar_container_right_notify}>
						<MdNotifications
							className={Style.notify}
							onClick={() => openNotification()}
						/>
						{notification && <Notification />}
					</div>

					{/* CREATE BUTTON SECTION */}
					<div className={Style.navbar_container_right_button}>
						{!account ? (
							<Button btnName="Connect" handleClick={() => { connectWallet() }} />
						) : (
							<Button btnName="Create" handleClick={() => { router.push('/uploadNFT') }} />
						)}
					</div>

					{/* USER PROFILE */}
					<div className={Style.navbar_container_right_profile}>
						<div className={Style.navbar_container_right_profile_box}>
							<Image
								src={images.user1}
								alt="Profile"
								width={40}
								height={40}
								onClick={() => openProfile()}
								className={Style.navbar_container_right_profile_box}
							/>

							{profile && <Profile account={account} />}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavBar
