"use client";
import { Room } from "@/app/Room";
import styles from "@/components/Editor.module.css";
import CollaborativeEditor from "@/components/Editor";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import Login from "@/app/pages/login/login";
import ForgetPassword from "@/app/pages/forgetPassword/ForgotPassword";
import GetStartNow from "@/app/pages/getStartNow/GetStartNow";
import SignUp from "@/app/pages/signUp/SignUp";
import ResearchPick from "@/app/pages/home/home";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Learn how to structure your collaborative Next.js app
// https://liveblocks.io/docs/guides/how-to-use-liveblocks-with-nextjs-app-directory

export default function Pages() {
  return (
    <div>
      {/* <div className={styles.container}> */}
        {/* <Login/> */}
        {/* <ForgetPassword/> */}
        {/* <GetStartNow/> */}
        {/* <SignUp/> */}
        <ResearchPick/>
        {/* <div className={styles.editorContainer}>
          <Room>
            <CollaborativeEditor />
          </Room>
        </div> */}
      {/* </div> */}
    </div>
  );
}
