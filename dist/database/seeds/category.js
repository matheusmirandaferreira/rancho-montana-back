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
const Category_1 = require("../../models/Category");
class CategorySeeder {
    run(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = dataSource.getRepository(Category_1.Category);
            if (!(yield repository.exist()))
                yield repository.insert([
                    {
                        category_permalink: 'muar',
                        nmcategory: 'Muar',
                    },
                    {
                        category_permalink: 'equino',
                        nmcategory: 'Equino',
                    },
                ]);
        });
    }
}
exports.default = CategorySeeder;
