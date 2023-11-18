import React from "react"
import UserAvatr from "./UserAvatar"

export default function Header() {
 
   return (
      <header>
         <header className="header">
            <div className="position_logo-user">
                <h1 className="size-logo">Kanban Board</h1>
                <UserAvatr />
            </div>
        </header>
      </header>   
   )
}