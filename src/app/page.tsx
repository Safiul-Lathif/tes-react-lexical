import { Room } from "@/app/Room";
import styles from "@/components/Editor.module.css";
import CollaborativeEditor from "@/components/Editor";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import Login from "@/components/login/login";

// Learn how to structure your collaborative Next.js app
// https://liveblocks.io/docs/guides/how-to-use-liveblocks-with-nextjs-app-directory

export default function Page() {
  return (
    <main>
      <div className={styles.container}>
        <Login/>
        {/* <div className={styles.editorContainer}>
          <Room>
            <CollaborativeEditor />
          </Room>
        </div> */}
      </div>
    </main>
  );
}
