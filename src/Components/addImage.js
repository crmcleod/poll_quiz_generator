/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'

const AddImage = ({ pollSaved, pollObject, setPollObject, setImageLoading }) => {

    const [ cropperState, setCropperState ] = useState({
        image: null,
        crop: { x: 0, y: 0},
        zoom: 1,
        aspect: 5/2,
        cropSaved: false,
        croppedArea: null,
        croppedAreaPixels: null
    })

    const handleCropChange = ( crop ) => {
        setCropperState({ ...cropperState, crop })
    }

    const handleCropComplete = ( croppedArea, croppedAreaPixels ) => {
        setCropperState({ ...cropperState, croppedArea, croppedAreaPixels})
        setPollObject({ ...pollObject,
            croppedHeight: croppedAreaPixels.height,
            croppedWidth: croppedAreaPixels.width,
            croppedX: croppedAreaPixels.x,
            croppedY: croppedAreaPixels.y
        })
    }

    const handleZoomChage = ( zoom ) => {
        setCropperState({ ...cropperState, zoom})
    }

    const handleZoomSliderChange = ( e ) => {
        handleZoomChage( e.target.value )
    }

    const saveImage = async ( e ) => {
        if( e.target.files[ 0 ].size > 10000000){
            alert( 'The file is too large.' )
            document.querySelector( '#poll-img' ).value = ''
        } else {
            let image = new FormData()
            image.append( 'image', e.target.files[ 0 ] )
            axios.post( `${process.env.REACT_APP_SERVER_URL}/upload`, image )
                .then( res => {
                    setPollObject({ ...pollObject, imgID: res.data }) 
                    handleImageGrab( res.data )
                })
        }
    }

    const handleImageChange = ( e ) => {
        saveImage( e )
        setImageLoading( true )
        setTimeout(() => setImageLoading(false), 3000)
    }

    const handleImageGrab = async ( id ) => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/images/${await id}`)
            .then( res => {
                let resB64 = `data:image/png;base64,${res.data.image}`
                setCropperState({ ...cropperState, image: resB64 })
            })
    }

    return(
        <>
            { cropperState.image ?
                <div style={ pollSaved ? {display: 'none'} : null} >
                    <div style={{position: 'relative', width: '300px', height: '300px'}}>
                        <Cropper
                            image={ cropperState.image }
                            crop={ cropperState.crop }
                            zoom={ cropperState.zoom }
                            aspect={ cropperState.aspect }
                            onCropChange={ handleCropChange }
                            onCropComplete={ handleCropComplete }
                            onZoomChange={ handleZoomChage }
                        />
                    </div>
                    <input type="range" min="1" max="5" step="0.1" value={ cropperState.zoom } onChange={ handleZoomSliderChange }/>
                </div>
                :
                null
            }
            <input required onChange={ handleImageChange } id="poll-img" className="poll-input" type="file"/>            
        </>
    )
}

export default AddImage