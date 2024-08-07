import { describe, expect, it } from 'vitest';
import { DependencyContainer } from '@/lib/dependency-container';

describe('lib/dependency-container', () => {
  it('should call factories on-demand', () => {
    const container = new DependencyContainer<{
      a: number;
      b: number;
      c: number;
    }>({
      a: () => 1,
      b: () => 2,
      c: (container) => {
        return container.make('a') + container.make('b');
      },
    });

    expect(container.make('a')).to.equal(1);
    expect(container.isInitialized('c')).toBe(false);
    expect(container.make('c')).toBe(3);
    expect(container.isInitialized('c')).toBe(true);
  });
});
