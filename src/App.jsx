import React from "react";
import { Routes, Route } from "react-router-dom"
import {ContextProvider} from "./Context";
import Header from "./componets/header/Header"
import Footer from "./componets/Footer"
import Board from "./componets/main/board/Board"
import CardDetail from "./componets/main/card-detail/CardDetail"

export default function App() {
   
   return (
      <div className="app">
         <ContextProvider>
            <Header />
            <main>
               <Routes>
                  <Route path="/" element={<Board />} />
                  <Route path="/tasks/:cardId" element={<CardDetail />} />
               </Routes>
            </main>
            <Footer />
         </ContextProvider>
      </div>
   )
}