import React from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  streamType: "on-demand" | "live"; // You can add more types if needed
  playbackId: string;
  metadataVideoTitle?: string; // Optional prop
  metadataViewerUserId?: string; // Optional prop
  primaryColor?: string; // Optional prop with default value
  secondaryColor?: string; // Optional prop with default value
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  streamType,
  playbackId,
  metadataVideoTitle = "Placeholder (optional)",
  metadataViewerUserId = "Placeholder (optional)",
  primaryColor = "#6366F1",
  secondaryColor = "#000000",
}) => {
  return (
    <MuxPlayer
      streamType={streamType}
      playbackId={playbackId}
      metadataVideoTitle={metadataVideoTitle}
      metadataViewerUserId={metadataViewerUserId}
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
    />
  );
};

export default VideoPlayer;
