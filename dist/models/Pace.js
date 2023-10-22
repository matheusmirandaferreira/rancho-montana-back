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
exports.Pace = void 0;
const typeorm_1 = require("typeorm");
const Horse_1 = require("./Horse");
let Pace = class Pace {
};
exports.Pace = Pace;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Pace.prototype, "uuidpace", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Pace.prototype, "nmpace", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Pace.prototype, "pace_permalink", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Horse_1.Horse, (horse) => horse.color, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'uuidhorse' }),
    __metadata("design:type", Array)
], Pace.prototype, "horses", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', generated: true }),
    __metadata("design:type", String)
], Pace.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', generated: true }),
    __metadata("design:type", String)
], Pace.prototype, "updated_at", void 0);
exports.Pace = Pace = __decorate([
    (0, typeorm_1.Entity)()
], Pace);
