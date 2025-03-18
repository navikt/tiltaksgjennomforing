import { AvtaleMinimalListeVisning, Diskresjonskode } from '@/types';
import { Tag } from '@navikt/ds-react';

interface Props {
    fornavn?: string;
    etternavn?: string;
    diskresjonskode?: Diskresjonskode;
}

const lagFulltNavn = (deltakerFornavn?: string, deltakerEtternavn?: string) => {
    if (deltakerFornavn && deltakerEtternavn) {
        return deltakerFornavn + ' ' + deltakerEtternavn;
    } else if (deltakerFornavn) {
        return deltakerFornavn;
    } else if (deltakerEtternavn) {
        return deltakerEtternavn;
    }
    return '-';
};

function NavnMedDiskresjonskode(props: Props) {
    const { diskresjonskode = Diskresjonskode.UGRADERT, fornavn, etternavn } = props;
    const navn = lagFulltNavn(fornavn, etternavn);

    switch (diskresjonskode) {
        case Diskresjonskode.STRENGT_FORTROLIG:
        case Diskresjonskode.STRENGT_FORTROLIG_UTLAND:
            return (
                <>
                    <Tag size="xsmall" variant="error-moderate">
                        Kode 6
                    </Tag>
                    <br />
                    {navn}
                </>
            );
        case Diskresjonskode.FORTROLIG:
            return (
                <>
                    <Tag size="xsmall" variant="warning-moderate">
                        Kode 7
                    </Tag>
                    <br />
                    {navn}
                </>
            );
        default:
            return navn;
    }
}

export default NavnMedDiskresjonskode;
