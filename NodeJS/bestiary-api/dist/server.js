"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
let PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
//# sourceMappingURL=server.js.map