import * as firebase from 'firebase';
import * as moment from 'moment';
import { Avtale } from '../StegSide/avtale';
import DataSnapshot = firebase.database.DataSnapshot;
import { tomAvtale } from '../StegSide/AvtaleContext';

firebase.initializeApp({
    apiKey: 'AIzaSyC0lxgrU_SleTgL72TtFUO7yEyrN2ihjI4',
    authDomain: 'tiltaksgjennomforing.firebaseapp.com',
    databaseURL: 'https://tiltaksgjennomforing.firebaseio.com',
    projectId: 'tiltaksgjennomforing',
    storageBucket: 'tiltaksgjennomforing.appspot.com',
    messagingSenderId: '134856989400',
});

export const hentAvtale = (avtaleId: string) => {
    return avtaleRef(avtaleId)
        .once('value')
        .then(
            (snapshot: DataSnapshot) =>
                new Promise<Avtale>(success => success(snapshot.val()))
        );
};

export const hentAvtaler = () => {
    return firebase
        .database()
        .ref('avtaler')
        .once('value')
        .then(
            (snapshot: DataSnapshot) =>
                new Promise<any>(success =>
                    success(mapFirebaseResponsTilAvtaler(snapshot.val()))
                )
        );
};

const mapFirebaseResponsTilAvtaler = (respons: Map<string, Avtale>): any => {
    return Object.keys(respons)
        .map(id => ({
            ...tomAvtale,
            ...respons[id],
        }))
        .reduce((map, avtale) => {
            map[avtale.id] = avtale;
            return map;
        }, {});
};

export const lagreAvtale = (avtale: Avtale) => {
    return avtaleRef(avtale.id).set(avtale);
};

export const opprettAvtale = () => {
    return firebase
        .database()
        .ref('avtaler')
        .push()
        .then(nyAvtaleRef => {
            const avtaleId: string = nyAvtaleRef.key || '';
            const avtale: Avtale = {
                ...tomAvtale,
                id: avtaleId,
                opprettetTidspunkt: moment().format('DD.MM.YYYY HH:mm:ss'),
            };

            return nyAvtaleRef
                .set(avtale)
                .then(() => new Promise<Avtale>(success => success(avtale)));
        });
};

const avtaleRef = (avtaleId: string) => {
    return firebase.database().ref(`avtaler/${avtaleId}`);
};
