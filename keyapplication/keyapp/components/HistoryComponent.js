// draws breadcrumbs to show links to previous questions answered
const HistoryComponent = (props) => {

    const { stepHistory, currentKeyStep, handle_breadcrumbClick } = props;

    const currentStepJsx = <span className='breadrumb' title="This is the current question">Q{currentKeyStep.id}</span>

    let historyOutput = "";
    historyOutput = stepHistory.map((item, index) => (<span className='breadrumb' title="Click here to return to this question" key={item.id}><a href="" onClick={((e) => handle_breadcrumbClick(item, e)) } >Q{item.id}</a></span>))
    historyOutput = <div className="breadrumbs">Breadcrumbs: {historyOutput}{currentStepJsx}</div>

    return(
        <div>
            {historyOutput}
        </div>
    )

}

export default HistoryComponent;