import { CreatureController } from "../controllers/creatureController";

export class CreatureRoutes {
  public creatureController: CreatureController = new CreatureController();

  public routes(app): void {
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
