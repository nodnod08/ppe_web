<template>
  <div class="container">
    <br />
    <br />
    <br />
    <br />
    <button v-on:click="returnUrl" class="btn btn-sm btn-outline-secondary">
      <i class="fa fa-arrow-circle-left"></i> Go Back
    </button>
    <br />
    <br />
    <div v-if="product != null && typeof product != 'undefined'" class="row">
      <div class="col-lg-5">
        <div class="card mb-4 gradient-border box-shadow" id="box">
          <img class="card-img-top" :src="'/storage/' + product.photo_name" alt="Card image cap" />
        </div>
      </div>
      <div class="col-lg-7">
        <p>
          <b>BRAND:</b>
          {{ product.brand.brand_name }}
        </p>
        <p>
          <b>ITEM NAME:</b>
          {{ product.item_name }}
        </p>
        <p v-if="product.hasOwnProperty('price')">
          <b>ITEM PRICE:</b>
          &#8369;{{ product.price.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") }}
        </p>
        <p>
          <span
            :class="product.stocks == 0 ? 'badge badge-warning' : 'badge badge-success'"
          >{{ product.stocks }} on stocks</span>
        </p>
        <br />
        <div class="content" v-html="product.content"></div>
      </div>
    </div>
    <div v-else class="row">
      <div class="text-center col-lg-12">
        <h4>Item not found</h4>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <div class="col-lg-12 text-center">
        <h4>You may also want this</h4>
      </div>
    </div>
    <br />
    <br />
    <div class="row">
      <div v-for="(product, i) in randoms" v-bind:key="i" class="col-lg-3 col-md-3">
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
            <small v-if="product.hasOwnProperty('price')">
              <b>&#8369; {{ product.price }}</b>
            </small>
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
      parser: new DOMParser(),
    };
  },
  computed: {
    product: function () {
      let result = JSON.parse(this.data);
      return result.data.result;
    },
    randoms: function () {
      let randoms = JSON.parse(this.data);
      return randoms.data.randoms;
    },
  },
  mounted() {
    this.loader();
  },
  methods: {
    returnUrl: function () {
      history.back();
    },
    loader: function () {
      this.$store.dispatch("loader");
    },
  },
};
</script>

<style>
.content {
  border: 0.5px solid #000;
  background: #f5f5f5;
  height: 350px;
  padding: 2%;
  border-radius: 1%;
  overflow-y: scroll;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

#box {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: "Raleway";
  font-size: 2.5rem;
  padding: 5px;
}
.gradient-border {
  --borderWidth: 3px;
  background: none;
  position: relative;
  border-radius: var(--borderWidth);
}
.gradient-border:after {
  content: "";
  position: absolute;
  top: calc(-1 * var(--borderWidth));
  left: calc(-1 * var(--borderWidth));
  height: calc(100% + var(--borderWidth) * 2);
  width: calc(100% + var(--borderWidth) * 2);
  background: linear-gradient(
    60deg,
    #f79533,
    #f37055,
    #ef4e7b,
    #a166ab,
    #5073b8,
    #1098ad,
    #07b39b,
    #6fba82
  );
  border-radius: calc(2 * var(--borderWidth));
  z-index: -1;
  animation: animatedgradient 3s ease alternate infinite;
  background-size: 300% 300%;
}

@keyframes animatedgradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
