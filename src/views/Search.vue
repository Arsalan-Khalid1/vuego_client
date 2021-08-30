<template>
  <div class="page-search">
      <div class="columns is-multiline">
          <div class="column is-12">
              <h1 class="title">Search</h1>
              <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
          </div>
          <ProductCard 
          v-for="product in products"
          v-bind:key="product.id"
          v-bind:product="product" />
      </div>
  </div>
</template>

<script>

import Axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

export default {
    name: 'Search',

    data () {
        return {
            products: [],
            query: ''
        }
    },

    mounted () {
        document.title = "Search | Vango";
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        if (params.get('query')) {
            this.query = params.get('query')
            this.performSearch()
            };
    },

    components: {
        ProductCard
    },

    methods: {
         async performSearch() {
                this.$store?.commit("setIsLoading", true);
            try {
                let response = await Axios.post('/api/v1/products/search/', {'query': this.query});
                this.products = response?.data;
                this.$store?.commit("setIsLoading", false);
            }
            catch (err) {
                console.log("error", err);
                this.$store?.commit("setIsLoading", false);
            }
        }
    

    }
}
</script>

<style>

</style>