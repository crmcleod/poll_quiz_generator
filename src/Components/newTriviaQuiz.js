/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import TriviaQuestion from './triviaQuestion'
import TriviaOutcome from './triviaOutcome'
import LoadingModal from './loadingModal'
import { Helmet } from 'react-helmet-async'
import { Prompt } from 'react-router-dom'

const NewTriviaQuiz = ({ author, id, dbCheck, existingQuiz, existingQuizID }) =>{

    const [ questionSchema, setQuestionSchema ] = useState({
        questionNumber: 0,
        questionBody: '',
        correctAnswer: '',
        quiz: {},
        answers: [],
        imgID: 0,
        backgroundColour: '182, 206, 240, 1',
        croppedHeight: 0,
        croppedWidth: 0,
        croppedX: 0,
        croppedY: 0
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
    const [ quizID, setQuizID ] = useState()
    const [ quizObject, setQuizObject ] = useState({
        quizName: '',
        quizAuthor: '',
        questions: [],
        outcomes: [],
        user: {
            id
        }
    })

    const [ triviaQuizCreated, setTriviaQuizCreated ] = useState( false )
    const [ existingQuizAltered, setExistingQuizAltered ] = useState( false )
    const [ copiedToClipboard, setCopiedToClipboard ] = useState( false )

    const postQuizToGetID = () => {
        axios.post( `${ process.env.REACT_APP_SERVER_URL }/quizzes`, quizObject )
            .then( res => setQuizID(res.data.id))
            .catch( err => console.error( err ))
    }

    const fetchExistingQuiz = ( id ) => {
        axios.get( `${ process.env.REACT_APP_SERVER_URL }/quizzes/${id}`)
            .then( res => {
                setQuizObject({ ...res.data, quizAuthor: res.data.user.firstName })
                setQuestions( res.data.questions)
                setOutcomes( res.data.outcomes )
                setQuizID( id )
            })
            .catch( err => console.error( err ))
    }
    
    const quizIDRef = useRef()
    const quizNameRef = useRef()
    const quizQuestionsRef = useRef()
    const quizOutcomesRef = useRef()

    useEffect(() => {
        quizIDRef.current = quizID
        quizNameRef.current = quizObject.quizName
        quizQuestionsRef.current = quizObject.questions
        quizOutcomesRef.current = quizObject.outcomes
    }, [ quizID, quizObject ])

    useEffect(() => {
        { existingQuiz ? fetchExistingQuiz( existingQuizID ) : postQuizToGetID() }
        setQuizObject({ ...quizObject, quizAuthor: author })
        return () => {
            if( (!quizNameRef.current || quizQuestionsRef.current.length === 0 || quizOutcomesRef.current.length === 0 ) && !existingQuiz ){
                axios.delete( `${ process.env.REACT_APP_SERVER_URL }/quizzes/${ quizIDRef.current }` )
                    .then( res => res )
                    .catch( err => console.error( err ))
            }
        }
    }, [])

    const organiseLogic = () => {
        let prevOutcomes = [ ...quizObject.outcomes ]
        let newOutcomes = prevOutcomes.map(( outcome ) => { return { ...outcome, quiz: { id: quizID }}})
        for( let i = 0; i < newOutcomes.length; i++ ){
            for( let j = 0; j < newOutcomes.length - i - 1; j++ ){
                let adjustment = ( x ) => {
                    if( newOutcomes[ x ].conditionComparator === '<' ){
                        return( -1 )
                    } else if (
                        newOutcomes[ x ].conditionComparator === '>' ){
                        return( + 1 )
                    } else {
                        return( 0 )
                    }
                }
                if( newOutcomes[ j + 1 ].conditionValue + adjustment( j + 1 ) < newOutcomes[ j ].conditionValue + adjustment[ j ] ){
                    [ newOutcomes[ j + 1 ], newOutcomes[ j ]] = [ newOutcomes[ j ], newOutcomes[ j + 1 ]]
                }
            }
            setQuizObject({ ...quizObject, outcomes: newOutcomes })
        }

    }

    const handleFinishExistingQuiz = () => {
        organiseLogic()
        axios.put( `${ process.env.REACT_APP_SERVER_URL}/quizzes/${ quizID }`, { id: quizID, outcomes: quizObject.outcomes, quizAuthor: author, quizName: quizObject.quizName })
        setExistingQuizAltered( true )
    }
    const deleteOutcome = ( index ) => {
        const newOutcomes = [ ...outcomes ]
        newOutcomes.splice( index, 1 )
        setOutcomes( newOutcomes )
    }

    const deleteQuestion = ( index ) => {
        const newQuestions = [ ...questions ]
        newQuestions.splice( index, 1 )
        setQuestions( newQuestions )
    }

    const outcomesToDisplay = outcomes.map(( outcome, index ) =>{
        return(
            <TriviaOutcome 
                key={ outcome.id } 
                outcomeID={ outcome.id } 
                quizID={ quizID }
                quizObject={ quizObject }
                setQuizObject={ setQuizObject }
                organiseLogic={ organiseLogic }
                index={ index }
                deleteOutcome={ deleteOutcome }
                existingQuiz={ existingQuiz }
                existingQuizID={ existingQuizID }
                outcome={ outcomes[ index ]}
            />
        )
    })

    const questionsToDisplay = questions.map(( question, index ) => {
        return(
            <TriviaQuestion 
                key={ question.id } 
                questionId={ question.id } 
                quizID={ quizID } 
                quizObject={ quizObject }
                setQuizObject={ setQuizObject }
                questionNumber={ index + 1}
                index={ index }
                deleteQuestion={ deleteQuestion }
                existingQuiz={ existingQuiz }
                existingQuizID={ existingQuizID }
                question={ questions[ index ] }
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
        setQuizObject({ ...quizObject, quizName: event.target.value})
        axios.put(`${process.env.REACT_APP_SERVER_URL}/quizzes/${quizID}`, { quizName: event.target.value })
            .catch( err => console.error( err ))
    }

    const submitQuiz = ( e ) => {
        e.preventDefault()
        if ( quizObject.questions.length < 1 || quizObject.outcomes.length < 1){
            // add custom alert modal
            alert('Your quiz must contain both questions and outcomes, please add at least 1 question and 1 outcome')
        } else {
            let created = false
            if( quizObject.questions.length > 1) {
                for( let i = 0; i < quizObject.questions.length; i++){
                    for( let j = i + 1; j < quizObject.questions.length; j++){
                        if( quizObject.questions[i].questionNumber == quizObject.questions[j].questionNumber ){
                            // add custom alert modal
                            return alert( 'Question numbers should be unique, please adjust and try submitting again' )
                        } else {
                            created = true
                        }
                    }
                }
            } else {
                created = true
            }
            if( created ){
                axios.put(`${process.env.REACT_APP_SERVER_URL}/quizzes/${quizID}`, { quizName: quizObject.quizName, quizAuthor: author})
                    .then( res => console.log( res ))
                    .catch( err => console.error( err ))
                setTriviaQuizCreated( true )
            }
        }
    }

    const handleIframeCopyCode = () =>{
        navigator.clipboard.writeText(
            `<iframe src='${process.env.REACT_APP_WIDGET_URL}quiz/${quizID}' scrolling='disabled' sandbox="allow></iframe>`
        )
        setCopiedToClipboard( true )
    }

    return(
        <>
            <Helmet>
                <title>
                    New Trivia Quiz
                </title>
            </Helmet>
            <Prompt 
                when={ !triviaQuizCreated && !existingQuizAltered }
                message={ 'Are you sure you want to leave this page, any changes will be lost?' }
            />
            { dbCheck === true && 
                    <div id="loading-modal-container">
                        <LoadingModal />
                    </div>
            }
            <form onSubmit={ submitQuiz } style={{width: '100%'}}>
                { existingQuiz ?
                    null 
                    :
                    <>
                        <h1> Let's create a new trivia quiz! </h1>
                        <h2 id="new-quiz-name">{ quizObject.quizName || 'Quiz'}</h2>
                    </> 
                }
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label htmlFor="quiz_name_input"> Quiz title... </label>
                    <input required id="quiz_name_input" value={ quizObject.quizName } onChange={ handleQuizNameChange } placeholder="Quiz title..."></input>
                </div>
                { questions.length === 0 ? null : <h2> Questions </h2> }
                <div id="outcomes-wrapper">
                    { questionsToDisplay }
                </div>
                <h3 id="add-poll-choice" style={{ cursor: 'pointer'}} onClick={ handleAddQuestionClick }> Add question <span style={{color: 'red'}} id="add_question">+</span> </h3>
                <hr style={{width: '100%'}}></hr>
                { outcomes.length === 0 ? null : <h2> Outcomes </h2> }
                <div id="outcomes-wrapper">
                    { outcomesToDisplay }
                </div>
                <h3 id="add-poll-choice" style={{ cursor: 'pointer'}} onClick={ handleAddOutcomeClick }> Add outcome <span style={{ color: 'red' }} id="add_outcome">+</span> </h3>
                { !existingQuiz && <button type="submit" id="build-quiz"> Build my quiz!</button> }
                { existingQuiz && <button type="button" className="999" onClick={ handleFinishExistingQuiz } id="build-quiz"> Build my quiz!</button> }
                { triviaQuizCreated &&
                    <>
                        <h2> You can find your quiz: 
                            <br></br>
                            <a style={{ color: 'lightblue', fontWeight: '800'}} href={`${process.env.REACT_APP_WIDGET_URL}quiz/`+ quizID}>here</a>
                        </h2>
                        <div id="iframe-grab">
                            <h3> Get iframe code :</h3>
                            <button onClick={ handleIframeCopyCode } type="button"> { copiedToClipboard ? 'Copied' : 'Copy iframe code to clipboard' } </button>
                        </div>
                    </> }
                { existingQuizAltered &&
                    <div style={{ marginTop: '1em'}} id="iframe-grab">
                        <h3> Get iframe code :</h3>
                        <button onClick={ handleIframeCopyCode } type="button"> { copiedToClipboard ? 'Copied' : 'Copy iframe code to clipboard' } </button>
                    </div>
                }
                <p> Author: { author }</p>
            </form>
        </>
    )
}
export default NewTriviaQuiz
