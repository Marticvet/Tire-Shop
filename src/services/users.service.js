import { RestService } from "./rest.service.js";

export class UsersService extends RestService {
    constructor() {
        super("users");
    }

    // get all users
    getAllUsers() {
        this.resourceUrl = "users";

        return this.getAll();
    }

    // get all users
    getUserCartItems(userId) {
        this.resourceUrl = "https://tireshop-api.herokuapp.com/users/shoppingCart/" + userId;

        return this.getAll();
    }

    // add item to user's shopping cart
    addItemInShoppingCart(data) {
        this.resourceUrl = "users/shoppingCart";

        return this.create(data);
    }

    // edit item quantity in user's shopping cart
    editItemQuantity(id, data) {
        this.resourceUrl = "users/shoppingCart";

        return this.update(id, data);
    }

    // remove item from user's shopping cart
    deleteItemInShoppingCart(id) {
        this.resourceUrl = "users/shoppingCart/" + id;

        return this.delete(id);
    }

    // remove all items from user's shopping cart
    emptyUsersShoppingCart(userId) {
        this.resourceUrl = "users/shoppingCart/" + userId;

        return this.delete(userId);
    }

    // login user and get auth token
    loginUser(data) {
        this.resourceUrl = "users/login";

        return this.create(data);
    }

    // register user
    registerUser(data) {
        this.resourceUrl = "users/register";

        return this.create(data);
    }

    // update user's data
    updateUser(data, userId) {
        this.resourceUrl = "users/update";

        return this.update(userId, data);
    }

    // logout user
    logoutUser() {
        this.resourceUrl = "users/logout";

        return this.delete();
    }
}
