import ChatsBar from "@/pages/Chat/ChatsBar";
import RootWrapper from "@/pages/Wrappers/Root";

export default function Home() {
  return (
    <RootWrapper>
      <div className="flex w-screen h-screen text-gray-700">
        <ChatsBar />
        <div className="flex flex-col justify-center items-center flex-grow">
          <p>Select a chat to start messeging</p>
        </div>
      </div>
    </RootWrapper>
  );
}
