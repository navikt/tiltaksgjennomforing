import React, {FunctionComponent} from 'react'
import AlertStripe from "nav-frontend-alertstriper";
import {Feilkode, Feilmeldinger as Feilkoder} from "@/types/feilkode";

interface Props {
    feilkoder: string[];
    feilmeldinger: Set<Feilkode>;
}

const FeilmeldingWrapper : FunctionComponent<Props> = ({feilkoder,children, feilmeldinger}) => {

    console.log('feilkode', feilkoder)

    const viseRiktigFeilmeldingen = () => {
        return Array.from(feilmeldinger.values()).map((value : Feilkode)  => {
            if (feilkoder.includes(value)) {
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
