import ServicioAPI from '../src/services/ServicioAPI.js';

describe('ServicioAPI', () => {
  let servicioAPI;

  beforeEach(() => {
    servicioAPI = new ServicioAPI();
    spyOn(servicioAPI, 'getData').and.returnValue(Promise.resolve({ data: 'test' }));
  });

  it('debería llamar a getData', async () => {
    await servicioAPI.getData();
    expect(servicioAPI.getData).toHaveBeenCalled();
  });
});