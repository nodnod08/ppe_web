<template>
  <nav v-if="TotalPages > 1" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class="Page > 1 ? 'page-item' : 'page-item disabled'">
        <a
          class="page-link"
          :href="'/products?page=' + (Page - 1) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >Previous</a>
      </li>
      <Fragment v-if="Page >= 5">
        <li class="page-item">
          <a
            class="page-link"
            :href="'/products/?page=1' + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
          >1</a>
        </li>
        <li class="page-item disabled">
          <a class="page-link" href="#">...</a>
        </li>
      </Fragment>
      <li v-if="Page - 3 > 0 && Page - 3 != 2" class="page-item">
        <a
          class="page-link"
          :href="'/products?page=' + (Page - 3) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >{{ Page - 3 }}</a>
      </li>
      <li v-if="Page - 2 > 0" class="page-item">
        <a
          class="page-link"
          :href="'/products?page=' + (Page - 2) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >{{ Page - 2 }}</a>
      </li>
      <li v-if="Page - 1 > 0" class="page-item">
        <a
          class="page-link"
          :href="'/products?page=' + (Page - 1) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >{{ Page - 1 }}</a>
      </li>
      <li class="page-item active" aria-current="page">
        <a
          class="page-link"
          aria-disabled="true"
          :href="'/products?page=' + Page + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >
          {{ Page }}
          <span class="sr-only">(current)</span>
        </a>
      </li>
      <li v-if="Page + 1 <= TotalPages" class="page-item">
        <a
          class="page-link"
          :href="'/products?page=' + (Page + 1) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >{{ Page + 1 }}</a>
      </li>
      <li v-if="Page + 2 <= TotalPages" class="page-item">
        <a
          class="page-link"
          :href="'/products?page=' + (Page + 2) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >{{ Page + 2 }}</a>
      </li>
      <li v-if="Page + 3 <= TotalPages && Page + 3 != TotalPages - 1" class="page-item">
        <a
          class="page-link"
          :href="'/products?page=' + (Page + 3) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >{{ Page + 3 }}</a>
      </li>
      <Fragment v-if="Page <= TotalPages - 4">
        <li class="page-item disabled">
          <a class="page-link" href="#">...</a>
        </li>
        <li class="page-item">
          <a
            class="page-link"
            :href="'/products?page=' + TotalPages + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
          >{{ TotalPages }}</a>
        </li>
      </Fragment>
      <li :class="Page != TotalPages ? 'page-item' : 'page-item disabled'">
        <a
          class="page-link"
          :href="'/products?page=' + (Page + 1) + (category != null && isInitial == false) ? `&category=${category}` : `` + (brand != null && isInitial == false) ? `&brand=${brand}` : `` + (isColored != null && isInitial == false) ? `&isColored=${isColored}` : ``"
        >Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Fragment } from "vue-fragment";
export default {
  props: [
    "page",
    "total",
    "total_pages",
    "category_search",
    "brand_search",
    "isColored_search",
    "initially"
  ],
  computed: {
    Page: function() {
      return Number(this.page);
    },
    TotalPages: function() {
      return Number(this.total_pages);
    },
    Total: function() {
      return Number(this.total);
    }
  },
  data() {
    return {
      category: null,
      brand: null,
      isColored: null,
      isInitial: true
    };
  },
  watch: {
    category_search: function(newVal, oldVal) {
      this.category = newVal;
      console.log(newVal);
    },
    brand_search: function(newVal, oldVal) {
      this.brand = newVal;
      console.log(newVal);
    },
    isColored_search: function(newVal, oldVal) {
      this.isColored = newVal;
      console.log(newVal);
    },
    initially: function(newVal, oldVal) {
      this.isInitial = newVal;
    }
  },
  components: {
    Fragment
  }
};
</script>

<style></style>
