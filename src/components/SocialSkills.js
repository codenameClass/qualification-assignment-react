import React, { useState } from "react";

function SocialSkills() {
  const [skills, setSkills] = useState([]);

  const handleInputChange = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      setSkills((prevState) => [...prevState, value]);
      event.target.value = "";
    }
  };

  const handleAddSkill = (event) => {
    const value = event.target.previousSibling.value;
    setSkills((prevState) => [...prevState, value]);
    event.target.previousSibling.value = "";
  };

  const handleRemove = (indexToRemove) => {
    setSkills((prevState) =>
      prevState.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <section>
      <output>
        {skills.map((skill, index) => (
          <span key={index}>
            <span type="text">{skill}</span>
            <button onClick={() => handleRemove(index)}>X</button>
          </span>
        ))}
      </output>
      <input
        type="text"
        list="social-skills"
        onKeyDown={handleInputChange}
      />
      <button onClick={handleAddSkill}>Add more</button>
      <datalist id="social-skills">
        <option value="social" />
        <option value="fun" />
        <option value="coach" />
      </datalist>
    </section>
  );
}

export default SocialSkills;