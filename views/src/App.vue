<template>
  <div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import "@/assets/css/bootstrap.css";
import "@/assets/css/carousel.css";
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer
  }
};
</script>

<style></style>
