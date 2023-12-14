import React from "react";

export interface ResultProps {
  [key: string]:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}

const Result: React.FC<ResultProps> = (props) => (
  <div>
    {Object.entries(props).map(([key, value]) => (
      <span key={key}>
        {key.charAt(0) + key.slice(1)}: {value}
      </span>
    ))}
  </div>
);

export default Result;
