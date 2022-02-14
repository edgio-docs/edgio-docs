import React, {ReactNode} from 'react';

export interface VideoProps {
  children: string;
}

function Video({children}: VideoProps) {
  return (
    <div className="">
      <iframe
        width={516}
        height={315}
        src={children}
        frameBorder={0}
        allow="picture-in-picture"
        allowFullScreen></iframe>
    </div>
  );
}

Video.displayName = 'Video';

export default Video;
