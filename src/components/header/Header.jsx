import React, { useEffect, useState } from "react";

// library
import moment from "moment";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(moment());

  const currentDate = moment().format("MMM Do YY");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <header className="flex w-full justify-around p-4 bg-secondary text-light items-center gap-2 flex-wrap">
      <div className="font-semibold text-2xl">Hello User!</div>
      <div className="text-left w-40">
        <div className="font-semibold text-2xl"> {currentDate}</div>
        <div className="font-semibold text-2xl pt-1">
          {currentTime.format("LTS")}
        </div>
      </div>
    </header>
  );
};

export default Header;
