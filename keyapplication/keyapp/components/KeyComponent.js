"use client"; 
  
import keyData from '../public/key.json';
import React, { useState } from 'react';


const HistoryComponent = (props) => {

    const { stepHistory } = props;

    let historyOutput = "";
    if(stepHistory.length == 0) {
        historyOutput = "There is no history items"
    } else {
        historyOutput = stepHistory.map((item, index) => (<div key={item.id}>Id is {item.id}</div>))
        historyOutput = <div>History items are:{historyOutput}</div>
    }

    return(
        <div>
            {historyOutput}
        </div>
    )

}

function FindCurrentKeyStepById(idToSet) {
    const foundStep = keyData.find(item => item.id === idToSet);
    //console.log(foundStep);

    return foundStep;
}

function GetFilteredSpeciesForStepAndChildren(currentKeyStepId) {
    // locate the current step in the key data
    // get any species it has
    // check any children for species they have
    // put them in an array
    // return the array

    let currentStep = FindCurrentKeyStepById(currentKeyStepId);
    let foundSpecies = []; //currentStep.options.map((item) => (item.speciesToMoveTo)).filter(item => item);
    if(currentStep) {
        for(let i = 0; i < currentStep.options.length; i++) {
            if(currentStep.options[i].speciesToMoveTo != null) {
                foundSpecies.push(currentStep.options[i].speciesToMoveTo);
            }
            if(currentStep.options[i].idToMoveTo != null) {
                let results = GetFilteredSpeciesForStepAndChildren(currentStep.options[i].idToMoveTo)
                foundSpecies = foundSpecies.concat(results);
            }
        }
    }
    return foundSpecies;
}

const KeyComponent = () => {
    
    const [currentKeyStepId, setCurrentKeyStepId] = useState("1");
    const initialStep = FindCurrentKeyStepById(currentKeyStepId);
    const [currentKeyStep, setCurrentKeyStep] = useState(initialStep);
    const [currentSpecies, setCurrentSpecies] = useState(null);
    const [stepHistory, setStepHistory] = useState([]);
    const [allSpecies, setSpecies] = useState([]);
    const [filteredSpecies, setFilteredSpecies] = useState(GetFilteredSpeciesForStepAndChildren(currentKeyStepId));

    const handle_stepClick = (clickedOption) => {
        console.log(clickedOption)
        console.log("step history is")
        console.log(stepHistory)
        
        if(clickedOption.idToMoveTo!=null) {

            const newStep = FindCurrentKeyStepById(clickedOption.idToMoveTo);
            if(newStep) {
                // put the current step into the history
                setStepHistory(stepHistory => [...stepHistory, currentKeyStep])
                setCurrentKeyStep(newStep);
                setFilteredSpecies(GetFilteredSpeciesForStepAndChildren(newStep.id));
            } else {
                console.log("couldn't find step " + clickedOption.idToMoveTo)
            }
        } else if (clickedOption.speciesToMoveTo) {
            console.log("selected species scientific name is " + clickedOption.speciesToMoveTo)
            //setCurrentSpecies()
        }
    };

    const currestStepOptionsJsx = currentKeyStep ? currentKeyStep.options.map((item, index) => (
        <li key={item.id} onClick={function() { handle_stepClick(item);}}>{item.text}</li> 
    )) : "";

    const welcomeText = "hellofffqd";
    
    return (
      <div>{welcomeText}
        <div>
            <HistoryComponent stepHistory={stepHistory}/>
        </div>
        <div>
            <span>Current step: {currentKeyStep && currentKeyStep.id}</span>
            <div>{currestStepOptionsJsx}
            </div>
        </div>
        <div>
            Filtered species are:
            {filteredSpecies.map((item) => (<div key={item}>{item}</div>))}
        </div>
      </div>
    )
  }
  
export default KeyComponent;
