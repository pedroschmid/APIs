"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const creatureModel_1 = require("../models/creatureModel");
const Creature = mongoose.model("Creature", creatureModel_1.CreatureSchema);
class CreatureController {
    // CREATE
    addCreature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let newCreature = new Creature(req.body);
            try {
                yield newCreature
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
            }
            finally {
                next();
            }
        });
    }
    // READ
    readCreature(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Creature.find({})
                    .then(creature => {
                    res.status(200).json(creature);
                })
                    .catch(error => {
                    res.json({
                        message: "Failed to get creatures!"
                    });
                    console.log(error);
                });
            }
            finally {
                next();
            }
        });
    }
    // READ BY PARAMS
    readByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { creatureName } = req.params;
            try {
                yield Creature.findOne({ creatureName: creatureName })
                    .then(creature => {
                    res.status(200).json(creature);
                })
                    .catch(error => {
                    res.json({
                        message: "Failed to get specified creature!"
                    });
                    console.log(error);
                });
            }
            finally {
                next();
            }
        });
    }
    // UPDATE BY PARAMS
    updateByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { creatureName } = req.params;
            let data = req.body;
            try {
                yield Creature.findOneAndUpdate({ creatureName: creatureName }, data, {
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
            }
            finally {
                next();
            }
        });
    }
    // DELETE BY PARAMS
    deleteByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let { creatureName } = req.params;
            try {
                yield Creature.findOneAndDelete({ creatureName: creatureName })
                    .then(creature => {
                    res.status(200).send(`Creature deleted successfully!\n${creature}`);
                })
                    .catch(error => {
                    res.json({
                        message: "Failed to delete creature!"
                    });
                    console.log(error);
                });
            }
            finally {
                next();
            }
        });
    }
}
exports.CreatureController = CreatureController;
//# sourceMappingURL=creatureController.js.map