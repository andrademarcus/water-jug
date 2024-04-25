import httpStatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import WaterJugService from '../services/waterjug.service';
import { SolutionStep } from '../models/solutionStep';
import { Action } from '../models/action';
import { State } from '../models/state';

export class WaterJugController {

  async solve(req: Request, res: Response): Promise<Response> {
    try {
      const { jugX, jugY, targetVolumeZ } = req.body;

      const waterJugService = new WaterJugService();

      const results = await waterJugService.solve({
        jugX,
        jugY,
        targetVolumeZ,
      });

      if (!results.hasSolution) {
        return res.status(400).json({ error: 'No Solution' });
      }

      const solution: SolutionStep[] = [];

      results.actions?.map((action, index) => {
        
        const state = (results.states != null) ? results.states[index] as State : null;

        const solved: boolean = (index+1 == results.actions?.length);

        if (action == Action.empty) {
          solution.push(new SolutionStep(index+1, state!.x, state!.y, "Empty bucket " + (state?.x == 0 ? "x" : "y"), solved));
        } else if (action == Action.fill) {
          solution.push(new SolutionStep(index+1, state!.x, state!.y, "Fill bucket " + state?.labelX, solved));
        } else if (action == Action.transfer) {
          solution.push(new SolutionStep(index+1, state!.x, state!.y, "Transfer from bucket " + state?.labelX + " to " + state?.labelY, solved));
        }

      });

      return res.json({"solution": solution});

    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: error });
    }

  }

}
