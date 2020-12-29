/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState } from 'react'
import '../quiz.css'

const TriviaOutcome = ({ outcomeID, quizID, quizObject, setQuizObject }) => {

    const [ outcomeObject, setOutcomeObject ] = useState({
        outcomeName: '',
        outcomeBody: '',
        conditionComparator: '>',
        conditionValue: 0,
        quiz: { id: quizID }
    })
    const [ outcomeDisabled, setOutcomeDisabled ] = useState( false )
    
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

    const handleSaveOutcomeClick = ( e ) => {
        // eslint-disable-next-line no-undef
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/outcomes/${outcomeID}`, outcomeObject)
            .then( res => setOutcomeObject( res.data ))
        setQuizObject({ ...quizObject, outcomes: [ ...quizObject.outcomes, outcomeObject ] })
        let toBeDisabled = document.querySelectorAll(`.disable${outcomeID}`)
        for( let el of toBeDisabled ){
            el.disabled = !el.disabled
        }
        setOutcomeDisabled( !outcomeDisabled )
    }

    return(

        <div onSubmit={ handleSaveOutcomeClick } className="trivia-form">
            <p> If score is </p>
            <select className={ 'disable' + outcomeID } onChange={ handleComparatorChange }>
                <option value=">">greater than</option>
                <option value="<">less than</option>
                <option value="===">equal to</option>
            </select>
            <input required className={ 'disable' + outcomeID } onChange={ handleConditionValueChange } value={ outcomeObject.conditionValue } type="number" placeholder="Score..."></input>
            <input required className={ 'disable' + outcomeID } onChange={ handleHeadlineChange } type="text" value={ outcomeObject.outcomeName } placeholder="Outcome headline... e.g. 'Well done, you absolutely smashed it!'"></input>
            <textarea required className={ 'disable' + outcomeID } onChange={ handleBodyChange } rows="3" type="text" value={ outcomeObject.outcomeBody } placeholder="Outcome body... e.g. 'Better luck next time, you need to work on your trivia 😢"></textarea>
            <button type="submit">{ outcomeDisabled ? 'Edit Outcome' : 'Save Outcome' }</button>
        </div>

    )
}
export default TriviaOutcome