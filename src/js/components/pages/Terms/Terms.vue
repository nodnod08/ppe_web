<template>
  <div class="container">
    <br />
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-lg-12 text-center">
        <h4>
          <b>PRO PRINTS ENTERPRISE TERMS AND CONDITION</b>
        </h4>
      </div>
      <br />
      <br />
      <div class="col-lg-12">
        <h5>PLEASE READ THESE TERMS OF USE (“TERMS”) CAREFULLY BEFORE USING PRO PRINTS ENTERPRISE WEBSITE.</h5>
      </div>
      <br />
      <br />
      <br />
      <div class="col-lg-12">
        <p>Welcome to the Pro Prints Enterprise. You are reading these Terms because you are using our website, or one of our other products or services, all of which are part of PPE’s Platform. You may access the Platform through a computer, mobile phone, tablet, console, or other technology, which we refer to here as a Device. Your carrier's normal rates and fees apply to your Device.</p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-6">
        <h4>* Website Usage</h4>
        <p>You agree not to use this website to send, post any message or material that is unlawful, harassing, threatening, harmful, hateful, offensive, for example by messaging us that contains a bad behavior on support page. We respect all your concerns and suggestion by messaging us or sending an email.</p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-6">
        <h4>* Protection of Information</h4>
        <p>PPE respects your privacy. When we collect or use your personal data, we will protect your privacy. As this Web Site may contain third party links, PPE shall not be held responsible for how your personal information may be used when accessing or visiting these linked sites.</p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-6">
        <h4>* Information that we collect</h4>
        <p>Pro Prints Enterprise collects and stores personal and client information that you provide when you contact us, complete an application, or send us a letter or e-mail. Personal or client information is information that is used to identify an individual, or customer, including, but not limited to, a first and last name, a company name, email address, (Sales Order Number, P.O, warranty key that came from our items purchased, these are for verifying the validity of warranty and checking some details of items).</p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-lg-6">
        <h4>* How we use them</h4>
        <p>
          Pro Prints Enterprise uses the information that we collect to fulfill the requests for products and services, notifying, conduct research, gathered good information, and provide a fast and solid support for all of clients.
          <br />
          <br />Pro Prints Enterprise protect your information by saving them to our secured databases that no one can steal or hacked. We assure that before saving them into database. It passes through secure connection.
        </p>
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
    return {};
  },
  mounted() {
    this.loader();
  },
  methods: {
    loader: function () {
      this.$store.dispatch("loader");
    },
  },
};
</script>

<style></style>
