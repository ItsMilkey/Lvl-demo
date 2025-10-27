import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Contador from '../src/components/Contador';

describe('Contador', () => {
  it('incrementa el contador cuando se hace clic', () => {
    const { getByText } = render(<Contador />);
    const boton = getByText('Incrementar');
    fireEvent.click(boton);
    const contadorText = getByText('Contador: 1');
    expect(contadorText).toBeTruthy();
    expect(contadorText.textContent).toBe('Contador: 1');
  });
});