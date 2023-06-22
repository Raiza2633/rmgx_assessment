import React, { useState, useEffect } from "react";

// library
import moment from "moment";

//utils
import { convertToCelsius } from "../../utils";

const SingleDay = ({ data }) => {
  return (
    <tr>
      <td className="border-2 border-light text-left p-2">
        <div className="text-lg font-medium">
          {moment.unix(data?.EpochDate).format("MMM Do")}
        </div>
        <div className="text-sm">
          Min: {convertToCelsius(data?.Temperature?.Minimum?.Value)}
          <sup>°</sup> <span className="text-xs">C</span>
        </div>
        <div className="text-sm">
          Max: {convertToCelsius(data?.Temperature?.Maximum?.Value)}
          <sup>°</sup> <span className="text-xs">C</span>
        </div>
      </td>
      <td className="border-2 border-light p-2">
        <img
          src={`https://www.accuweather.com/images/weathericons/${data?.Day?.Icon}.svg`}
          width="48"
          height="48"
          className="m-auto"
        />
        <div className="pt-1 font-medium max-w-[80px] m-auto break-words">
          {data?.Day?.IconPhrase}
        </div>
      </td>
      <td className="border-2 border-light p-2">
        <img
          src={`https://www.accuweather.com/images/weathericons/${data?.Night?.Icon}.svg`}
          width="48"
          height="48"
          className="m-auto"
        />
        <div className="pt-1 font-medium max-w-[80px] m-auto break-words">
          {data?.Night?.IconPhrase}
        </div>
      </td>
    </tr>
  );
};

const Table = ({ city }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=AKEG8WY0HfGKEfE8hXp6Ebxh5LvAPXhx`
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };
    fetchData();
  }, [city]);

  return (
    <>
      <div className="w-full max-w-sm bg-neutral my-8 m-auto rounded-md p-4 text-lg font-medium text-primary">
        {data?.Headline?.Text}
      </div>
      <div className="w-full max-w-sm bg-neutral my-8 m-auto rounded-md p-4">
        <div className="pb-4 text-lg font-semibold">5 Days Forecast data</div>
        <table className="border-2 border-light w-full">
            <tbody>
          <tr>
            <td className="border-2 border-light">Date</td>
            <td className="border-2 border-light">Day</td>
            <td className="border-2 border-light">Night</td>
          </tr>
          {data?.DailyForecasts?.map((item, i) => (
            <SingleDay key={i} data={item} />
          ))}
            </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
