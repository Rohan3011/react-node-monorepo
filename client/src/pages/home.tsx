import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { counterState, squaredState } from "@/atoms/example";

const HomePage: React.FC = () => {
  const [counter, setCounter] = useRecoilState(counterState);
  const squared = useRecoilValue(squaredState);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h1 className="font-bold text-4xl">Home Page</h1>
      <button onClick={() => setCounter((prev) => prev + 1)}>+</button>
      <span>Count : {counter}</span>
      <span> Squared : {squared}</span>
      <button onClick={() => setCounter((prev) => prev - 1)}>-</button>
    </div>
  );
};

export default HomePage;
