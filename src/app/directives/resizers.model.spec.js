import Resizers from './resizers.model';

describe('Resizers model', () => {
  let resizers;
  const containerSize = {
    width: 100,
    height: 100
  };

  beforeEach(() => {
    resizers = new Resizers(containerSize);
  });

  it('should have correct initial states', () => {
    expect(resizers.container).toBe(containerSize);
    expect(resizers.list.length).toBe(0);
    expect(resizers.activeIndex).toBe(-1);
    expect(resizers.prevEventOffset).toBe(null);
  });

  it('should create new resizer based on evnet', () => {
    const e = {
      offsetX: 1,
      offsetY: 12
    };
    resizers.createResizer(e);

    expect(resizers.list.length).toBe(1);
    expect(resizers.prevEventOffset.x).toBe(e.offsetX);
    expect(resizers.prevEventOffset.y).toBe(e.offsetY);
  });
});
