import { Action } from "./action";
import { IState } from "./state";

export default interface RiddleResponse {
    hasSolution: boolean;
    actions?: Action[];
    states?: IState[];
}