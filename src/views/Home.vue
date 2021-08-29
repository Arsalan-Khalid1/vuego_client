<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to Vango 
        </p>
        <p class="subtitle">
          The best clothing store online
        </p>
      </div>
    </section>
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          Latest Products
        </h2>
      </div>
      <ProductCard
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product"
       />
    
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'Home',

  data() {
    return {
      latestProducts: []
    }
  },
  
  components: {
      ProductCard
  },

  mounted() {
    this.getLatestProducts();
    document.title = 'home | Vango'
  },

  methods: {
    async getLatestProducts() {
      this.$store.commit("setIsLoading", true)
      axios.get('/api/v1/latest-products/')
        .then(response => {
          this.latestProducts = response.data;
        })
        .catch(error => {
          console.log("error ", error);
        })
          this.$store.commit("setIsLoading", false)
    }
  },

}
</script>

<style scoped> 
  
</style>
