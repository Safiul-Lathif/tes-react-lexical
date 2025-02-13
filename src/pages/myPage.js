// pages/my-page.js
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'; // Import the useRouter hook

const RealtimeEditor = dynamic(() => import('./RealtimeEditor'), {
    ssr: false,
});

const MyPage = () => {
    const router = useRouter();
    const { roomId } = "10"; // Get roomId from query parameter

    // if (!roomId) {
    //     return <div>Loading...or select a document</div>; // Handle no roomId
    // }

    return (
        <div>
            <RealtimeEditor roomId={roomId} /> {/* Pass roomId as a prop */}
        </div>
    );
};

export default MyPage;