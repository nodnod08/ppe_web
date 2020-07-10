<template>
  <div class="container">
    <br />
    <br />
    <div class="row">
      <div class="col-lg-12">
        <small>
          <b>Choose Category</b>
        </small>
        <br />
        <div v-for="(cat, i) in categories" class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            v-model="category"
            id="inlineRadio1"
            v-on:change="immediateSearch()"
            v-bind:value="cat.category_name"
          />
          <label class="form-check-label" for="inlineRadio1">{{ cat.category_name }}</label>
        </div>
        <br />
        <small>
          <b>Choose Brand</b>
        </small>
        <br />
        <div v-for="(br, i) in brands" class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            v-model="brand"
            id="inlineRadio1"
            v-on:change="immediateSearch()"
            v-bind:value="br.brand_name"
          />
          <label class="form-check-label logos" for="inlineRadio1">
            <img :src="'/assets/images/' + br.brand_name + '.png'" alt="Card image cap" />
          </label>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div v-if="products.data.length" class="row">
      <div v-for="(product, i) in products.data" v-bind:key="i" class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" :src="'/storage/' + product.photo_name" alt="Card image cap" />
          <div class="card-body">
            <small class="card-title">BRAND: {{ product.brand.brand_name }}</small>
            <br />
            <small class="card-text">
              ITEM NAME:
              {{ ' ' + product.item_name }}
            </small>
            <br />
            <span
              :class="product.stocks == 0 ? 'badge badge-warning' : 'badge badge-success'"
            >{{ product.stocks }} on stocks</span>
            <br />
            <br />
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <a :href="'/product/' + product._id">
                  <button type="button" class="btn btn-sm btn-outline-secondary">
                    <i class="fa fa-info-circle"></i> View Full Details
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row">
      <div class="text-center col-lg-12">
        <h4>No Items Found</h4>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <Paginate
          :page="page"
          :total_pages="total_pages"
          :total="total"
          :category_search="category"
          :brand_search="brand"
          :isColored_search="isColored"
          :initially="initially"
        ></Paginate>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["data"],
  data() {
    return {
      items: [],
      page: 1,
      total: 0,
      total_pages: 0,
      categories: [],
      brands: [],
      colorize: [],
      category: null,
      initially: true,
      brand: null,
      isColored: null
    };
  },
  computed: {
    products: function() {
      this.items = JSON.parse(this.data);
      return this.items;
    }
  },
  created() {
    this.getCategories();
    this.getBrands();
    this.initialize();
  },
  watch: {
    category: function(newVal, oldVal) {
      this.initially = false;
      this.getBrands();
    },
    brand: function(newVal, oldVal) {
      this.initially = false;
    },
    isColored: function(newVal, oldVal) {
      this.initially = false;
    }
  },
  methods: {
    initialize: function() {
      this.page = this.products.current_page;
      this.total = this.products.total;
      this.total_pages = this.products.total_pages;
      this.category = this.products.query.hasOwnProperty("category")
        ? this.products.query.category
        : null;
      this.brand = this.products.query.hasOwnProperty("brand")
        ? this.products.query.brand
        : null;
      this.isColored = this.products.query.hasOwnProperty("isColored")
        ? this.products.query.isColored
        : null;
    },
    getCategories: function() {
      axios.get("/api-item-categories/get-categories").then(res => {
        this.categories = res.data.data;
      });
    },
    getBrands: function() {
      axios
        .post("/api-brands/get-brands-bases", {
          model:
            this.category == "Printers" ? "Printer_Brands" : "Cartridge_Brands"
        })
        .then(res => {
          this.brands = res.data.data;
        });
    },
    immediateSearch: async function() {
      let brand1 = (await this.brand) != null ? `&brand=${this.brand}` : ``;
      let category1 =
        (await this.category) != null ? `&category=${this.category}` : ``;
      let isColored1 =
        (await this.isColored) != null ? `&isColored=${this.isColored}` : ``;
      // setTimeout(() => {
      window.location.href = `/products?page=1${category1}${brand1}${isColored1}`;
      // }, 1000);
    }
  }
};
</script>

<style>
.logos {
  margin-right: 5px;
}
</style>
