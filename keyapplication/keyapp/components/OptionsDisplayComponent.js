
const OptionDisplayComponent = (props) => {
    const { index, currentOption, handleOptionClick } = props;

    const goToQuestionText = currentOption.idToMoveTo ? <span>(go to Q{currentOption.idToMoveTo})</span> : "";

    return (
        <div className="max-w-[300px] mx-5 border-4 border-optionBgColour p-5 cursor-pointer bg-[#fff0ab]" onClick={function() { handleOptionClick(currentOption);}}>
            <div className="">Option {index+1}:</div>
            {currentOption.text} {goToQuestionText}
        </div>
    )
}

const OptionsDisplayComponent = (props) => {
    const { currentKeyStep, handleOptionClick } = props;

    const optionsJsx = currentKeyStep ? currentKeyStep.options.map((option, index) => (
         <OptionDisplayComponent key={index} index={index} currentOption={option} handleOptionClick={handleOptionClick}/>
    )) : "";

    return (
        <div className="text-center ">
            <div className="mb-2 ">
                Click the option that best refelects your specimen:
            </div>
            <div className="flex flex-wrap justify-center">
                {optionsJsx}
            </div>
        </div>
    )


}

export default OptionsDisplayComponent;