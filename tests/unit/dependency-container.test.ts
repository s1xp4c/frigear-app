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
            return container.get('a') + container.get('b');
        });

        expect(container.get('a')).to.equal(1);
        expect(container.wasInitialized('c')).toBe(false);
        expect(container.get('c')).toBe(3);
    });
});