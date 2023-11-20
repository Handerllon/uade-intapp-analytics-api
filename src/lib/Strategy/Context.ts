import { Strategy } from "./Strategy";

class Context {

    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public processLog(data: any): void {
        const result = this.strategy.processLog(data);
    }
}