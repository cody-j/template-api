interface Service {}
class ServiceManager {
    public static services: Map<new () => Service, Service>;
    constructor () {}
}
