import React, { useState } from "react";
import { Chip, Autocomplete, TextField } from "@mui/material";

function SocialSkillsTest({ socialSkillsOptions, personInput, onChange }) {
  const [currentSkill, setCurrentSkill] = useState("");

  const handleInputChange = (event) => {
    setCurrentSkill(event.target.value);
  };

  const handleInputKeydown = (event) => {
    if (event.key !== "Enter") return;

    const value = event.target.value;

    if (value === "") return;

    onChange((prevState) => {
      const newSkillsSet = new Set([...prevState.socialSkills, value]);
      const newSkillsArray = Array.from(newSkillsSet);
      return {
        ...prevState,
        socialSkills: newSkillsArray,
      };
    });

    setCurrentSkill("");

  };

  const handleRemove = (indexToRemove) => {
    onChange((prevState) => ({
      ...prevState,
      ...{
        socialSkills: prevState.socialSkills.filter(
          (_, index) => index !== indexToRemove
        ),
      },
    }));
  };

  return (
    <section>
      <output>
        {personInput.socialSkills.map((skill, index) => (
          <span key={index}>
            <Chip
              variant="outlined"
              label={skill}
              onDelete={() => handleRemove(index)}
            />
          </span>
        ))}
      </output>

      <Autocomplete
        freeSolo
        options={socialSkillsOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            id="skills"
            placeholder="Enter skills..."
            label="Skills"
            margin="normal"
            variant="standard"
            sx={{ width: "50%" }}
            value={currentSkill}
            onChange={handleInputChange}
            onKeyDown={handleInputKeydown}
          />
        )}
      />
    </section>
  );
}

export default SocialSkillsTest;