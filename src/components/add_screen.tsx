// @ts-nocheck  

import { useState } from 'react';
import styled from 'styled-components';

import InputMask from 'react-input-mask';


const AddScreen = (state: any): JSX.Element => {
    state = state.state;
    
    const screenSubmitHandler = (ev: any) => {
        ev.preventDefault();

        state.set((prevState: any) => {
            return {
                ...prevState,
                'isTrackBeingAdded': true
            }
        });
    };

    return(
        <Screen 
            className={state.get.isTrackBeingAdded ? 'loading': ''}
            onSubmit={ev => screenSubmitHandler(ev)}
        >
            <ScreenTitle>Add any video from YouTube to your playlist</ScreenTitle>
            <Cell>
                <Title>Video link</Title>
                <InputMask 
                    placeholder='Required'
                    mask="99m 99s"
                >
                    <Input />
                </InputMask>
            </Cell>
            <Cell>
                <Title>Starting time</Title>
                <Input placeholder='—'></Input>
            </Cell>
            <Cell>
                <Title>Ending time</Title>
                <Input placeholder='—'></Input>
            </Cell>
            <Button>Add to playlist</Button>
        </Screen>
    )
};

const Screen = styled.form`
    height: 100%;
    overflow: scroll;
    padding: 2rem;
    scrollbar-width: none;
    user-select: none;
    transition: 0.2s;

    &.loading {
        opacity: 0.3;
        pointer-events: none;
    }

    &::-webkit-scrollbar {
        width: 0;
    }
`;

const ScreenTitle = styled.p`
    font-family: 'Helios-Ext';
    font-size: 2rem;
    line-height: 2.4rem;
    margin: 0;

    margin-block-end: 2rem;
`;

const Cell = styled.div`
    align-items: center;
    background: white;
    border: solid 0.1rem #DFDFDF;
    display: flex;
    height: 5.3rem;
    margin-inline: -2rem;

    border-inline-start-width: 0;
    border-inline-end-width: 0;

    &:nth-of-type(1) {
        margin-block-end: 1rem;
    }

    &:nth-of-type(2) {
        border-block-end-width: 0;
    }

`;

const Title = styled.p`
    font-family: 'Helios-Bold';
    font-size: 1.6rem;
    margin: 0;
    width: 12rem;

    margin-inline-start: 1.5rem;
`;

const Input = styled.input`
    border: none;
    flex: 1;
    font-family: 'Helios';
    font-size: 1.6rem;
    height: 100%;
    outline: none;
`;

const Button = styled.button`
    background: white;
    border-radius: 0.7rem;
    border: solid 0.1rem rgba(0, 0, 0, 0.10);
    box-shadow: 0px 0.05rem 0.2rem rgba(0, 0, 0, 0.05);
    cursor: pointer;
    display: block;
    font-family: 'Helios';
    font-size: 1.6rem;
    margin-block-start: 2rem;
    margin-inline-start: auto;
    outline: solid 0.2rem rgba(0, 0, 0, 0); 
    padding: 0.5rem 1rem;
    transition: var(--animation);
    width: max-content;

    outline-offset: -0.2rem;

    &:hover {
        outline-offset: 0.2rem;
        outline: solid 0.2rem rgba(0, 0, 0, 0.7); 
    }

    &:active {
        background: black !important;
        box-shadow: none;
        color: white;
        outline-offset: -0.2rem;
    }
`;

export default AddScreen;