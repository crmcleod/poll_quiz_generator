/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useCallback, useEffect } from 'react'

const CroppedImage = ({ 
    imageSrc, 
    croppedHeight, 
    croppedWidth, 
    croppedX, 
    croppedY
}) => {

    const createImage = ( url ) => 
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', error => reject(error))
            image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
            image.src = url
        })

    const getCroppedImg = async ( img, pixelCropH, pixelCropW, pixelCropX, pixelCropY ) => {
        const newImage = await createImage( img )
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const maxSize = Math.max(newImage.width, newImage.height)
        const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

        canvas.width = safeArea
        canvas.height = safeArea

        // translate canvas context to a central location on image to allow rotating around the center.
        ctx.translate(safeArea / 2, safeArea / 2)
        ctx.translate(-safeArea / 2, -safeArea / 2)

        ctx.drawImage(
            newImage, 
            safeArea / 2 - newImage.width * 0.5,
            safeArea / 2 - newImage.height * 0.5
        )

        const data = ctx.getImageData(0, 0, safeArea, safeArea)

        canvas.width = pixelCropW
        canvas.height = pixelCropH

        ctx.putImageData(
            data,
            Math.round(0 - safeArea / 2 + newImage.width * 0.5 - pixelCropX),
            Math.round(0 - safeArea / 2 + newImage.height * 0.5 - pixelCropY)
        )

        return canvas.toDataURL('image/jpg')
    }
    // eslint-disable-next-line no-unused-vars
    const [ croppedImageState, setCroppedImage ] = useState()

    const showCroppedImage = useCallback(
        async () => {
            try {
                const croppedImage = await getCroppedImg(
                    imageSrc,
                    croppedHeight,
                    croppedWidth,
                    croppedX,
                    croppedY
                )
                setCroppedImage( croppedImage )
            } catch ( e ){
                console.error( e )
            }
        },
        [   croppedHeight,
            croppedWidth,
            croppedX,
            croppedY 
        ],
    )

    useEffect(() => {
        showCroppedImage()
    }, [])

    return(
        <img id="poll-image" src={ croppedImageState }/>
    )
}

export default CroppedImage