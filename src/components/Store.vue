<template>
  <div class="container" :class="{loadingItem: isProductLoading}">
    <div class="row text-center" v-if="isProductLoading">
      <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
    </div>
    <div v-else class="row action-panel">
      <div class="col-12">
        <div class="btn-group btn-group-sm pull-right">
          <button id="list" class="btn btn-outline-dark" @click.prevent="changeDisplay(true)">
            <i class="fa fa-list" aria-hidden="true"></i> List
          </button>
          <button id="grid" class="btn btn-outline-dark" @click.prevent="changeDisplay(false)">
            <i class="fa fa-th" aria-hidden="true"></i> Grid
          </button>
        </div>
      </div>
    </div>
  
    <div class="row" >
      <app-product-item  v-for="prod in products" :item="prod" :key="prod.id"></app-product-item>
    </div>
  
  </div>
  </template>
  
  <script>
  import { mapGetters } from 'vuex'
  import axios from 'axios';
  import ProductItem from './product/ProductItem.vue';
  /* import products from '../stores/modules/products'; */
  
  export default {
    data() {
      return {
        loaderColor: "#5cb85c",
        loaderSize: "50px",
        displayList: false,
        products: [],
      }
    },
    async mounted() {
  
  
  await this.getproduct();
  
  },
    computed: {
      ...mapGetters(['products', 'isProductLoading']),
    },
    components: {
      appProductItem: ProductItem,
    },
    methods: {
      async getproduct() {
                  let vm = this;
                  await axios.get('/api/product/all', {})
                      .then((res) => {
                          vm.products = res.data;
                      })
                      .catch((error) => {
                          // error.response.status Check status code
                          console.log(error);
                      }).finally(() => {
                          //Perform action in always
                      });
              },
      changeDisplay(isList) {
        this.displayList = isList;
      }
    }
  }
  </script>
  
  <style>
  .loadingItem {
    align-items: center;
    justify-content: center;
    display: flex;
  }
  
  .action-panel {
    margin-bottom: 10px;
    margin-right: 5px;
  }
  </style>
  