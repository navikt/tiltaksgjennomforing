import * as firebase from 'firebase';
import AvtaleModell from '../AvtaleSide/AvtaleModell';

firebase.initializeApp({
    apiKey: 'AIzaSyC0lxgrU_SleTgL72TtFUO7yEyrN2ihjI4',
    authDomain: 'tiltaksgjennomforing.firebaseapp.com',
    databaseURL: 'https://tiltaksgjennomforing.firebaseio.com',
    projectId: 'tiltaksgjennomforing',
    storageBucket: 'tiltaksgjennomforing.appspot.com',
    messagingSenderId: '134856989400',
});

// TODO: Fjern
export default firebase;

export const hentAvtale = (avtaleId: string) => {
    return avtaleRef(avtaleId).once('value');
};

export const lagre = (avtale: AvtaleModell) => {
    return avtaleRef(avtale.id).set(avtale);
};

const avtaleRef = (avtaleId: string) => {
    return firebase.database().ref(`avtale/${avtaleId}`);
};
