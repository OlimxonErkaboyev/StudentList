import React, { useState } from "react";

function MyForm() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected value:", selectedOption);
    // Tanlangan qiymatni boshqa kerakli ishlarni bajarish uchun ishlatishingiz mumkin
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type='radio'
          name='option'
          value='option1'
          checked={selectedOption === "option1"}
          onChange={handleOptionChange}
        />
        Option 1
      </label>
      <label>
        <input
          type='radio'
          name='option'
          value='option2'
          checked={selectedOption === "option2"}
          onChange={handleOptionChange}
        />
        Option 2
      </label>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default MyForm;
