<template>
  <div>
    <md-table>
      <md-table-row>
        <md-table-head>Product Photo</md-table-head>
        <md-table-head>Product Details</md-table-head>
        <md-table-head>Quantity</md-table-head>
        <md-table-head>Action</md-table-head>
        <md-table-head>Price</md-table-head>
        <md-table-head>Sub Price</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, i) in items" v-bind:key="i">
        <md-table-cell>
          <img :src="'/storage/' + item.photo_name" width="100px" height="100px" alt />
        </md-table-cell>
        <md-table-cell>
          <b>{{ item.item_name }}</b>
          <br />
          {{ item.brand.brand_name }}
        </md-table-cell>
        <md-table-cell>
          <input
            type="number"
            min="1"
            @change="modifySub"
            v-model="item.count"
            class="form-control form-control-sm"
          />
        </md-table-cell>
        <md-table-cell>
          <button class="btn btn-sm btn-outline-danger">
            <i class="fa fa-minus-circle"></i> Remove
          </button>
        </md-table-cell>
        <md-table-cell>
          &#8369;
          {{
          item.price
          .toFixed(2)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }}
        </md-table-cell>
        <md-table-cell>
          &#8369;
          {{
          (item.price * item.count)
          .toFixed(2)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }}
        </md-table-cell>
      </md-table-row>

      <md-table-row>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell>
          <h6>Sub total</h6>
        </md-table-cell>
        <md-table-cell>
          &#8369;
          {{
          subTotal
          .toFixed(2)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }}
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell>
          <h6>Shipping & Tax</h6>
        </md-table-cell>
        <md-table-cell>&#8369; 0.00</md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell>
          <h6>
            <b>Total</b>
          </h6>
        </md-table-cell>
        <md-table-cell>
          &#8369;
          {{
          subTotal
          .toFixed(2)
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
          }}
        </md-table-cell>
      </md-table-row>
      <md-table-row>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell></md-table-cell>
        <md-table-cell>
          <md-button
            class="md-raised md-primary"
            @click="setDoneRoot('first', 'second')"
          >Proceed to Billing Info</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      items: [],
      finish: false,
      subTotal: 0,
    };
  },
  watch: {
    "$store.state.cart.items": function () {
      this.getItemsViaCookies();
    },
  },
  methods: {
    getItemsViaCookies: function () {
      axios
        .post("/api-items/get-all-items", {
          items: this.$store.state.cart.items,
        })
        .then((res) => {
          this.items = res.data.result;
        })
        .then(async () => {
          this.items = await this.items.map((obj) => ({
            ...obj,
            count: Number(1),
            total_price: 1 * obj.price,
          }));
          this.modifySub();
          this.finish = true;
        });
    },
    modifySub: function () {
      this.subTotal = 0;
      this.items.map((item) => {
        this.subTotal += item.price * item.count;
      });
    },
    setDoneRoot(current, next) {
      this.$emit('setItems', this.items)
      this.$emit('firstPass', current, next)
    }
  },
};
</script>

<style>
</style>