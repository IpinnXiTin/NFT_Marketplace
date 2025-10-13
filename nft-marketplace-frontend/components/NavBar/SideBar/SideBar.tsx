import React from 'react'

interface SideBarProps {
  setOpenSideMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBar: React.FC<SideBarProps> = ({setOpenSideMenu}) => {
  return (
    <div>
      <button onClick={() => setOpenSideMenu(false)}>Close Sidebar</button>
    </div>
  )
}

export default SideBar
