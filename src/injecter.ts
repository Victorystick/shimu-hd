export class Injecter {
  private services: Map<any,any>; //Make this more specific sometime later.
  constructor() {
    this.services = new Map();
  }

  injected(service) {
    if (!this.services.has(service)) {
      this.services.set(service, service.standard())
    }
    return this.services.get(service);
  }

  register(service, implementation) {
    this.services.set(service, implementation);
  }
}

export const defaultInjecter = new Injecter();
export const Injected = defaultInjecter.injected.bind(defaultInjecter);
