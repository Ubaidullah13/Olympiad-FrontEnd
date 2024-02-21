import React from "react";

function SportsDropDown({ sportsList, onChange }) {
  const handleSelectChange = (event) => {
    const selectedSportId = event.target.value;
    const selectedSport = sportsList.find(
      (sport) => sport.id === selectedSportId
    );
    const isIndividual = selectedSport ? selectedSport.maxPlayer === 1 : false;
    onChange(selectedSportId, isIndividual);
  };

  return (
    <select style={{ marginLeft: "10px" }} onChange={handleSelectChange}>
      {sportsList &&
        sportsList.map((sport) => (
          <option key={sport.id} value={sport.id}>
            {sport.name}
          </option>
        ))}
    </select>
  );
}

export default SportsDropDown;
