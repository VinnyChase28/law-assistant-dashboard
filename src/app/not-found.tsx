"use client";

import { useEffect } from "react";


interface NotFoundStateProps {
  error: Error;
}

const NotFound: React.FC<NotFoundStateProps> = ({ error }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return <div></div>;
};

export default NotFound;
