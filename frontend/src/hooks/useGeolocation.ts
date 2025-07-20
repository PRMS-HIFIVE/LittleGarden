import { useState, useCallback } from 'react';

interface Coords {
    lat: number;
    lon: number;
}

interface GeolocationState {
    isLoading: boolean;
    coords: Coords | null;
    error: GeolocationPositionError | Error | null;
}

export const useGeolocation = () => {
    const [state, setState] = useState<GeolocationState>({
        isLoading: false,
        coords: null,
        error: null,
    });

    const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setState(s => ({ ...s, error: new Error('Geolocation is not supported by your browser') }));
            return;
        }

        setState(s => ({ ...s, isLoading: true, error: null }));
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({ isLoading: false, coords: { lat: position.coords.latitude, lon: position.coords.longitude }, error: null });
            },
            (error) => {
                setState({ isLoading: false, coords: null, error });
            }
        );
    }, []);

    return { ...state, getLocation };
};
