import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Countdown = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
    // redirect once count is eqaul to 0;
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="container p-5 text-center">
      <p>Redirecting you in {count} seconds</p>
    </div>
  );
};

export default Countdown;
