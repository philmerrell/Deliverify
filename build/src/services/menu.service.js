/**
 * TODO: Save Menu Item rather than add...
 * */
(function () {
    'use strict';

    angular
        .module('app.services')
        .factory('MenuService', MenuService);

    function MenuService($firebaseArray) {
        var ref = null;
        var menuItemsRef = null;
        var menuItems = null;
        var menuCategoriesRef = null;
        var menuCategories = null;

        var menuItem = {
            Ingredients: []
        };

        var service = {
            addMenuItem         : addMenuItem,
            getMenuItems        : getMenuItems,
            addMenuCategory     : addMenuCategory,
            getMenuCategories   : getMenuCategories,
            removeMenuCategory  : removeMenuCategory,
            removeMenuItem      : removeMenuItem,
            getMenuItem         : getMenuItem,
            saveMenuItem        : saveMenuItem,
            setMenuItem         : setMenuItem,
            setMenuRef          : setMenuRef
        };

        return service;

        function addMenuCategory(category) {
            getMenuCategories().$add(category);
        }

        function getMenuCategories() {
            if(menuCategoriesRef) {
                return menuCategories;
            } else {
                menuCategoriesRef = ref.child("categories");
                menuCategories = $firebaseArray(menuCategoriesRef);
                return menuCategories;
            }
        }

        function removeMenuCategory(category) {
            getMenuCategories().$remove(category);
        }

        function removeMenuItem(item) {
            getMenuItems().$remove(item).then(function(r) {
                console.log(r);
            });
        }

        function addMenuItem(item) {
            getMenuItems().$add(item);
        }

        function getMenuItem() {
            return menuItem;
        }

        function saveMenuItem(item) {
            getMenuItems().$save(item);
        }

        function setMenuRef(uid) {
            ref = firebase.database().ref('stores/' + uid + '/menu');
        }

        function setMenuItem(item) {
            menuItem = item;
            return menuItem;
        }

        function getMenuItems() {
            if(menuItemsRef) {
                return menuItems;
            } else {
                menuItemsRef = ref.child("items");
                menuItems = $firebaseArray(menuItemsRef);
                return menuItems;
            }
        }
    }

    var items = [
        {
            Name: "The Italian",
            Price: 6.24,
            Group: "Sandwiches",
            isModifiable: true,
            Ingredients: [
                { Name: "Bread", Type: "Select", Required: true, Ordered: true, Alternatives: ["Wheat", "Sour Dough", "7 Grain", "Rye", "Bagette"] },
                { Name: "Real genoa salami", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "Italian capicola", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "smoked ham", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "provolone cheese", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "lettuce", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "tomato", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "onion", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "mayo", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "Italian vinaigrette", Type: "Checkbox", Required: false, Ordered: true }
            ],
            Image: "http://cds.arbys.com/images/menu/mf-turkey-swiss-sandwich-1024x557.jpg",
            Path: "turkey-surprise"
        },
        {
            Name: "Going HAM",
            Price: 5.56,
            Group: "Sandwiches",
            isModifiable: true,
            Ingredients: [
                { Name: "Bread", Type: "Select", Required: true, Options: ["Wheat", "Sour Dough", "7 Grain", "Rye", "Bagette"] },
                { Name: "Applewood smoked ham", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "provolone cheese", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "lettuce", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "tomato", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "mayo", Type: "Checkbox", Required: false, Ordered: true }
            ],
            Image: "https://refrigeratorlogic.files.wordpress.com/2008/03/168_ham_sandwich.jpg",
            Path: "going-ham"
        },
        {
            Name: "The Club",
            Price: 5.25,
            Group: "Sandwiches",
            isModifiable: true,
            Ingredients: [
                { Name: "Bread", Type: "Select", Required: true, Options: ["Wheat", "Sour Dough", "7 Grain", "Rye", "Bagette"] },
                { Name: "roast beef", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "smoked ham", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "provolone cheese", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "dijon mustard", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "lettuce", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "tomato", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "mayo", Type: "Checkbox", Required: false, Ordered: true }
            ],
            Image: "http://www.seriouseats.com/images/dt-clubsandwich.jpg",
            Path: "the-club"
        },
        {
            Name: "The Biggin",
            Price: 5.25,
            Group: "Sandwiches",
            isModifiable: true,
            Ingredients: [
                { Name: "Bread", Type: "Select", Required: true, Options: ["Wheat", "Sour Dough", "7 Grain", "Rye", "Bagette"] },
                { Name: "roast beef", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "smoked ham", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "provolone cheese", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "dijon mustard", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "lettuce", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "tomato", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "mayo", Type: "Checkbox", Required: false, Ordered: true }
            ],
            Image: "http://s3-media4.fl.yelpcdn.com/bphoto/NKRANHPwZTXedpmwdFvR5Q/o.jpg",
            Path: "the-biggin"
        },
        {
            Name: "Turkey Sammich",
            Price: 5.25,
            Group: "Sandwiches",
            isModifiable: true,
            Ingredients: [
                { Name: "Bread", Type: "Select", Required: true, Options: ["Wheat", "Sour Dough", "7 Grain", "Rye", "Bagette"] },
                { Name: "roast beef", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "smoked ham", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "provolone cheese", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "dijon mustard", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "lettuce", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "tomato", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "mayo", Type: "Checkbox", Required: false, Ordered: true }
            ],
            Image: "http://s3-media4.fl.yelpcdn.com/bphoto/NKRANHPwZTXedpmwdFvR5Q/o.jpg",
            Path: "the-biggin"
        },
        {
            Name: "The Veggie",
            Price: 5.25,
            Group: "Sandwiches",
            isModifiable: true,
            Ingredients: [
                { Name: "Bread", Type: "Select", Required: true, Options: ["Wheat", "Sour Dough", "7 Grain", "Rye", "Bagette"] },
                { Name: "roast beef", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "smoked ham", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "provolone cheese", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "dijon mustard", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "lettuce", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "tomato", Type: "Checkbox", Required: false, Ordered: true },
                { Name: "mayo", Type: "Checkbox", Required: false, Ordered: true }
            ],
            Image: "http://www.seriouseats.com/images/2011/07/20110714-161185antipastofocaccia.jpg",
            Path: "the-biggin"
        },
        {
            Name: "Coke",
            Price: 1.59,
            Group: "Drinks",
            isModifiable: false,
            Ingredients: [],
            Image: "https://img-new.cgtrader.com/items/146818/large_realistic_coca_cola_can_3d_model_3ds_fbx_c4d_obj__655ab928-6598-46f6-aed8-bff3c86febbb.jpg",
            Path: "coke"
        },
        {
            Name: "Dr. Pepper",
            Price: 1.59,
            Group: "Drinks",
            isModifiable: false,
            Ingredients: [],
            Image: "http://mooresvillemenu.com/wp-content/uploads/2015/03/Dr-Pepper-Classic-1-x-355-ml.jpg",
            Path: "dr-pepper"
        },
        {
            Name: "Sprite",
            Price: 1.59,
            Group: "Drinks",
            isModifiable: false,
            Ingredients: [],
            Image: "http://images.disneyfloralandgifts.com/images//DFnG-Images/Add-On-Custom-gift-builder/DR0016_dt.jpg",
            Path: "sprite"
        },
        {
            Name: "OJ",
            Price: 1.59,
            Group: "Drinks",
            isModifiable: false,
            Ingredients: [],
            Image: "http://www.asterism-healthcareplus.com/images/ahp/drinksnbeverages/fruitjuicecan/fruitjuicecan-orange-1.jpg",
            Path: "oj"
        },
        {
            Name: "Purple Stuff",
            Price: 1.59,
            Group: "Drinks",
            isModifiable: false,
            Ingredients: [],
            Image: "http://ecx.images-amazon.com/images/I/51P89i5PQsL._SL500_AA300_.jpg",
            Path: "purple-stuff"
        },
        {
            Name: "Sunny D",
            Price: 1.59,
            Group: "Drinks",
            isModifiable: false,
            Ingredients: [],
            Image: "http://jughandlesfatfarm.com/wp-content/uploads/2012/04/SunnyD.jpg",
            Path: "sunny-d"
        }

    ];

})();