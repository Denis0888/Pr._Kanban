import React, { useState, useContext, useEffect } from "react"
import { nanoid } from "nanoid"

const CountTasksContext = React.createContext()
export const useCount = () => useContext(CountTasksContext)

const MainContext = React.createContext()
export const useMain = () => useContext(MainContext)

export function ContextProvider({ children }) {

   // CountTasksContext 
   // Количество "активных" и "законченых" задач
   const [countActive, setCountActive] = useState(0)
   const [countFinished, setCountFinished] = useState(0)

   const getCount = () => {
      const backlog = tasks.filter(task => task.state === 'backlog').length;
      const ready = tasks.filter(task => task.state === 'ready').length;
      const inProgress = tasks.filter(task => task.state === 'inProgress').length;
      const activeCount = backlog + ready + inProgress
      setCountActive(activeCount)

      const finishedCount = tasks.filter(task => task.state === 'finished').length
      setCountFinished(finishedCount)
   }


   // MainContext
   // информация для создания column
   const [states] = useState([
      { id: 1, name: 'Backlog', state: 'backlog' },
      { id: 2, name: 'Ready', state: 'ready' },
      { id: 3, name: 'In progress', state: 'inProgress' },
      { id: 4, name: 'Finished', state: 'finished' }
   ])

   // const [isLoaded, setIsLoaded] = useState(false)
   const [tasks, setTasks] = useState([])                  // массив с задачами

   useEffect(() => {
      getCount()
   }, [tasks])

   useEffect(() => {
      const tasks = localStorage.getItem('tasks');
      setTasks(JSON.parse(tasks))
   }, [])

   useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks))
   }, [tasks])

   // найти task по id
   const getTaskById = (id) => tasks.find((task) => task.id === id)

   const addTask = (name) => {                           //принимаем в аргумент значение инпута (название задачи) 
      const id = nanoid(10)                              // индивидуальный ID из 10 символов
      const task = {
         id: id,
         name: name,
         state: 'backlog',
         description: ""
      }
      setTasks([...tasks, task])                         //push-им task в основной массив tasks
   };

   //обновление обьекта task 
   const updateTask = (item) => {
      const task = tasks.find((task) => task.id === item?.id);
      if (task !== undefined) {
         task.name = item.name;
         task.description = item.description;
      }
      setTasks([...tasks])
   }

   //удаление обьекта task
   const removeTask = (id) => {
      const task = tasks.find((task) => task.id === id);
      if (task) {
         setTasks([...tasks.filter(item => item.id !== id)])
      }
   };

   //получаем все задачи со своими state-ами (для отрисовки задач в табличках)
   const getTasksByState = (state) => {
      return tasks.filter(task => task.state === state);
   };

   //определяем задачи и перемещаем нужные по стэйтам (для выбора задач в селектах, например из "Backlog" в "Ready")
   const getTasksByExcludedState = (state) => {
      if (state === 'ready') {
         return tasks.filter(task => task.state === 'backlog');
      } else if (state === 'inProgress') {
         return tasks.filter(task => task.state === 'ready');
      } else if (state === 'finished') {
         return tasks.filter(task => task.state === 'inProgress');
      }
   }

   // перемещение task  
   const moveTask = (id, state) => {                         //принимаем значение селекта как id и сам state
      const task = getTaskById(id)                           //tasks.find((task) => task.id === id);
      if (task) {
         task.state = state;
      }
      setTasks([...tasks]);                                  //обновили массив задач
   }

   //определяем какая из кнопок будет disabled
   const toggleDisabled = (state) => {
      if (!getTasksByState('backlog').length && state === 'ready') {
         return true
      } else if (!getTasksByState('ready').length && state === 'inProgress') {
         return true
      } else if (!getTasksByState('inProgress').length && state === 'finished') {
         return true
      } else {
         return false
      }
   }

   return (
      <CountTasksContext.Provider value={{ countActive, countFinished }}>
         <MainContext.Provider value={{
            states,                    
            addTask,                   
            getTasksByState,           
            removeTask,                
            moveTask,                  
            getTasksByExcludedState,   
            updateTask,
            getTaskById,
            toggleDisabled             
         }}>
            {children}
         </MainContext.Provider>
      </CountTasksContext.Provider>
   )
}
