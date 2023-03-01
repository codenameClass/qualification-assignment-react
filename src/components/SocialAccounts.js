import React from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

function SocialAccounts({socialAccountOptions, personInput, onChange}) {
 
  // Function to handle adding a new account input
  const handleAddInput = () => {
    if (areInputsValid()) {
      onChange(prevInput => {
        const updatedInput = {...prevInput};
        updatedInput.socialAccounts = [...(updatedInput.socialAccounts || []), { type: '', address: '' }];
  
        return updatedInput;
      });
    }
  };

  // Function to handle removing an account input
  const handleRemoveInput = (indexToRemove) => {
    onChange(prevInput => {
      const updatedInput = {...prevInput};
      updatedInput.socialAccounts = (updatedInput.socialAccounts || []).filter((_, index) => index !== indexToRemove);

      return updatedInput;
    });
  };

  // Function to handle changing the social or username of an account input
  const handleChangeInput = (index, field, value) => {

    onChange(prevInput => {
      const updatedInput = {...prevInput};
      updatedInput.socialAccounts[index][field] = value;

      return updatedInput;
    });

  };

  // Function to check if a given social and username are valid (not empty)
  const isValidInput = (input) => {
    return input.type !== '' && input.address !== '';
  };

  // Function to check if all account inputs are valid
  const areInputsValid = () => {
    return personInput.socialAccounts.every(isValidInput);
    //return accountInputs.every(isValidInput);
  };

  return (
    <section>
      {personInput.socialAccounts.map((input, index) => (
        <div key={index} className="social-account">

          <Autocomplete
            freeSolo
            options={socialAccountOptions}
            renderInput={(params) => (
                <TextField
                {...params}
                id={`type-${index}`}
                placeholder="Enter socialmedia..."
                label="Social"
                margin="normal"
                variant="standard"
                value={input.type}
                sx={{ width: '50%' }}
                />
            )}
            onSelect={(e) => handleChangeInput(index, 'type', e.target.value)}
            />
          
          <TextField
                id={`address-${index}`}
                placeholder="Enter username..."
                label="Username"
                margin="normal"
                variant="standard"
                value={input.address}
                onChange={(e) => handleChangeInput(index, 'address', e.target.value)}
                sx={{ width: '50%' }}
                />

          <br/>
          {index !== 0 && (
            <Button variant="outlined" color="secondary" onClick={() => handleRemoveInput(index)}>Remove</Button>
          )}
        </div>
      ))}
      <Button variant="contained" onClick={handleAddInput} disabled={!areInputsValid()}>Add more</Button>
      <br />
      {!areInputsValid() && <div className="error-message">All fields are required.</div>}

    </section>
  );
}

export default SocialAccounts;