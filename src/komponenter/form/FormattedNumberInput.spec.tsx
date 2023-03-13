import React from 'react';
import { shallow } from 'enzyme';
import ProsentInput from './ProsentInput';
import { fromFormatted } from '@/komponenter/form/utils/form-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

test('gitt prosent verdi over max, skal det gis kun max og ikke over max verdi', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;

    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => (verdiState = toFloatVerdi(event.target.value))}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '35' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('30 %');
});

test('gitt prosent verdi med komma(dot), skal det tillates', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;

    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => (verdiState = toFloatVerdi(event.target.value))}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '3.5' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('3.5 %');
});

test('gitt prosent verdi med komma(dot) over grense, skal det gis max', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;
    const toFloatVerdiMock = jest.fn((verdi) => verdi);

    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                toFloatVerdiMock(event.target.value);
                verdiState = toFloatVerdi(event.target.value);
            }}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '30.5' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    expect(toFloatVerdiMock.mock.calls.length).toBe(1);
    expect(toFloatVerdiMock.mock.results[0].value).toBe('30');
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('30 %');
});

test('gitt høy prosent verdi med komma(dot), skal det tillates', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;
    const toFloatVerdiMock = jest.fn((verdi) => verdi);
    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                verdiState = toFloatVerdi(event.target.value);
                toFloatVerdiMock(verdiState);
            }}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '20,5' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    expect(toFloatVerdiMock.mock.calls.length).toBe(1);
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('20.5 %');
});

test('gitt normal prosent beløp, skal det tillates', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;
    const toFloatVerdiMock = jest.fn((verdi) => verdi);
    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                verdiState = toFloatVerdi(event.target.value);
                toFloatVerdiMock(verdiState);
            }}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '7' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    expect(toFloatVerdiMock.mock.calls.length).toBe(1);
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('7 %');
});

test('gitt prosent verdi med komma(dot) uten desimal etter, skal det tillates', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;
    const toFloatVerdiMock = jest.fn((verdi) => verdi);

    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                verdiState = toFloatVerdi(event.target.value);
                toFloatVerdiMock(verdiState);
            }}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '3.' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('3 %');
    expect(toFloatVerdiMock.mock.calls.length).toBe(1);
});

test('gitt prosent verdi med komma(,), skal det tillates', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;

    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => (verdiState = toFloatVerdi(event.target.value))}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '3,5' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('3.5 %');
});

test('gitt prosent verdi med bokstaver skal det gis blank verdi', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;

    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            maxLength={4}
            autoComplete={'off'}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => (verdiState = toFloatVerdi(event.target.value))}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '3aa' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('3 %');
});

test('gitt tom prosent verdi gis blank input verdi', async () => {
    let verdiState: number = 0.2;
    const beregn = (nyBeregning: number): string => (nyBeregning * 100).toFixed(0);
    const toFloatVerdi = (verdi: string): number => parseFloat(verdi) / 100;
    const toFloatVerdiMock = jest.fn((verdi) => verdi);

    render(
        <ProsentInput
            name="tjenestepensjonProsentInput"
            placeholder="tjenestepensjonProsentInput"
            bredde="S"
            label={'Obligatorisk tjenestepensjon fra 0 - 30 %'}
            min={0}
            max={30}
            autoComplete={'off'}
            maxLength={4}
            value={beregn(verdiState)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                verdiState = toFloatVerdi(event.target.value);
                toFloatVerdiMock(event.target.value);
            }}
        />
    );

    fireEvent.change(screen.getByPlaceholderText('tjenestepensjonProsentInput'), { target: { value: '' } });
    await waitFor(() => screen.getByPlaceholderText('tjenestepensjonProsentInput'));
    expect(toFloatVerdiMock.mock.calls.length).toBe(1);
    // @ts-ignore
    expect(screen.getByPlaceholderText('tjenestepensjonProsentInput').value).toBe('');
});

test('Renders ProsentInput med over gyldig verdi', () => {
    const formater = (value: string): string => value.replace(',', '.').replace(/[^0-9.]/g, '') + '';
    expect(parseFloat(formater('2,5ab '))).toEqual(2.5);

    const tall = parseFloat(fromFormatted('2,2'));
    expect(tall).toEqual(2.2);
});

test('Test that <ProsentInput> renders correctly', () => {
    const wrapper = shallow(<ProsentInput label="dummy" />);
    expect(wrapper).toHaveLength(1);
});
