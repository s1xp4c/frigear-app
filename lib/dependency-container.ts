export type ServiceFactory<Dependencies extends Record<string, any>, K extends keyof Dependencies> = (container: DependencyContainer<Dependencies>) => Dependencies[K];

export class DependencyContainer<Dependencies extends Record<string, any>> {
    protected services: Partial<Record<keyof Dependencies, ServiceFactory<Dependencies, keyof Dependencies>>> = {};
    protected instances: Partial<Dependencies> = {}

    constructor() {
    }

    service<Name extends keyof Dependencies>(name: Name, factory: ServiceFactory<Dependencies, Name>) {
        this.services[name] = factory;
    }

    get<Name extends keyof Dependencies>(name: Name): Dependencies[Name] {
        this.initializeInstanceIfNotInitialized(name);
        if (!this.instances[name]) {
            throw new Error('Dependency not defined.');
        }

        return this.instances[name] as Dependencies[Name];
    }

    private initializeInstanceIfNotInitialized<Name extends keyof Dependencies>(name: Name): boolean {
        if (!this.instances[name] && this.services[name]) {
            const serviceFactory = this.services[name] as ServiceFactory<Dependencies, Name>;
            this.instances[name] = serviceFactory(this) as Dependencies[Name];
            return true;
        }
        return false;
    }

    wasInitialized<Name extends keyof Dependencies>(name: Name): boolean {
        return this.instances[name] !== undefined;
    }
}