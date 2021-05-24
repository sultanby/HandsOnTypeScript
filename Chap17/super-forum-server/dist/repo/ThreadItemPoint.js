"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadItemPoint = void 0;
const typeorm_1 = require("typeorm");
const Auditable_1 = require("./Auditable");
const ThreadItem_1 = require("./ThreadItem");
const User_1 = require("./User");
let ThreadItemPoint = class ThreadItemPoint extends Auditable_1.Auditable {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: "Id", type: "bigint" }),
    __metadata("design:type", String)
], ThreadItemPoint.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("boolean", { name: "IsDecrement", default: false, nullable: false }),
    __metadata("design:type", Boolean)
], ThreadItemPoint.prototype, "isDecrement", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.threadPoints),
    __metadata("design:type", User_1.User)
], ThreadItemPoint.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => ThreadItem_1.ThreadItem, (threadItem) => threadItem.threadItemPoints),
    __metadata("design:type", ThreadItem_1.ThreadItem)
], ThreadItemPoint.prototype, "threadItem", void 0);
ThreadItemPoint = __decorate([
    typeorm_1.Entity({ name: "ThreadItemPoints" })
], ThreadItemPoint);
exports.ThreadItemPoint = ThreadItemPoint;
//# sourceMappingURL=ThreadItemPoint.js.map