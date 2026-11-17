const BlackSpecialButton = ({ text }) => {
  return (
    <button className="bg-fg-primary relative bg-linear-90 text-bg-primary hover:opacity-85 cursor-pointer py-2 px-4 rounded-4xl">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.2),transparent)]"></div>
      {text}
    </button>
  );
};

export default BlackSpecialButton;
