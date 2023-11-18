import React, { useEffect } from "react"
import { useMain } from "../../../Context"
import Column from "./Column"

export default function Board() {
   const { states } = useMain()

   return (
      <div className="board">
         {states.map((state) => <Column key={state.id} id={state.id} name={state.name} state={state.state} />)}
      </div>
   )
}