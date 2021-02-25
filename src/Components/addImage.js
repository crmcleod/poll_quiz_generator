/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

const AddImage = ({ 
    quizObject, 
    setQuizObject, 
    quizSaved, 
    setImageLoading 
}) => {

    const [ cropperState, setCropperState ] = useState({
        image: null,
        crop: { x: 0, y: 0 },
        zoom: 1,
        aspect: 5/2,
        cropSaved: false,
        croppedArea: null,
        croppedAreaPixels: null
    })

    const handleImageChange = ( e ) => {
        if( e.target.files[0].type == 'image/heic' ){
            // add custom alert modal
            alert('.heic images are incompatible with this application')
            e.target.value=''
            setCropperState({ ...cropperState, image: null })
        } else {
            saveImage( e )
            setImageLoading( true )
            setTimeout( () => setImageLoading( false ), 3000 )
        }
        
    }

    const saveImage = ( e ) => {
        if( e.target.files[0].size > 10000000 ){
            alert( 'The file is too large.' )
            e.target.value = ''
        } else {
            let image = new FormData()
            image.append( 'image', e.target.files[ 0 ] )
            axios.post( `${ process.env.REACT_APP_SERVER_URL }/upload`, image )
                .then( res => {
                    setQuizObject({ ...quizObject, imgID: res.data }) 
                    handleImageGrab( res.data )
                })
        }
    }

    const handleImageGrab = async ( id ) => {
        axios.get(`${ process.env.REACT_APP_SERVER_URL }/images/${ await id }`)
            .then( res => {
                const resB64 = `data:image/png;base64,${ res.data.image }`
                setCropperState({ ...cropperState, image: resB64 })
            })
    }

    const handleCropChange = ( crop ) => {
        setCropperState({ ...cropperState, crop })
    }

    const handleCropComplete = ( croppedArea, croppedAreaPixels ) => {
        setCropperState({ ...cropperState, croppedArea, croppedAreaPixels })
        setQuizObject({ 
            ...quizObject,
            croppedHeight: croppedAreaPixels.height,
            croppedWidth: croppedAreaPixels.width,
            croppedX: croppedAreaPixels.x,
            croppedY: croppedAreaPixels.y
        })
    }

    const handleZoomChange = ( zoom ) => {
        setCropperState({ ...cropperState, zoom })
    }

    const handleZoomSliderChange = ( e ) => {
        handleZoomChange( e.target.value )
    }

    if( /iPhone|iPad|iPod|Android/i.test( navigator.userAgent ) ){
        return(
            <h3 style={{ width: '300px' }}>
                Image uploads from mobile currently not supported.
            </h3>
        )
    }
    return(
        <div id="add-image-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
            { cropperState.image ?
                <div style={ quizSaved ? {display: 'none'} : null } >
                    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
                        <Cropper
                            image={ cropperState.image }
                            crop={ cropperState.crop }
                            zoom={ cropperState.zoom }
                            aspect={ cropperState.aspect }
                            onCropChange={ handleCropChange }
                            onCropComplete={ handleCropComplete }
                            onZoomChange={ handleZoomChange }
                        />
                    </div>
                    <input type="range" min="1" max="5" step="0.1" value={ cropperState.zoom } onChange={ handleZoomSliderChange }/>
                </div>
                :
                null
            }
            { quizSaved ? 
                null 
                : 
                <input required onChange={ handleImageChange } id="background-img-input" className="poll-input" type="file"/> 
            }
        </div>
    )
}

export default AddImage