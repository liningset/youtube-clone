const VideoPlayer = ({ query }) => {
  return (
    <div className="aspect-video w-full lg:rounded-xl lg:overflow-hidden bg-grey-a8 relative">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${query}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
