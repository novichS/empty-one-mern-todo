import { useState, useCallback } from 'react';

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
//ere we use useCallback - what help the react don't fall it in recursion
    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if(!response.ok) {
                throw new Error(data.message || 'Something go wrong')
            }

            setLoading(false)

            return data

        } catch (e) {
            console.log(e.message)
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])
// error cleaning manager
    const clearError = useCallback(() => setError(null), [])

    return { loading, request, error, clearError }
}