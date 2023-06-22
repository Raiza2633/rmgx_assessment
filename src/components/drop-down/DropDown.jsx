import React from "react";

const DropDown = ({ data, setCity }) => {
  const handleChange = (e) => {
    setCity(e.target.value);
  };
  return (
    <select
      onChange={handleChange}
      className="border-2 rounded-md p-2 bg-light text-primary cursor-pointer border-neutral w-full max-w-sm"
    >
      <option value="" disabled selected hidden>
        Select a city from the below options
      </option>
      {data.map((item) => (
        <option key={item.Key} value={item.Key}>
          {item.EnglishName}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
