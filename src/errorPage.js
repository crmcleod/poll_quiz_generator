import React from 'react'
import { Helmet } from 'react-helmet-async'

const ErrorPage = () => {

    return(
        <>
            <Helmet>
                <title>
                    ERR 404
                </title>
            </Helmet>
            <h1>404 - Page not found </h1>
        </>
    )
}
export default ErrorPage