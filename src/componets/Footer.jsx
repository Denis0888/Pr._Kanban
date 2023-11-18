import React from "react"
import { useCount } from "../Context"

export default function Footer() {
   const count = useCount()
   
   return (
      <footer>
         <footer className="footer">
            <div className="areaInfo">
                <div className="tasksCount">
                    <div>Active tasks: {count.countActive}</div>
                    <div>Finished tasks: {count.countFinished}</div>
                </div>
                <div>Kanban board 2023</div>
            </div>
        </footer>
      </footer>
   )
}