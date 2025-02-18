"use client";
import styles from "./page.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import OpenAccountPage from "./pages/OpenAccountPage";
import HomePage from "./pages/HomePage";

export default function Home() {
  return (
    <BrowserRouter>
    <div className={styles.page}>
        <main className={styles.main}>
          <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/open-account" element={<OpenAccountPage />} />
          </Routes>
        </main>
    </div>
    </BrowserRouter>
  );
}
