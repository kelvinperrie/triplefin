"use client"; 
  
import keyData from '../public/key.json';
import speciesData from '../public/species.json';
import React, { useState } from 'react';


const HistoryComponent = (props) => {

    const { stepHistory, currentKeyStep, handle_breadcrumbClick } = props;

    const currentStepJsx = <span className='breadrumb'>Q{currentKeyStep.id}</span>

    let historyOutput = "";
    historyOutput = stepHistory.map((item, index) => (<a href="" className='breadrumb' onClick={((e) => handle_breadcrumbClick(item, e)) } key={item.id}>Q{item.id}</a>))
    historyOutput = <div className="breadrumbs">Breadcrumbs: {historyOutput}{currentStepJsx}</div>

    return(
        <div>
            {historyOutput}
        </div>
    )

}

const FilteredSpeciesComponent = (props) => {
    const { filteredSpecies } = props;
    //console.log(filteredSpecies);
    return(
        <div>
            Possible species are:
            {filteredSpecies.map((item) => (<div key={item}>{item}</div>))}
        </div>
    )
}
const SelectedSpeciesComponent = (props) => {
    const {selectedSpecies} = props;
    return(
        <div>lets pretend we're showing the species here called {selectedSpecies.scientificName}</div>
    )
}

function FindSpeciesByName(speciesName) {
    const foundSpecies = speciesData.find(item => item.scientificName === speciesName);
    return foundSpecies;
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
    const [filteredSpecies, setFilteredSpecies] = useState(GetFilteredSpeciesForStepAndChildren(currentKeyStepId));

    const handle_breadcrumbClick = (clickedBreadcrumb, event) => {
        event.preventDefault();

        // pop everything out of the history list until we find the clicked one (and pop that too)
        let history = stepHistory;
        let popped = null;
        do {
            popped = history.pop();
        } while (popped.id != clickedBreadcrumb.id)

        setStepHistory(history)
        // set the current species to null
        setCurrentSpecies(null);
        // set the current step to the clicked one
        setCurrentKeyStep(popped);
        // fresh the filtered species
        setFilteredSpecies(GetFilteredSpeciesForStepAndChildren(popped.id));
    }

    const handle_stepClick = (clickedOption) => {
        // console.log(clickedOption)
        // console.log("step history is")
        // console.log(stepHistory)
        
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
            console.log("selected species scientific name is " + clickedOption.speciesToMoveTo);
            let foundSpecies = FindSpeciesByName(clickedOption.speciesToMoveTo);
            if(!foundSpecies) {
                console.log("this is a problem, we couldn't find the species called "+ clickedOption.speciesToMoveTo)
            }
            setCurrentSpecies(foundSpecies);
        }
    };

    const currestStepOptionsJsx = currentKeyStep ? currentKeyStep.options.map((item, index) => (
        <li key={item.id} onClick={function() { handle_stepClick(item);}}>{item.text} (go to Q{item.idToMoveTo})</li> 
    )) : "";

    const welcomeText = "hello everybody, welcome to Mr Fish Website.";
    
    return (
      <div>{welcomeText}
        <div>
            <HistoryComponent stepHistory={stepHistory} currentKeyStep={currentKeyStep} handle_breadcrumbClick={handle_breadcrumbClick}/>
        </div>
        <div>
            {/* <span>Current step: {currentKeyStep && currentKeyStep.id}</span> */}
            Select the option that best refelects your speciem 
            <div>{currestStepOptionsJsx}
            </div>
        </div>
        {currentSpecies!= null ? <SelectedSpeciesComponent selectedSpecies={currentSpecies} /> : <FilteredSpeciesComponent filteredSpecies={filteredSpecies} />}
      </div>
    )
  }
  
export default KeyComponent;
