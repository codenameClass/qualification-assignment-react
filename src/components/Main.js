import React, {useState} from 'react';
import SocialAccounts from "./SocialAccounts";
import SocialSkills from "./SocialSkills";
import { TextField } from '@mui/material';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './Main.css';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function Main() {

    const [result, setResult] = useState('');

    

    const handleAPIRequest = async (objectInput) => {
        const apiEndpoint = 'https://localhost:7237/people';

        try {
            const response = await axios.post(apiEndpoint, objectInput);

            const createdId = response.data.id;
            const getResult = await axios.get(`${apiEndpoint}/${createdId}/result`, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
            });
            setResult(getResult.data);
        } catch (error) {
            console.error(error);
        }
    };

    const options = ['Facebook', 'Twitter', 'LinkedIn'];
    const socialSkillsOptions = ['social', 'fun', 'coach'];

    const [personInput, setPersonInput] = useState({
        firstName: '',
        lastName: '',
        socialSkills: [],
        socialAccounts: [{type: '', address: ''}]
    });

    const handleInputPersonChange = (updatedPersonInput) => {
        setPersonInput(updatedPersonInput)
    };

    const handleChangeInput = (field, value, index) => {

        setPersonInput(prevInput => {

            return index == null ? ({
                ...prevInput,
                [field]: value
            })
            : (((updatedInput) => {
                updatedInput[index] = {
                    ...updatedInput[index],
                    [field]: value
                };
                return updatedInput;
            })({...prevInput}))
        });
    };


    return (
    <main className="App-main">

        <TextField 
            id="first_name"
            placeholder="Enter firstname..."
            label="FirstName"
            margin="normal"
            variant="standard"
            value={personInput.firstName}
            onChange={(e) => handleChangeInput('firstName', e.target.value)}
            sx={{ width: '50%' }}
            />
        <br />
        <TextField 
            id="last_name"
            placeholder="Enter lastname..."
            label="LastName"
            margin="normal"
            variant="standard"
            value={personInput.lastName}
            onChange={(e) => handleChangeInput('lastName', e.target.value)}
            sx={{ width: '50%' }}
            />

        <SocialSkills
            socialSkillsOptions={socialSkillsOptions}
            onChange = {handleInputPersonChange}
            personInput = {personInput}
        />

        <SocialAccounts 
            socialAccountOptions={options}
            onChange = {handleInputPersonChange}
            personInput = {personInput}
            />

        <br />
        {/*<output>{JSON.stringify(personInput)}</output>*/}
        <Button variant="contained" onClick={(e) => handleAPIRequest(personInput)}>Make API Request</Button>
        {result && <section className="result-container">
            <Card className="card-container" sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                    {result.numberOfVowelsFullName} Vowels, {result.numberOfConstenantsFullName} Constants
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                    {result.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {result.reversedFullName}
                    </Typography>
                    <SyntaxHighlighter language="javascript" style={vs}>
                        {JSON.stringify(result.personObjectInJson, null, 2)}
                    </SyntaxHighlighter>
                </CardContent>
            </Card>
        </section>}
    </main>
    );
  }
  
  export default Main;