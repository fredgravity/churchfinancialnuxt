<template>
  <div>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
      <div class="layout-container">
        <!-- Menu -->

        <LayoutSidebar />

        <!-- / Menu -->

        <!-- Layout container -->
        <div class="layout-page">
          <!-- Navbar -->

          <LayoutNavbar />

          <!-- / Navbar -->

          <!-- Content wrapper -->
          <div class="px-4">
            <slot />
          </div>
          <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
      </div>

      <!-- Overlay -->
      <div class="layout-overlay layout-menu-toggle"></div>
    </div>
    <!-- / Layout wrapper -->
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Church Management System", // Other meta information
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "Church",
          name: "Church Finance",
          content: "Church Finance",
        },
      ],
      script: [
        { hid: "qq", src: "./assets/vendor/libs/jquery/jquery.js", defer: false, body: true },
        { hid: "menu", src: "./assets/vendor/js/menu.js", defer: false, body: true },
        { hid: "helpers", src: "./assets/vendor/js/helpers.js", defer: false, body: true },
        { hid: "config", src: "./assets/js/config.js", defer: false, body: true },
        { hid: "bootstrap", src: "./assets/vendor/js/bootstrap.js", defer: false, body: true },
        { hid: "scroll", src: "./assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js", defer: false, body: true },
        { hid: "popper", src: "./assets/vendor/libs/popper/popper.js", defer: false, body: true },
        { hid: "main", src: "./assets/js/main.js", defer: false, body: true },
        { hid: "dashboard", src: "./assets/js/dashboards-analytics.js", defer: false, body: true },
      ],
    };
  },
};
</script>
