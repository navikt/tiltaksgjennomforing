import FirebaseService from './firebase-service';
import RestService from './rest-service';
import Service from './service';

export const createService = (): Service => {
    if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_FIREBASE) {
        return new FirebaseService();
    }
    return new RestService();
};
