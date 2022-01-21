import React, {FunctionComponent} from 'react'
import AlertStripe from "nav-frontend-alertstriper";
import { Feilmeldinger as Feilkoder, Feilkode }  from "@/types/feilkode";

interface Props {
    feilkode: string;
    feilmeldinger: Feilkode[];
}

const FeilmeldingWrapper : FunctionComponent<Props> = ({feilkode,children, feilmeldinger}) => {

    console.log('feilkode', feilkode)

    const viseRiktigFeilmeldingen = () => {
        return feilmeldinger.map((value : Feilkode)  => {
            console.log('value', value);
            if (value === feilkode) {
                return <AlertStripe type={"advarsel"}>
                    {Feilkoder[value]}
                </AlertStripe>
            }
        })
    }

    return (
        <div>
            {children}
            {viseRiktigFeilmeldingen()}
        </div>
    )
}
export default FeilmeldingWrapper
