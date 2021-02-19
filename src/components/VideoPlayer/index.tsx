import React from 'react';

interface VideoPlayerProps {
  videoId: string;
  videoTitle?: string;
  width?: string;
  height?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  videoTitle = 'video',
  width = '560',
  height = '315'
}) => {
  return (
    <iframe
      title={videoTitle}
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default VideoPlayer;
