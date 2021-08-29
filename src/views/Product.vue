<template>
    <div v-if="Object.keys(product).length > 0" class="page-product">
        <div class="columns is-multiline">
        <div class="column is-9">
            <figure class="image mb-6">
                <img v-bind:src="product.get_image" alt="">
            </figure>
            <h1 class="title">{{product.name}}</h1>
            <p>{{product.description}}</p>
        </div>
        <div class="column is-3">
            <h2 class="subtitile">Information</h2>
            <p><strong>Price : </strong>${{product.price}}</p>
            <div class="field has-addons mt-6">
                <div class="control">
                    <input type="number" min="1" v-model="quantity" class="input">
                </div>
                <div class="control">
                    <a class="button is-dark" @click="addToCart">Add to Cart</a>
                </div>
            </div>
        </div>
        </div>
    </div>
    <div v-else>
        <h1>Loading</h1>
    </div>
</template>

<script>

import Axios from 'axios';
import {toast} from 'bulma-toast';

export default {
    data() {
        return {
            product: {},
            quantity: 1
        }
    },

    methods: {
        async getProduct() {
            const category_slug = this.$route?.params?.category_slug;
            const product_slug = this.$route?.params?.product_slug;
            try {
                const response = await Axios.get(`/api/v1/product/${category_slug}/${product_slug}`);
                this.product = response?.data;
                return response
            }
            catch (err) {
                console.log("error details ", err);
                return err
            }
        },

        async addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            };

            const item = {
                product : this.product,
                quantity : this.quantity
            };

            await this.$store.commit("addToCart", item);

            toast({
                message: "The product was added to the cart",
                type: "is-success",
                dismissible: true,
                pauseOnHover: true,
                duration: 2000,
                position: "bottom-right"
            })
        }
    },

    mounted() {
        this.getProduct()
    },
}
</script>