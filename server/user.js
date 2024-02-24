"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUser = exports.User = void 0;
class User {
    constructor(name, uid, favourites) {
        this.admin = false;
        this.uid = uid;
        this.name = name;
        this.favourites = favourites;
    }
    // public addSet(setName: string, set: typeof FlashcardSet): void {
    //     this.sets.set(setName, set);
    // }
    addFavorite(setName) {
        this.favourites.push(setName);
    }
    // public deleteSet(set: string): void {
    //     this.sets.delete(set);
    // }
    enableAdmin() {
        this.admin = true;
    }
    getName() {
        return this.name;
    }
}
exports.User = User;
class AdminUser extends User {
    constructor(name, uid, sets, favourites) {
        super(name, uid, favourites);
        this.admin = true;
    }
}
exports.AdminUser = AdminUser;
