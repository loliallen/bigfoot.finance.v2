import React, { HTMLAttributes } from "react";

export type VideoProps = {
  videoSrcURL: string;
  videoTitle?: string;
} & HTMLAttributes<HTMLDivElement>;
export const Video = ({ videoSrcURL, videoTitle, ...rest }: VideoProps) => (
  <div {...rest}>
    <iframe
      src={videoSrcURL}
      title={videoTitle}
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      frameBorder="0"
      allowFullScreen
    />
  </div>
);
