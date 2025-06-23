"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
describe("Simple Test", function () {
    it("Should pass a basic test", function () {
        (0, chai_1.expect)(1 + 1).to.equal(2);
    });
});
