/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState } from 'react'

const TriviaOutcome = ({ outcomeID, quizID, quizObject, setQuizObject }) => {

    const [ outcomeObject, setOutcomeObject ] = useState({
        outcomeName: '',
        outcomeBody: '',
        conditionComparator: '>',
        conditionValue: 0,
        quiz: { id: quizID }
    })
    
    const handleHeadlineChange = ( e ) => {
        setOutcomeObject({ ...outcomeObject, outcomeName: e.target.value })
    }

    const handleBodyChange = ( e ) => {
        setOutcomeObject({ ...outcomeObject, outcomeBody: e.target.value })
    }

    const handleComparatorChange = ( e ) => {
        setOutcomeObject({ ...outcomeObject, conditionComparator: e.target.value })
    }

    const handleConditionValueChange = ( e ) => {
        setOutcomeObject({ ...outcomeObject, conditionValue: e.target.value })
    }

    const handleSaveOutcomeClick = () => {
        axios.put(`${process.env.REACT_APP_SERVER_URL}/outcomes/${outcomeID}`, outcomeObject)
            .then( res => setOutcomeObject( res.data ))
        setQuizObject({ ...quizObject, outcomes: [ ...quizObject.outcomes, outcomeObject ] })
    }

    return(
        <div style={{display: 'flex'}} className="outcome-form">
            <input onChange={ handleHeadlineChange } type="text" value={ outcomeObject.outcomeName } placeholder="Outcome headline..."></input>
            <textarea onChange={ handleBodyChange } type="text" value={ outcomeObject.outcomeBody } placeholder="Outcome body..."></textarea>
            <p> if score is </p>
            <select onChange={ handleComparatorChange }>
                <option value=">">greater than</option>
                <option value="<">less than</option>
                <option value="===">equal to</option>
            </select>
            <input onChange={ handleConditionValueChange } value={ outcomeObject.conditionValue } type="number" placeholder="Score..."></input>
            <button onClick={ handleSaveOutcomeClick } type="button">Save Outcome</button>
        </div>
    )
}
export default TriviaOutcome