import firebase from 'firebase';
import { Avtale } from '../AvtaleSide/avtale';
import { tomAvtale } from '../AvtaleContext';
import Service from './service';

firebase.initializeApp({
    apiKey: 'AIzaSyC0lxgrU_SleTgL72TtFUO7yEyrN2ihjI4',
    authDomain: 'tiltaksgjennomforing.firebaseapp.com',
    databaseURL: 'https://tiltaksgjennomforing.firebaseio.com',
    projectId: 'tiltaksgjennomforing',
    storageBucket: 'tiltaksgjennomforing.appspot.com',
    messagingSenderId: '134856989400',
});

const avtaleRef = (avtaleId: string): firebase.database.Reference => {
    return firebase.database().ref(`avtaler/${avtaleId}`);
};

const mapFirebaseResponsTilAvtaler = (response: any): any => {
    return Object.keys(response)
        .map(id => ({
            ...tomAvtale,
            ...response[id],
        }))
        .reduce(
            (map, avtale) => map.set(avtale.id, avtale),
            new Map<string, Avtale>()
        );
};

export default class FirebaseService extends Service {
    hentAvtale(avtaleId: string): Promise<Avtale> {
        return avtaleRef(avtaleId)
            .once('value')
            .then(
                (snapshot: firebase.database.DataSnapshot) =>
                    new Promise<Avtale>(success => success(snapshot.val()))
            );
    }

    hentAvtaler(): Promise<Map<string, Avtale>> {
        return firebase
            .database()
            .ref('avtaler')
            .once('value')
            .then(
                (snapshot: firebase.database.DataSnapshot) =>
                    new Promise<Map<string, Avtale>>(success =>
                        success(mapFirebaseResponsTilAvtaler(snapshot.val()))
                    )
            );
    }

    lagreAvtale(avtale: Avtale): Promise<any> {
        return avtaleRef(avtale.id).set(avtale);
    }

    opprettAvtale(): Promise<Avtale> {
        return new Promise<Avtale>(() =>
            firebase
                .database()
                .ref('avtaler')
                .push()
                .then()
        );
    }
}
