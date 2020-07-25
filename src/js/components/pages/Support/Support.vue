<template>
  <div class="container">
    <br />
    <br />
    <br />
    <br />
    <div class="row">
      <div class="col-lg-12 col-md-12">
        <h4>Need Solutions? We covered your needs.</h4>
        <p>Contact with us. Fill the form and tell us your concerns or suggestions.</p>
      </div>
      <div class="col-lg-6 col-md-6">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Your Company (Optional)</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <ckeditor height="200px" :editor="editor" v-model="editorData"></ckeditor>
          </div>
          <button type="submit" class="btn btn-sm btn-outline-primary">Submit</button>
        </form>
      </div>
      <div class="col-md-6 col-lg-6">
        <div class="card">
          <img src="/assets/images/settings.jpg" height="300px" class="card-img-tops" alt="..." />
          <div class="card-body">
            <h5 class="card-title">We Provide</h5>
            <p class="card-text">
              <b>Preventive Maintenance Agreement which includes the following:</b>
            </p>
            <ul class="list-unstyled">
              <li>General cleaning of printers</li>
              <li>Printer repair and maintenance</li>
              <li>System testing and diagnostic</li>
              <li>Replacement of defective parts</li>
              <li>Printer Rentals / Fix Monthly (Single Function / Multifunction)</li>
              <li>Free Printer Use (Single Function / Multifunction)</li>
              <li>Comprehensive Maintenance Agreement for Existing Printers</li>
              <li>Cartridge Procurement (Monochrome / Color LaserJet)</li>
              <li>Per Page Charging (Delayed Billing, Monochrome, Color LaserJet)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col-lg-6 col-md-6"></div>
      <div class="col-lg-6 col-md-6">
        <h3>Warranties and Details</h3>
        <p>Know the status of your item, terms and warranty validity.</p>
        <small>We will respond quickly as we can.</small>
        <br />
        <br />
        <form>
          <div class="form-group">
            <label
              for="exampleInputEmail1"
            >PRODUCT ID / SERIAL NUMBER / P.O NUMBER / SALES ORDER NUMBER</label>
            <input
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <button type="submit" class="btn btn-sm btn-outline-primary">Submit</button>
        </form>
      </div>
    </div>
    <br />
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: ["data"],
  data() {
    return {
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
    };
  },
  computed: {},
  created() {},
};
</script>

<style>
.ck-editor__editable {
  min-height: 200px !important;
}

.card-img-tops {
  width: 100%;
  height: 15vw;
  object-fit: cover;
}
</style>
