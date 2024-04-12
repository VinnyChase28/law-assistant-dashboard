import React from "react";
import MuxPlayer from "@mux/mux-player-react";

interface VideoPlayerProps {
  streamType: "on-demand" | "live";
  playbackId: string;
  metadataVideoTitle?: string;
  metadataViewerUserId?: string;
  primaryColor?: string;
  secondaryColor?: string;
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
    <div className="max-w-screen-3xl mx-auto">
      <MuxPlayer
        streamType={streamType}
        playbackId={playbackId}
        metadata={{
          videoTitle: metadataVideoTitle,
          viewerUserId: metadataViewerUserId,
        }}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </div>
  );
};

export default VideoPlayer;