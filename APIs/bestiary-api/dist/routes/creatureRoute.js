"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const creatureController_1 = require("../controllers/creatureController");
class CreatureRoutes {
    constructor() {
        this.creatureController = new creatureController_1.CreatureController();
    }
    routes(app) {
        app
            .route("/creature/")
            .get(this.creatureController.readCreature)
            .post(this.creatureController.addCreature);
        app
            .route("/creature/:creatureName")
            .get(this.creatureController.readByName)
            .put(this.creatureController.updateByName)
            .delete(this.creatureController.deleteByName);
    }
}
exports.CreatureRoutes = CreatureRoutes;
//# sourceMappingURL=creatureRoute.js.map