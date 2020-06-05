import { useCallback } from 'react';

//here we use the materialize capability for error message alerting
export const useMessage = () => {
    return useCallback((text) => {
        if (window.M && text) {
            window.M.toast({ html: text })
        }
    }, [])
}