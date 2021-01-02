/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TriviaQuestion from './triviaQuestion'
import TriviaOutcome from './triviaOutcome'
import LoadingModal from './loadingModal'

const NewTriviaQuiz = ({ author, id, dbCheck }) =>{

    const [ questionSchema, setQuestionSchema ] = useState({
        questionNumber: 0,
        questionBody: '',
        correctAnswer: false,
        quiz: {},
        answers: []
    })
    const [ outcomeSchema, setOutcomeSchema ] = useState({
        outcomeName: '',
        outcomeBody: '',
        conditionComparator: '',
        conditionValue: null,
        quiz: {}
    })
    const [ questions, setQuestions ] = useState([])
    const [ outcomes, setOutcomes ] = useState([])

    // const [ quizAuthor, setQuizAuthor ] = useState();

    const [ quizID, setQuizID ] = useState()

    // sort asynchronouse user id preventing posting
    const [ quizObject, setQuizObject ] = useState({
        quizName: '',
        quizAuthor: author,
        questions: [],
        outcomes: [],
        user: {
            id
        }
    })
    
    const [ triviaQuizCreated, setTriviaQuizCreated ] = useState( false )
    const [ copiedToClipboard, setCopiedToClipboard ] = useState( false )

    const postQuizToGetID = () => {
        axios.post(`${ process.env.REACT_APP_SERVER_URL }/quizzes`, quizObject)
            .then( res => setQuizID(res.data.id))
            .catch( err => console.log( err ))
    }
    
    useEffect(() => {
        postQuizToGetID()
    }, [])

    const organiseLogic = () => {
        let newOutcomes = [ ...quizObject.outcomes ]
        for( let i = 0; i < newOutcomes.length; i++){
            for( let j = 0; j < newOutcomes.length - i - 1; j++){
                let adjustment = ( x ) => {
                    if( newOutcomes[ x ].conditionComparator === '<'){
                        return( -1 )
                    } else if (
                        newOutcomes[ x ].conditionComparator === '>' ){
                        return( + 1 )
                    } else {
                        return( 0 )
                    }
                }
                if( newOutcomes[ j + 1].conditionValue + adjustment( j + 1) < newOutcomes[ j ].conditionValue + adjustment[ j ] ){
                    [ newOutcomes[ j + 1 ], newOutcomes[ j ]] = [ newOutcomes[ j ], newOutcomes[ j + 1 ]]
                }
            }
            setQuizObject({ ...quizObject, outcomes: newOutcomes })
        }
        console.log( newOutcomes )

    }

    const outcomesToDisplay = outcomes.map(( outcome ) =>{
        return(
            <TriviaOutcome 
                key={ outcome.id } 
                outcomeID={ outcome.id } 
                quizID={ quizID }
                quizObject={ quizObject }
                setQuizObject={ setQuizObject }
                organiseLogic={ organiseLogic }
            />
        )
    })

    const questionsToDisplay = questions.map(( question ) => {
        return(
            <TriviaQuestion 
                key={ question.id } 
                questionId={ question.id } 
                quizID={ quizID } 
                quizObject={ quizObject }
                setQuizObject={ setQuizObject }
            />
        )
    })


    const handleAddQuestionClick = async () =>{
        const prevQuestions = [ ...questions ]
        const newSchemaWithQuizID = { ...questionSchema, quiz: { id: quizID } }
        await axios.post( `${process.env.REACT_APP_SERVER_URL}/questions`, newSchemaWithQuizID )
            .then( res => (prevQuestions.push( {...newSchemaWithQuizID, id: res.data.id } )))
        setQuestions(prevQuestions)
        setQuestionSchema(newSchemaWithQuizID)
    }

    const handleAddOutcomeClick = async () =>{
        const newOutcomes = [ ...outcomes ]
        const newOutcomeSchemaWithQuizID = { ...outcomeSchema, quiz: { id: quizID }}
        await axios.post( `${process.env.REACT_APP_SERVER_URL}/outcomes`, newOutcomeSchemaWithQuizID )
            .then( res => ( newOutcomes.push({ ...newOutcomeSchemaWithQuizID, id: res.data.id })))
        setOutcomes( newOutcomes )
        setOutcomeSchema( newOutcomeSchemaWithQuizID )
    }

    const handleQuizNameChange = (event) => {
        setQuizObject({...quizObject, quizName: event.target.value})
        axios.put(`${process.env.REACT_APP_SERVER_URL}/quizzes/${quizID}`, quizObject)
    }

    const submitQuiz = ( e ) => {
        e.preventDefault()
        axios.put(`${process.env.REACT_APP_SERVER_URL}/quizzes/${quizID}`, quizObject)
        setTriviaQuizCreated( true )
    }

    const handleIframeCopyCode = () =>{
        navigator.clipboard.writeText(
            `<iframe src='${process.env.REACT_APP_WIDGET_URL}quiz/${quizID}' scrolling='disabled'></iframe>`
        )
        setCopiedToClipboard( true )
    }

    return(
        <>
            { dbCheck === true && 
                    <div id="loading-modal-container">
                        <LoadingModal />
                    </div>
            }
            <form onSubmit={ submitQuiz } style={{width: '100%'}}>
                <h1> Let's create a new trivia quiz! </h1>
                <h2>{ quizObject.quizName }</h2>
                <label htmlFor="quiz_name_input"> Quiz title...</label>
                <input required id="quiz_name_input" value={ quizObject.quizName } onChange={ handleQuizNameChange } placeholder="Quiz title..."></input>
                { questions.length === 0 ? null : <h2> Questions </h2> }
                <div id="outcomes-wrapper">
                    { questionsToDisplay }
                </div>
                <h3 style={{ cursor: 'pointer'}} onClick={ handleAddQuestionClick }> Add question <span style={{color: 'red'}} id="add_question">+</span> </h3>
                <hr style={{width: '100%'}}></hr>
                { outcomes.length === 0 ? null : <h2> Outcomes </h2> }
                <div id="outcomes-wrapper">
                    { outcomesToDisplay }
                </div>
                <h3 style={{ cursor: 'pointer'}} onClick={ handleAddOutcomeClick }> Add outcome <span style={{ color: 'red' }} id="add_outcome">+</span> </h3>
                <button type="submit" id="build-quiz"> Build my quiz!</button>
                { triviaQuizCreated && 
                <>
                    <h2> You can find your quiz here: 
                        <br></br>
                        <a style={{ color: 'lightblue', fontWeight: '800'}} href={`${process.env.REACT_APP_WIDGET_URL}quiz/`+ quizID}>here</a>
                    </h2>
                    <div id="iframe-grab">
                        <h3> Get iframe code :</h3>
                        <button onClick={ handleIframeCopyCode } type="button"> { copiedToClipboard ? 'Copied' : 'Copy iframe code to clipboard' } </button>
                    </div>
                </>
                }
                <p> Author: { author }</p>
            </form>
        </>
    )
}
export default NewTriviaQuiz
