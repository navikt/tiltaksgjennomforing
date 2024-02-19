import React from 'react';

// Hentet fra: https://medium.com/trabe/catching-asynchronous-errors-in-react-using-error-boundaries-5e8a5fd7b971
export const useAsyncError = () => {
    const [, setError] = React.useState();
    return React.useCallback(
        (e: any) => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
};
