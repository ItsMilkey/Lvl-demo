import React from 'react';
import { render, screen } from '@testing-library/react';
import MiComponente from '../src/components/MiComponente';

describe('MiComponente', () => {
  it('renderiza correctamente', () => {
    // Renderizar el componente en el div#root que setupTests.js crea
    render(<MiComponente />);
    
    // Buscar el texto en el documento
    const element = screen.getByText('Hola Mundo');
    
    // Verificar que el elemento existe y tiene el texto correcto
    expect(element).toBeTruthy();
    expect(element.textContent).toBe('Hola Mundo');
  });
});