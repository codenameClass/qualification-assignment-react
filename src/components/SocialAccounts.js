import { useState } from 'react';

function SocialAccounts() {
  const [accountInputs, setAccountInputs] = useState([{ social: '', username: '' }]);

  // Function to handle adding a new account input
  const handleAddInput = () => {
    setAccountInputs(prevInputs => [...prevInputs, { social: '', username: '' }]);
  };

  // Function to handle removing an account input
  const handleRemoveInput = (indexToRemove) => {
    setAccountInputs(prevInputs => prevInputs.filter((_, index) => index !== indexToRemove));
  };

  // Function to handle changing the social or username of an account input
  const handleChangeInput = (index, field, value) => {
    setAccountInputs(prevInputs => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index][field] = value;
      return updatedInputs;
    });
  };

  // Function to check if a given social and username are valid (not empty)
  const isValidInput = (input) => {
    return input.social !== '' && input.username !== '';
  };

  // Function to check if all account inputs are valid
  const areInputsValid = () => {
    return accountInputs.every(isValidInput);
  };

  return (
    <div>
      {accountInputs.map((input, index) => (
        <div key={index} className="social-account">
          <label htmlFor={`social-${index}`}>Social:</label>
          <input type="text" id={`social-${index}`} placeholder="Enter one..." value={input.social} onChange={(e) => handleChangeInput(index, 'social', e.target.value)} />
          <br />
          <label htmlFor={`username-${index}`}>Username:</label>
          <input type="text" id={`username-${index}`} placeholder="Enter label..." value={input.username} onChange={(e) => handleChangeInput(index, 'username', e.target.value)} />
          <br />
        </div>
      ))}
      <button onClick={handleAddInput}>Add more</button>
      <br />
      <datalist id="social-accounts">
        <option>Facebook</option>
        <option>Twitter</option>
        <option>LinkedIn</option>
      </datalist>
      {!areInputsValid() && <div className="error-message">All fields are required.</div>}
    </div>
  );
}

export default SocialAccounts;