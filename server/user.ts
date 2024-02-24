// import FlashcardSet from "./flashcardSet";
// import Flashcard from './flashcard';

// class User {
//     private uid: string;
//     private name: string;
//     // private sets: Map<string, typeof FlashcardSet>;
//     private favourites: string [];
//     protected admin: boolean = false;

//     public constructor(name: string, uid: string, favourites: string []) {
//         this.uid = uid;
//         this.name = name;
//         this.favourites = favourites;
//     }

//     // public addSet(setName: string, set: typeof FlashcardSet): void {
//     //     this.sets.set(setName, set);
//     // }

//     public addFavorite(setName: string): void {
//         this.favourites.push(setName);
//     }

//     // public deleteSet(set: string): void {
//     //     this.sets.delete(set);
//     // }

//     public enableAdmin() {
//         this.admin = true;
//     }
    
//     public getName(): string {
//         return this.name;
//     }

// }

// class AdminUser extends User {

//     public constructor(name: string, uid: string, sets: Map<string, typeof FlashcardSet>, favourites: string []) {
//         super(name, uid, favourites);
//         this.admin = true;
//     }

//     //TODO: admin-specific methods once we know what the admin should do

// }

// export { User, AdminUser };
  