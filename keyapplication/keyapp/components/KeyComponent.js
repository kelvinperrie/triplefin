"use client"; 
  
import keyData from '../public/key.json';
import speciesData from '../public/species.json';
import React, { useState } from 'react';
import HistoryComponent from '../components/HistoryComponent';
import FilteredSpeciesComponent from '../components/SpeciesListComponents'
import OptionsDisplayComponent from '../components/OptionsDisplayComponent'



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

function GetSpeciesDataByScientificName(scientificName) {
    //console.log("we're looking for " + scientificName)
    let foundSpecies = speciesData.find((item) => item.scientificName === scientificName);
    if(foundSpecies == null) {
        console.log("this is probably a problem, we couldn't find the species data for the scientific name of " + scientificName)
    }
    return foundSpecies;
}

function GetFilteredSpeciesForStepAndChildren(currentKeyStepId) {
    // locate the current step in the key data
    // get any species it has
    // check any children for species they have
    // get the species data for the item
    // put the species data in an array
    // return the array

    let currentStep = FindCurrentKeyStepById(currentKeyStepId);
    let foundSpecies = []; //currentStep.options.map((item) => (item.speciesToMoveTo)).filter(item => item);
    if(currentStep) {
        for(let i = 0; i < currentStep.options.length; i++) {
            // if there are species to move to then collect information on them
            if(currentStep.options[i].speciesToMoveTo != null) {
                // this is the name of the species, we want to get the full data set for that name
                let foundSpeciesName = currentStep.options[i].speciesToMoveTo;
                let foundSpeciesData = GetSpeciesDataByScientificName(foundSpeciesName);
                if(foundSpeciesData) {
                    foundSpecies.push(foundSpeciesData);
                }
            }
            // if there are more steps to move to then go to them to see if there are any species within them
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


    const welcomeText = "New Zealand Triplefin Identification Guide";
    
    return (
      <div>
        <div className="w-full m-5">
            <div className="text-center w-full  my-4 text-4xl">{welcomeText}</div>
            <div>
                <p>
                Use this website to help identify your triplefin! Select the best option that matches your observation, then new options will be shown and eventually it will be narrowed down to a species.
                </p>
                <p>
                    This key (the questions to help identify the triplefin) was developed by X and taken from XXXXXXX.
                </p>
            </div>
        </div>

        <div className="mx-5 p-5 bg-slate-50 border-t-4 rounded-lg border-accentColour" >
            <OptionsDisplayComponent currentKeyStep={currentKeyStep} handleOptionClick={handle_stepClick}/>
            <div>
                <HistoryComponent stepHistory={stepHistory} currentKeyStep={currentKeyStep} handle_breadcrumbClick={handle_breadcrumbClick}/>
            </div>
            {currentSpecies!= null ? <SelectedSpeciesComponent selectedSpecies={currentSpecies} /> : <FilteredSpeciesComponent filteredSpecies={filteredSpecies} />}
        </div>
      </div>
    )
  }
  
export default KeyComponent;
