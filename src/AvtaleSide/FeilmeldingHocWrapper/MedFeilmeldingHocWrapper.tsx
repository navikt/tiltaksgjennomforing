import React from 'react'

interface Props{
    feilmelding: string;
}

const MedFeilmeldingHocWrapper = <P extends object>(Component : React.ComponentType<P>) =>
    class WithLoading extends React.Component<P & Props> {
        render() {
            console.log('props', this.props);
            return (


                <Component {...this.props as P}>
                    <div></div>
            </Component>
              )
        }
}
export default MedFeilmeldingHocWrapper
