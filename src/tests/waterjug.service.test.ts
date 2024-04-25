import WaterJugService from '../services/waterjug.service';

describe('WaterJugService', () => {
  let waterJugService = new WaterJugService();

  beforeEach(() => {
    waterJugService = new WaterJugService();
  });

  it('should return the correct solution when there is a valid solution', () => {
    const input = {
      jugX: 2,
      jugY: 10,
      targetVolumeZ: 4,
    };

    const expectedOutput = {
      hasSolution: true,
      actions: [0, 1, 0, 1],
      states: [
        { x: 2, y: 0, labelX: 'x', labelY: 'y', xCapacity: 2, yCapacity: 10 },
        { x: 0, y: 2, labelX: 'x', labelY: 'y', xCapacity: 2, yCapacity: 10 },
        { x: 2, y: 2, labelX: 'x', labelY: 'y', xCapacity: 2, yCapacity: 10 },
        { x: 0, y: 4, labelX: 'x', labelY: 'y', xCapacity: 2, yCapacity: 10 },
      ],
    };

    const result = waterJugService.solve(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should return hasSolution as false when there is no valid solution', () => {
    const input = {
      jugX: 2,
      jugY: 6,
      targetVolumeZ: 5,
    };

    const expectedOutput = {
      hasSolution: false,
    };

    const result = waterJugService.solve(input);

    expect(result).toEqual(expectedOutput);
  });
});