const TypeNewChat = () => {
  return (
    <div className="flex w-full flex-col gap-2 p-4">
      <button className="bg-grey-e8 hover:bg-grey-d8 cursor-pointer rounded-2xl px-4 py-2 text-sm font-medium">
        Sign in to chat
      </button>
      <span className="text-center text-xs opacity-85">
        All messages you send will appear publicly
      </span>
    </div>
  );
};

export default TypeNewChat;
