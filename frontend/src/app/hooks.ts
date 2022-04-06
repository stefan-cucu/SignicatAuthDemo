import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Hook for getting session id from cookies
export const useSessionId = () => {
    const [sessionId, setSessionId] = useState('');
    useEffect(() => {
        const cookie = document.cookie.split('; ').find(c => c.startsWith('SignicatSessionId='));
        if (cookie) {
            setSessionId(cookie.split('=')[1]);
        }
    }
    , [document.cookie]);
    return sessionId;
}
