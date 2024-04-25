"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3000;
function waterJugRiddle(jug1Capacity, jug2Capacity, targetAmount) {
    // Implementation of water jug riddle here...
    // Return steps to reach the solution as an array of strings
    return ["Step 1", "Step 2", "Step 3"];
}
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
    console.log('ok');
});
app.post('/solve', (req, res) => {
    const { jug1Capacity, jug2Capacity, targetAmount } = req.body;
    if (!jug1Capacity || !jug2Capacity || !targetAmount) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    const steps = waterJugRiddle(jug1Capacity, jug2Capacity, targetAmount);
    res.json({ steps });
});
app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});
