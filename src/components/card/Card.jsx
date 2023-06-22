import React, { useState, useEffect } from "react";

// library
import moment from "moment";

const Card = ({ city }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dataservice.accuweather.com/currentconditions/v1/${city}?apikey=AKEG8WY0HfGKEfE8hXp6Ebxh5LvAPXhx`
        );
        const jsonData = await response.json();
        setData(jsonData[0]);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };
    fetchData();
  }, [city]);

  return (
    <div className="w-full max-w-sm bg-neutral my-8 m-auto rounded-md p-4">
      <div className="text-left">
        <div className="text-light font-semibold text-xl">Current Weather</div>
        <div>{moment.unix(data?.EpochTime).format("LT")}</div>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center">
          <img
            src={`https://www.accuweather.com/images/weathericons/${data?.WeatherIcon}.svg`}
            width="88"
            height="88"
          />
        </div>
        <div className="text-5xl text-primary">
          {Math.round(data?.Temperature?.Metric.Value)}
          <sup>°</sup> <span className="text-2xl -ml-3">C</span>
        </div>
      </div>
      <div className="text-primary text-2xl font-bold">{data?.WeatherText}</div>
    </div>
  );
};

export default Card;
