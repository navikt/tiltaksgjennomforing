import * as firebase from 'firebase';
import AvtaleModell, { tomAvtale } from '../AvtaleSide/AvtaleModell';
import * as moment from 'moment';
import DataSnapshot = firebase.database.DataSnapshot;

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
                new Promise<AvtaleModell>(success => success(snapshot.val()))
        );
};

export const hentAvtaler = () => {
    return firebase
        .database()
        .ref('avtale')
        .once('value')
        .then(
            (snapshot: DataSnapshot) =>
                new Promise<AvtaleModell[]>(success =>
                    success(mapFirebaseResponsTilAvtaler(snapshot.val()))
                )
        );
};

const mapFirebaseResponsTilAvtaler = (
    respons: Map<string, AvtaleModell>
): AvtaleModell[] => {
    return Object.keys(respons).map(id => ({
        ...tomAvtale,
        ...respons[id],
    }));
};

export const lagreAvtale = (avtale: AvtaleModell) => {
    return avtaleRef(avtale.id).set(avtale);
};

export const opprettAvtale = () => {
    const nyAvtaleRef = firebase
        .database()
        .ref('avtale')
        .push();

    const avtaleId: string = nyAvtaleRef.key || '';
    const avtale: AvtaleModell = {
        ...tomAvtale,
        id: avtaleId,
        opprettetTidspunkt: moment().format('DD.MM.YYYY HH:mm:ss'),
    };

    return nyAvtaleRef
        .set(avtale)
        .then(() => new Promise<string>(success => success(avtaleId)));
};

const avtaleRef = (avtaleId: string) => {
    return firebase.database().ref(`avtale/${avtaleId}`);
};
