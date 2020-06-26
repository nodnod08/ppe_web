<template>
  <div class="container">
    <br />
    <br />
    <br />
    <br />
    <div v-if="products.data.length" class="row">
      <div v-for="(product, i) in products.data" v-bind:key="i" class="col-md-4">
        <div class="card mb-4 box-shadow">
          <img class="card-img-top" :src="'/storage/' + product.photo_name" alt="Card image cap" />
          <div class="card-body">
            <p class="card-text">
              This is a wider card with supporting text below as a natural lead-in to additional
              content. This content is a little bit longer.
            </p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
              </div>
              <small class="text-muted">9 mins</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["data"],
  data() {
    return {
      items: [],
      page: 1
    };
  },
  computed: {
    products: function() {
      this.items = JSON.parse(this.data);
      return this.items;
    }
  },
  created() {
    console.log(this.products);
  },
  methods: {}
};
</script>

<style></style>
