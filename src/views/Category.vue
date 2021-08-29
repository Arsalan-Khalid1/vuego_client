<template>
  <div class="page-catego">
    <div class="columns is-multiline">
      <h2 class="is-size-2 has-text-centered">
        {{ category.name }}
      </h2>
    </div>
    <ProductCard
        v-for="product in category.products"
        v-bind:key="product.id"
        v-bind:product="product"
       />
  </div>
</template>

<script>
import Axios from "axios";
import { toast } from "bulma-toast";
import ProductCard from '../components/ProductCard.vue'

export default {
  name: "Category",

  components: {
      ProductCard
  },

  data() {
    return {
      category: {
        products: [],
      },
    };
  },

  mounted() {
    this.getCategory();
  },

  methods: {
    async getCategory() {
      const category_slug = this.$route?.params.category_slug;
      this?.$store?.commit("setIsLoading", true);

      try {
        let response = await Axios.get(`/api/v1/product/${category_slug}`);
        this.category = await response?.data;
        document.title = this.category.name + " | Vango";
        this?.$store?.commit("setIsLoading", false);
        return response;
      } catch (err) {
        this?.$store?.commit("setIsLoading", false);
        console.log(err);
        toast({
          message: "Something Went Wrong Please Try Again",
          type: "is-danger",
          dismissible: true,
          position: "bottom-right",
          duration: 2000,
          pauseOnHover: true,
        });
        return err;
      }
    },
  },

  watch: {
      $route(to, from) {
          if(to.name === 'Category') {
              this.getCategory()
          }
      }
  }

};
</script>

<style>
</style>