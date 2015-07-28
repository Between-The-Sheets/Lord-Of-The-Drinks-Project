var bar = (function () {
    return {
        getAlcohol: function(){
            return [
                'vodka',
                'gin',
                'cointreau',
                'dark-rum',
                'white-rum',
                'coconut-liquor',
                'grenadine',
                'tequila',
                'whiskey',
                'baileys'
            ];
        },
        getNonAlcohol: function(){
            return [
                'coca-cola',
                'soda',
                'orange-juice',
                'tomato-juice',
                'pineapple-juice',
                'red-bull',
                'sprite',
                'tonic',
                'lime',
                'mint'
            ];
        },
        getSubstances: function(){
            return [
                'lime',
                'mint'
            ]
        },
        getRecipes: function() {
            return [
                {
                    name: 'Long Island Iced Tea',
                    ingredients: ['gin', 'tequila', 'vodka', 'white-rum']
                },
                {
                    name: 'Mojito',
                    ingredients: ['lime', 'mint', 'soda', 'white-run']
                },
                {
                    name: 'Pina Colada',
                    ingredients: ['coconut-liquor', 'pineapple-juice', 'white-rum']
                },
                {
                    name: 'Cosmopolitan',
                    ingredients: ['cointreau', 'lime', 'vodka']
                },
                {
                    name: 'Tequila Sunrise',
                    ingredients: ['grenadine', 'orange juice', 'tequila']
                },
                {
                    name: 'Daiquiri',
                    ingredients: ['lime', 'white-rum']
                },
                {
                    name: 'Margarita',
                    ingredients: ['cointreau', 'lime', 'tequila']
                },
                {
                    name: 'Sex on the Beach',
                    ingredients: ['pineapple-juice', 'vodka']
                },
                {
                    name: 'Cuba Libre',
                    ingredients: ['coca-cola', 'white-rum']
                },
                {
                    name: 'Bloody Mery',
                    ingredients: ['tomato-juice', 'vodka']
                }
            ];
        }
    }
}());