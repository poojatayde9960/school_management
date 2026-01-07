import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ClarkProtected = ({ children }) => {
    // Check if clerk exists in Redux state or localStorage
    const { clark } = useSelector(state => state.Adminauth)
    const localClark = JSON.parse(localStorage.getItem('clark'))

    // Use either redundancy (redux is preferred, but localstorage is fallback persistence)
    const isAuthenticated = clark || localClark

    if (!isAuthenticated) {
        return <Navigate to="/clarkLogin" replace />
    }

    return children
}

export default ClarkProtected
