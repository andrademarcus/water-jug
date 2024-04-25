export class SolutionStep {
    step: number;
    bucketX: number;
    bucketY: number;
    action: string;
    status?: string;
    solved?: boolean;

    constructor(step: number, bucketX: number, bucketY: number, action: string, solved: boolean) {
        this.step = step;
        this.bucketX = bucketX;
        this.bucketY = bucketY;
        this.action = action;
        
        if (solved) {
            this.status = "Solved";
        }
    }



}