import React from 'react'

const CroppedImage = () => {

    const handleCroppedImageSave = async ( ) => {
        //     setCropperState({ ...cropperState, cropSaved: true })
        //     try {
        //         getCroppedImg( cropperState.image, cropperState.croppedAreaPixels )
        //     } catch( e ) { 
        //         console.error( e )}
        // }
    
        // const createImage = ( url ) => 
        //     new Promise((resolve, reject) => {
        //         const image = new Image()
        //         image.addEventListener('load', () => resolve(image))
        //         image.addEventListener('error', error => reject(error))
        //         image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
        //         image.src = url
        //     })
    
        // // eslint-disable-next-line no-unused-vars
        // const getCroppedImg = async ( img, pixelCrop ) => {
        //     const newImage = await createImage( img )
        //     const canvas = document.createElement('canvas')
        //     const ctx = canvas.getContext('2d')
    
        //     const maxSize = Math.max(newImage.width, newImage.height)
        //     const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))
    
        //     canvas.width = safeArea
        //     canvas.height = safeArea
    
        //     // translate canvas context to a central location on image to allow rotating around the center.
        //     ctx.translate(safeArea / 2, safeArea / 2)
        //     ctx.translate(-safeArea / 2, -safeArea / 2)
    
        //     ctx.drawImage(
        //         newImage, 
        //         safeArea / 2 - newImage.width * 0.5,
        //         safeArea / 2 - newImage.height * 0.5
        //     )
    
        //     const data = ctx.getImageData(0, 0, safeArea, safeArea)
    
        //     canvas.width = pixelCrop.width
        //     canvas.height = pixelCrop.height
    
        //     ctx.putImageData(
        //         data,
        //         Math.round(0 - safeArea / 2 + newImage.width * 0.5 - pixelCrop.x),
        //         Math.round(0 - safeArea / 2 + newImage.height * 0.5 - pixelCrop.y)
        //     )
    
        //     // console.log( canvas.toDataURL('file') )
        //     return new Promise(resolve => {
        //         canvas.toBlob(file => {
        //             resolve(URL.createObjectURL(file))
        //         }, 'image/jpeg')
        //     })
        //     // return canvas.toDataURL()
        //     // let image = new FormData()
        //     // image.append( 'image', canvas )
        //     // console.log( newImage, canvas )
        //     // axios.post(`${process.env.REACT_APP_SERVER_URL}/upload`, image )
        //     //     .then( res => console.log( res ))
    
        // }
        // eslint-disable-next-line no-unused-vars
        // const [ croppedImageState, setCroppedImage ] = useState()
    
        // const showCroppedImage = useCallback(
        //     async () => {
        //         try {
        //             const croppedImage = await getCroppedImg(
        //                 cropperState.image, cropperState.croppedAreaPixels
        //             )
        //             setCroppedImage( croppedImage )
        //             let image = new FormData()
        //             image.append( 'image', await urlToFile() )
        //             axios.post( `${process.env.REACT_APP_SERVER_URL}/upload`, image )
        //                 .then( res => console.log(res.data))
        //         } catch ( e ){
        //             console.error( e )
        //         }
        //     },
        //     [ cropperState.croppedAreaPixels ],
        // )
        // const [ blahblaj, setBlah ] = useState()
        // axios.get(`${process.env.REACT_APP_SERVER_URL}/images/155`)
        //     .then( res => setBlah( res.data.image))
    return(
        <img />
    )
}

export default CroppedImage