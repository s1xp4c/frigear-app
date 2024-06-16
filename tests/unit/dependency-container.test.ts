import {it, describe, expect, vi} from "vitest";
import {DependencyContainer} from "@/lib/dependency-container";

describe('lib/dependency-container', () => {
    it('should call factories on-demand', () => {
        const container = new DependencyContainer<{
            a: number;
            b: number;
            c: number;
        }>();

        container.instance('a', () => 1);
        container.instance('b', () => 2);
        container.instance('c', (container) => {
            return container.make('a') + container.make('b');
        });

        expect(container.make('a')).to.equal(1);
        expect(container.wasInitialized('c')).toBe(false);
        expect(container.make('c')).toBe(3);
    });
});