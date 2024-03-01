const SpeciesPreviewComponent = (props) => {
    const { speciesData } = props;
    return (
        <div className="species-preview">
            <img className="species-image" src={"images/"+speciesData.images[0].fileName} />
            <div>{speciesData.scientificName}</div>
        </div>
    )
}

const FilteredSpeciesComponent = (props) => {
    const { filteredSpecies } = props;
    //console.log(filteredSpecies);
    return(
        <div>
            Based on the questions you've answered so far your possible species are:
            <div className="species-preview-container">
                {filteredSpecies.map((item) => (<SpeciesPreviewComponent key={item.scientificName} speciesData={item} />))}
            </div>
        </div>
    )
}

export default FilteredSpeciesComponent