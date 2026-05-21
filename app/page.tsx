"use client";
import { useLIFF } from "../providers/liff-providers";
import styles from "./page.module.css";
import Navbar from "../components/navbar";
import StepProgress from "../components/userform/step_progress_1";

export default function Home() {
  const { liff, liffError } = useLIFF();

  return (
    <div>
      <main className={styles.main}>
        <Navbar />
        
      </main>
    </div>
  );
}
