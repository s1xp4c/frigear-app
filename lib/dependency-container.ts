export type ServiceFactory<
  Dependencies extends Record<string, any>,
  K extends keyof Dependencies,
> = (container: DependencyContainer<Dependencies>) => Dependencies[K];

export class DependencyContainer<Dependencies extends Record<string, any>> {
  protected instances: Partial<Dependencies> = {};

  constructor(
    protected factories: Partial<
      Record<
        keyof Dependencies,
        ServiceFactory<Dependencies, keyof Dependencies>
      >
    > = {},
  ) {}

  instance<Name extends keyof Dependencies>(
    name: Name,
    factory: ServiceFactory<Dependencies, Name>,
  ) {
    this.factories[name] = factory;
  }

  make<Name extends keyof Dependencies>(name: Name): Dependencies[Name] {
    this.initializeInstanceIfNotInitialized(name);
    if (!this.instances[name]) {
      throw new Error(`${name as string} is not registered.`);
    }

    return this.instances[name] as Dependencies[Name];
  }

  private initializeInstanceIfNotInitialized<Name extends keyof Dependencies>(
    name: Name,
  ): boolean {
    if (!this.instances[name] && this.factories[name]) {
      const serviceFactory = this.factories[name] as ServiceFactory<
        Dependencies,
        Name
      >;
      this.instances[name] = serviceFactory(this) as Dependencies[Name];
      return true;
    }
    return false;
  }

  isInitialized<Name extends keyof Dependencies>(name: Name): boolean {
    return this.instances[name] !== undefined;
  }
}
