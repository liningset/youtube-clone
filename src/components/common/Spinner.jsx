import LoadingImage from "/src/assets/Loading_icon_cropped.gif";

const Spinner = () => {
  return (
    <div className="self-center">
      <img className="w-8" src={LoadingImage} alt="Loading..." />
    </div>
  );
};

export default Spinner;
