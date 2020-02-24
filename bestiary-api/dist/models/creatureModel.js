"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.CreatureSchema = new Schema({
    creatureName: {
        type: String,
        required: true,
        default: "Anonymous Creature"
    },
    geographicArea: {
        type: String,
        required: true,
        default: "Anonymous Geographic Area"
    },
    description: {
        type: String,
        required: true,
        default: "Anonymous Description"
    },
    behaviorToHumans: {
        type: String,
        required: true,
        default: "Anonymous Behavior"
    },
    isMagical: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
});
//# sourceMappingURL=creatureModel.js.map