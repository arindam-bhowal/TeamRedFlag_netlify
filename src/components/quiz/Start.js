import React from 'react'
import styled, { css } from 'styled-components/macro'
import Button from './Button';
import { useNavigate } from "react-router-dom";
import Sidebar from '../sidebar/Sidebar';

const Intro = styled.div`
  margin-top: 8em;
  text-align: center;
`;

const btnCSS = css`
    margin-top: 2em;
`;


const Start = () => {
    let navigate = useNavigate();
 
    return (
        <>
        <Sidebar />
        <Intro>
            <h1>Climate Quiz</h1>
            <h3>Check Your Climate Awareness Score!!</h3>
            <h4>Are you ready to join?</h4>
            <Button onClick={( )=> {navigate(`/startQuiz`)}} css={btnCSS}>Begin</Button>
        </Intro>
        </>
    )
}

export default Start
