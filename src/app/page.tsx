import { Room } from "@/app/Room";
import styles from "@/components/Editor.module.css";
import CollaborativeEditor from "@/components/Editor";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import Login from "@/application/login/login";
import ForgetPassword from "@/application/forgetPassword/ForgotPassword";
import GetStartNow from "@/application/getStartNow/GetStartNow";
import SignUp from "@/application/signUp/SignUp";

// Learn how to structure your collaborative Next.js app
// https://liveblocks.io/docs/guides/how-to-use-liveblocks-with-nextjs-app-directory

export default function Page() {
  return (
    <div>
      {/* <div className={styles.container}> */}
        {/* <Login/> */}
        {/* <ForgetPassword/> */}
        {/* <GetStartNow/> */}
        <SignUp/>
        {/* <div className={styles.editorContainer}>
          <Room>
            <CollaborativeEditor />
          </Room>
        </div> */}
      {/* </div> */}
    </div>
  );
}
