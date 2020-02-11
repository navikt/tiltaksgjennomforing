// // import useValidering from '@/komponenter/useValidering';
// import BEMHelper from '@/utils/bem';
// import { validerFnr } from '@/utils/fnrUtils';
// import { validerOrgnr } from '@/utils/orgnrUtils';
// import { Søkeknapp } from 'nav-frontend-ikonknapper';
// import { Fieldset, Input, Radio } from 'nav-frontend-skjema';
// import { Undertittel } from 'nav-frontend-typografi';
// import React, { ChangeEvent, FunctionComponent, useCallback, useEffect, useState } from 'react';
// import './SokEtterAvtaler.less';
// import { FiltreringProps, Søk, Filtertyper } from '@/AvtaleOversikt/Filtrering';
// import useValidering from "@/komponenter/useValidering";
//
// const cls = BEMHelper('soketteravtaler');
//
// const SokEtterAvtaler: FunctionComponent<FiltreringProps> = props => {
//     const [valgtSokeType, setValgtSokeType] = useState('deltakerFnr');
//     const [sokeTerm, settSokeTerm] = useState();
//
//     const hvaErfeil = () => {
//         if (!sokeTerm) return '';
//         if (valgtSokeType === 'deltakerFnr' && !validerFnr(sokeTerm)) {
//             return 'Ugyldig fødselsnummer';
//         } else if (valgtSokeType === 'bedriftNr' && !validerOrgnr(sokeTerm)) {
//             return 'Ugyldig bedriftsnummer';
//         }
//     };
//
//     const sokEtterAvtalerKlikk = () => {
//         const hvaSomErFeilTekst = hvaErfeil();
//         if (!hvaSomErFeilTekst) {
//             let sok: Søk = { søketype: Filtertyper.TomtSøk };
//             if (!sokeTerm) {
//                 sok = { søketype: Filtertyper.TomtSøk };
//             } else if (valgtSokeType === 'deltakerFnr') {
//                 sok = { søketype: Filtertyper.DeltakerSøk, deltakerFnr: sokeTerm };
//             } else if (valgtSokeType === 'bedriftNr') {
//                 sok = { søketype: Filtertyper.BedriftSøk, bedriftNr: sokeTerm };
//             }
//             // props.sokEtterAvtaler(sok);
//         } else {
//             setSokeFeltFeil({ feilmelding: hvaSomErFeilTekst });
//         }
//     };
//
//     const [sokeFeltFeil, setSokeFeltFeil, validerSokeFelt] = useValidering(sokeTerm, [
//         verdi => {
//             if (verdi) {
//                 if (valgtSokeType === 'deltakerFnr') {
//                     if (!validerFnr(verdi)) {
//                         return { feilmelding: 'Ugyldig fødselsnummer' };
//                     }
//                 } else if (valgtSokeType === 'bedriftNr') {
//                     if (!validerOrgnr(verdi)) {
//                         return {
//                             feilmelding: 'Ugyldig bedriftsnummer',
//                         };
//                     }
//                 }
//             } else {
//                 return undefined;
//             }
//         },
//     ]);
//
//     const sokEtterAvtaler = useCallback(props.sokEtterAvtaler, []);
//
//     useEffect(() => {
//         if (sokeTerm === '') {
//             sokEtterAvtaler({ søketype: Filtertyper.TomtSøk });
//             setSokeFeltFeil(undefined);
//         }
//     }, [sokeTerm, setSokeFeltFeil, sokEtterAvtaler]);
//
//     useEffect(() => {
//         setSokeFeltFeil(undefined);
//     }, [valgtSokeType, setSokeFeltFeil]);
//
//     const enterKlikk = (event: any) => {
//         if (event.key === 'Enter') {
//             settSokeTerm(event.currentTarget.value);
//             sokEtterAvtalerKlikk();
//         }
//     };
//
//     const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
//         const inputValNumeric = event.currentTarget.value.replace(/\D/g, '');
//         if (inputValNumeric.length <= 11) {
//             settSokeTerm(inputValNumeric);
//             setSokeFeltFeil(undefined);
//         }
//     };
//
//     return (
//         <div className={'innholdsboks'}>
//             <Undertittel>Søk etter avtaler registrert på</Undertittel>
//             <Fieldset legend="">
//                 <Radio
//                     checked={valgtSokeType === 'deltakerFnr'}
//                     onChange={() => setValgtSokeType('deltakerFnr')}
//                     label={'Deltaker'}
//                     name="deltakerFnr"
//                 />
//                 <Radio
//                     checked={valgtSokeType === 'bedriftNr'}
//                     onChange={() => setValgtSokeType('bedriftNr')}
//                     label={'Bedrift'}
//                     name="bedriftNr"
//                 />
//             </Fieldset>
//
//             <div className={cls.element('sokelinje')}>
//                 <Input
//                     label=""
//                     onBlur={validerSokeFelt}
//                     onKeyPress={enterKlikk}
//                     onChange={inputOnChange}
//                     value={sokeTerm}
//                     className={cls.element('sokefelt')}
//                     feil={sokeFeltFeil}
//                     placeholder={valgtSokeType === 'deltakerFnr' ? 'Fødselsnummer' : 'Bedriftsnummer'}
//                 />
//                 <div className={cls.element('sokeknapp')}>
//                     <Søkeknapp onClick={sokEtterAvtalerKlikk} />
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default SokEtterAvtaler;

export default () => null;
