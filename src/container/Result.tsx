import React from "react";

/** The Result component is a React functional component that takes a set of dynamic props defined by the ResultProps interface. 
 * It iterates over these props, displaying key-value pairs in a formatted manner within a div. The component is designed to present flexible content, 
 * making it suitable for displaying various types of information in a consistent format. */

// Definition of ResultProps interface to describe the expected props for the Result component
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

// Functional component definition for the Result component
const Result: React.FC<ResultProps> = (props) => (
  <div>
    {Object.entries(props).map(([key, value]) => (
      <span key={key}>
        {key.charAt(0) + key.slice(1)}: {value}
      </span>
    ))}
  </div>
);

// Default export for the Result component
export default Result;
