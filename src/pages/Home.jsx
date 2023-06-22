import React, { useEffect, useState } from "react";

//components
import Card from "../components/card/Card";
import DropDown from "../components/drop-down/DropDown";
import Table from "../components/table/Table";

const Home = () => {
  const [data, setData] = useState([]);
  const [city, setCity] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/assets/cityData.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching JSON data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="mt-8 px-4">
      <DropDown data={data} setCity={setCity} />
      {city ? (
        <>
          <Card city={city} />
          <Table city={city} />
        </>
      ) : (
        <div className="text-light text-xl font-medium mt-8">
          Select any city to view the weather
        </div>
      )}
    </main>
  );
};

export default Home;
