import FirebaseService from './firebase-service';
import RestService from './rest-service';
import Service from './service';

export const createService = (): Service => {
    return new RestService();
    if (process.env.NODE_ENV === 'development') {
        return new FirebaseService();
    }
};
