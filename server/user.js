class User {
    constructor(name, password) {
        this.userID;
        this.name = name;
        this.password = password;
        this.sets = [];
        this.favourites = [];
    }

    addSet(set) {
        this.sets.push(set);
    }

    addFavorite(set) {
        this.sets.push(set);
    }

    deleteSet(set) {
        const i = this.sets.indexOf(set);
        if (i != -1) {
            this.sets.splice(i, 1);
        }
    }
}