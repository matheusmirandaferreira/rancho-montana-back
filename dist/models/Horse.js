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
exports.Horse = void 0;
const typeorm_1 = require("typeorm");
const Race_1 = require("./Race");
const Color_1 = require("./Color");
const Pace_1 = require("./Pace");
const Category_1 = require("./Category");
const fs_1 = require("fs");
let Horse = exports.Horse = class Horse {
    toJSON() {
        return Object.assign(Object.assign({}, this), { uuidcolor: undefined, uuidpace: undefined, uuidrace: undefined, uuidcategory: undefined, image: (0, fs_1.readdirSync)('storage/public/')
                .filter((fn) => fn.startsWith(this.uuidhorse))
                .map((image) => `${process.env.APP_BASE_URL}/storage/public/${image}`)[0] || false });
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Horse.prototype, "uuidhorse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Horse.prototype, "nmhorse", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Horse.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Horse.prototype, "uuidcategory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Horse.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category),
    (0, typeorm_1.JoinColumn)({ name: 'uuidcategory' }),
    __metadata("design:type", Category_1.Category)
], Horse.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", String)
], Horse.prototype, "birthdate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Horse.prototype, "uuidrace", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Race_1.Race),
    (0, typeorm_1.JoinColumn)({ name: 'uuidrace' }),
    __metadata("design:type", Race_1.Race)
], Horse.prototype, "race", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Horse.prototype, "uuidcolor", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Color_1.Color),
    (0, typeorm_1.JoinColumn)({ name: 'uuidcolor' }),
    __metadata("design:type", Color_1.Color)
], Horse.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Horse.prototype, "uuidpace", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Pace_1.Pace),
    (0, typeorm_1.JoinColumn)({ name: 'uuidpace' }),
    __metadata("design:type", Pace_1.Pace)
], Horse.prototype, "pace", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz', generated: true }),
    __metadata("design:type", String)
], Horse.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz', generated: true }),
    __metadata("design:type", String)
], Horse.prototype, "updated_at", void 0);
exports.Horse = Horse = __decorate([
    (0, typeorm_1.Entity)()
], Horse);
