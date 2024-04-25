import { Action } from "../models/action";
import RiddleResponse from "../models/riddleResponse";
import { IState, State } from "../models/state";
import RiddleRequest from "../models/riddleRequest";
import { myCache } from "..";



export default class WaterJugService  {
    
    public solve(input: RiddleRequest): RiddleResponse {

        const cachedKey = this.getCachedKey(input);
        const cached = myCache.get(cachedKey);
        if (cached != undefined) {
            console.log('Loading cached results... ' + cachedKey)
            return cached;
        }

        if (((input.targetVolumeZ % this.gcd(input.jugX, input.jugY)) != 0) || (Math.max(input.jugX, input.jugY) < input.targetVolumeZ)) {
            return { hasSolution: false };
        }
        const r1: RiddleResponse = this.pour(input.jugX, input.jugY, input.targetVolumeZ, "x", "y");
        const r2: RiddleResponse = this.pour(input.jugY, input.jugX, input.targetVolumeZ, "y", "x");
        let results = null;
        if (r1.states != null && r2.states != null && r1.states.length < r2.states.length) {
            results = r1;
        } else {
            results = { ...r2, states: r2.states?.map(s => ({ x: s.y, y: s.x, labelX: s.labelX, labelY: s.labelY })) };
        }
        myCache.set(cachedKey, results);
        return results;

    }

    private getCachedKey(input: RiddleRequest): string {
        return input.jugX + "-" + input.jugY + "-" + input.targetVolumeZ;
    }

    private pour(fromJug: number, toJug: number, measure: number, labelX: string, labelY: string): RiddleResponse {

        const states: IState[] = [];
        const actions: Action[] = [];

        const current: State = new State(fromJug, 0, fromJug, toJug, labelX, labelY);
        states.push(current.clone());
        actions.push(Action.fill);

        let toBeTransfered: number;
        while (!current.foundMeasure(measure)) {
            toBeTransfered = Math.min(current.x, toJug - current.y);

            current.transferFromXtoY(toBeTransfered);
            actions.push(Action.transfer);
            states.push(current.clone());

            if (current.foundMeasure(measure)) {
                return { hasSolution: true, states, actions };
            }

            // first jug becomes empty
            if (current.isXEmpty()) {
                current.fillX();
                actions.push(Action.fill);
                states.push(current.clone());
            }

            // second jug becomes full
            if (current.isYFull()) {
                current.emptyY();
                actions.push(Action.empty);
                states.push(current.clone());
            }
        }
        return { hasSolution: true, states, actions };
    }

    private gcd(a: number, b: number): number {
        return (b == 0) ? Math.abs(a) : this.gcd(b, a % b);
    }

}
