const hundreProsentLonn = (manedslonn?: number, stillingsprosent?: number) => {
    return manedslonn && stillingsprosent ? (manedslonn / stillingsprosent) * 100 : undefined;
};

export { hundreProsentLonn };
