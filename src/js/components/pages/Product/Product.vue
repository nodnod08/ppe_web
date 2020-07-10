<template>
  <div class="container">
    <br />
    <br />
    <br />
    <br />
    <div v-if="product.data != null && typeof product.data != 'undefined'" class="row">
      <div class="col-lg-5">
        <img style="width: 300px; height: 300px" :src="'/storage/' + product.data.photo_name" alt />
      </div>
      <div class="col-lg-7">
        <p>
          <b>BRAND</b>
          {{ product.data.brand.brand_name }}
        </p>
        <p>
          <b>ITEM NAME</b>
          {{ product.data.item_name }}
        </p>
        <p>
          <span
            :class="product.data.stocks == 0 ? 'badge badge-warning' : 'badge badge-success'"
          >{{ product.data.stocks }} on stocks</span>
        </p>
        <br />
        <div class="content" v-html="product.data.content"></div>
      </div>
    </div>
    <div v-else class="row">
      <div class="text-center col-lg-12">
        <h4>Item not found</h4>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      parser: new DOMParser()
    };
  },
  computed: {
    product: function() {
      return JSON.parse(this.data);
    }
  },
  created() {}
};
</script>

<style>
.content {
  background: #f5f5f5;
  padding: 2%;
  border-radius: 1%;
}
</style>
