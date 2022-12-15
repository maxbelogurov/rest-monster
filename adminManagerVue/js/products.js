const servUrl = 'http://localhost:8000'
var adminToken = '13303309-d941-486f-b600-3e90929ac50f';
var managerToken = '8178f948-cdc2-4e8c-b013-07a956e7e72a';
var restId = '3a1e6dc1-465f-4c8e-b9a5-a94de93a60c9';

var products = new Vue({
    el: '#app',
    data: {
        products: {},
        newProduct: {
            is_available: true,
            category: '',
            title: '',
            description: '',
            price: 0.00,
            weight: '',
            archived: false,
        },
        categories: {},
        newCategory: '',
    },
    created() {
        Promise.all([
            axios.get(servUrl + '/restaurants/' + restId),
            axios.get(servUrl + '/menu-items/' + restId)
        ]).then( ([restaurant, menu]) => {
            this.categories = restaurant.data.settings.category_sequence;
            this.products = menu.data;
        })
    },
    methods: {
        addNewCategory() {
            let numArr = Object.keys(this.categories);
            let counter = Math.max.apply(null, numArr);
            counter++;
            this.categories[counter] = this.newCategory;
            let newSettings = {
                settings: this.categories
            }
            alert(JSON.stringify(newSettings))
            // alert(JSON.stringify(this.categories))
            // let jsonSettings = JSON.stringify({
            //     settings: {
            //         this.categories.counter =
            //     }
            // })
            // axios.put(servUrl + '/restaurants/' + restId,
            //     JSON.stringify(newSettings) , {
            //         headers: {'Authorization': adminToken, 'Content-Type': 'application/json'}
            //     })
            //     .then(response => {
            //         alert(response)
            //     })
            //     .catch(error => {
            //         alert(error)
            //     })
        },
        addNewProduct() {
            axios.post(servUrl + '/menu-items/' + restId, {
                    headers: {
                        "Authorization": adminToken,
                        "Content-Type": 'application/json'
                    }
                },
                JSON.stringify(this.newProduct)
                )
                .then(response => {
                    alert(response)
                })
                .catch(error => {
                    console.log(this.newProduct)
                    alert(error)
                })
        }

    }
})