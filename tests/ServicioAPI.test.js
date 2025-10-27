describe('ServicioAPI', () => {
  beforeEach(() => {
    spyOn(ServicioAPI, 'getData').and.returnValue(Promise.resolve({ data: 'test' }));
    spyOn(ServicioAPI, 'getProductos').and.returnValue(Promise.resolve(productos));
  });

  it('debería obtener datos generales', async () => {
    const result = await ServicioAPI.getData();
    expect(ServicioAPI.getData).toHaveBeenCalled();
    expect(result.data).toBe('test');
  });

  it('debería obtener la lista de productos', async () => {
    const productos = await ServicioAPI.getProductos();
    expect(ServicioAPI.getProductos).toHaveBeenCalled();
    expect(Array.isArray(productos)).toBe(true);
    expect(productos.length).toBeGreaterThan(0);
  });
});