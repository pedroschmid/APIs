import * as mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";

import { CreatureSchema } from "../models/creatureModel";

const Creature = mongoose.model("Creature", CreatureSchema);

export class CreatureController {
  // CREATE
  public async addCreature(req: Request, res: Response, next: NextFunction) {
    let newCreature = new Creature(req.body);

    try {
      await newCreature
        .save()
        .then(creature => {
          res.status(200).send(`Creature created successfully!\n${creature}`);
        })
        .catch(error => {
          res.json({
            message: "Failed to create the creature!"
          });

          console.log(error);
        });
    } finally {
      next();
    }
  }

  // READ
  public async readCreature(req: Request, res: Response, next: NextFunction) {
    try {
      await Creature.find({})
        .then(creature => {
          res.status(200).json(creature);
        })
        .catch(error => {
          res.json({
            message: "Failed to get creatures!"
          });

          console.log(error);
        });
    } finally {
      next();
    }
  }

  // READ BY PARAMS
  public async readByName(req: Request, res: Response, next: NextFunction) {
    let { creatureName } = req.params;

    try {
      await Creature.findOne({ creatureName: creatureName })
        .then(creature => {
          res.status(200).json(creature);
        })
        .catch(error => {
          res.json({
            message: "Failed to get specified creature!"
          });

          console.log(error);
        });
    } finally {
      next();
    }
  }

  // UPDATE BY PARAMS
  public async updateByName(req: Request, res: Response, next: NextFunction) {
    let { creatureName } = req.params;
    let data = req.body

    try {
      await Creature.findOneAndUpdate({ creatureName: creatureName }, data, {
        new: true
      })
        .then(creature => {
          res.status(200).send(`Creature updated successfully!\n${creature}`);
        })
        .catch(error => {
          res.json({
            message: "Failed to update creature!"
          });

          console.log(error);
        });
    } finally {
      next();
    }
  }

  // DELETE BY PARAMS
  public async deleteByName(req: Request, res: Response, next: NextFunction) {
    let { creatureName } = req.params;

    try {
      await Creature.findOneAndDelete({ creatureName: creatureName })
        .then(creature => {
          res.status(200).send(`Creature deleted successfully!\n${creature}`);
        })
        .catch(error => {
          res.json({
            message: "Failed to delete creature!"
          });

          console.log(error);
        });
    } finally {
      next();
    }
  }
}
