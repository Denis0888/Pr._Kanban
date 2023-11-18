import React, { useState } from "react"
import ArrowUp from "./svg/ArrowUp"
import ArrowDown from "./svg/ArrowDown"
import Rectangle from "./svg/Recrangle"
import UserIcon from "./svg/UserIcon"


export default function UserAvatar() {
   const [isMenuShown, setIsMenuShow] = useState(false)

   return (
      <div className="user-icon" onClick={() => setIsMenuShow(!isMenuShown)}>
         <UserIcon />
         {isMenuShown
            ? <ArrowUp />
            : <ArrowDown />}

         {isMenuShown &&
            <div className="wrapper-menu">
               <Rectangle />
               <div className="menu">
                  <div className="item_1">Profile</div>
                  <div className="item_2">Log Out</div>
               </div>
            </div>
         }
      </div>
   )
}