<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="./../../../public/ppe/logo_old.png" width="50px" height="45px" alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav ml-auto mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#"
                ><small>FAQ</small> <span class="sr-only">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#"><small>CUSTOMER SERVICE</small></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" tabindex="-1" aria-disabled="true"
                ><small>PRODUCTS</small></a
              >
            </li>
          </ul>
          <form class="form-inline mt-2 mt-md-0">
            <input
              class="form-control form-control-sm mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-sm btn-outline-primary my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  created() {},
  methods: {},
};
</script>

<style></style>
