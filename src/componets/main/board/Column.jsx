import React, { useState } from "react";
import { useMain } from "../../../Context"
import Card from "./Card"

export default function Column({ name, state }) {
   const [isNewTaskInputShown, setIsNewTaskInputShown] = useState(false);
   const [inputCardName, setInputCardName] = useState();

   const [isNewTaskSelectShown, setIsNewTaskSelectShown] = useState(false);
   const [selectedTaskId, setSelectedTaskId] = useState();

   const { addTask, getTasksByState, moveTask, getTasksByExcludedState, toggleDisabled } = useMain()

   const tasks = getTasksByState(state);

   const onInputCard = (e) => {
      setInputCardName(e.target.value);
   }
   return (
      <div className="column">
         <div className="column_header"><h2 className="header_title">{name}</h2></div>
         <div className="wrapper scroll">
            <div className="body">
               {
                  tasks.map((task) => <Card key={task.id} id={task.id} name={task.name} state={task.state} />)
               }
               {isNewTaskInputShown &&
                  <div>
                     <input className="input-task" onInput={onInputCard} />
                  </div>
               }
               {isNewTaskSelectShown &&
                  <select className="select-task" onChange={(e) =>
                     setSelectedTaskId(e.target.value)}
                  >
                     <option>Select task to add in "{name}"</option>
                     {getTasksByExcludedState(state)?.map((task) =>
                        <option key={task.id} value={task.id}>{task.name}</option>
                     )}
                  </select>
               }
            </div>
         </div>
         <div className="column_footer">
            {(!isNewTaskInputShown && !isNewTaskSelectShown) &&
               <button className="button-add" disabled={toggleDisabled(state)} onClick={() => {
                  if (state === 'backlog') {
                     setIsNewTaskInputShown(true)
                  } else {
                     setIsNewTaskSelectShown(true)
                  }
               }}>+ Add card</button>}

            {(isNewTaskInputShown || isNewTaskSelectShown) &&
               <button className="button-sub" onClick={() => {
                  if (state === 'backlog' && inputCardName) {
                     setIsNewTaskInputShown(false);
                     addTask(inputCardName);                  
                     setInputCardName(undefined);
                  } else {
                     setIsNewTaskInputShown(false);
                     setIsNewTaskSelectShown(false);
                     moveTask(selectedTaskId, state);         
                  }
               }}>Submit</button>}

            {(isNewTaskInputShown || isNewTaskSelectShown) &&
               <button className="button-cancel" onClick={() =>
                  state === 'backlog'
                     ? setIsNewTaskInputShown(false)
                     : setIsNewTaskSelectShown(false)
               }>Cancel</button>}
         </div>
      </div>
   )
}