<template>
  <!-- Menu -->

  <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
    <div class="app-brand demo">
      <a href="index.html" class="app-brand-link">
        <span class="app-brand-text demo menu-text fw-bolder ms-2">CMS</span>
      </a>

      <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
        <i class="bx bx-chevron-left bx-sm align-middle"></i>
      </a>
    </div>

    <div class="menu-inner-shadow"></div>

    <ul class="menu-inner py-1">
      <!-- Dashboard -->
      <li class="menu-item active">
        <a href="/dashboard" class="menu-link">
          <i class="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Dashboard</div>
        </a>
      </li>

      <li class="menu-item">
        <a href="#" class="menu-link">
          <i class="menu-icon tf-icons bx bx-collection"></i>
          <div data-i18n="Basic">Profile</div>
        </a>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Membership</span>
      </li>

      <!-- Members -->
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Members</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/member" class="menu-link">
              <div data-i18n="Without menu">Members</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addMember" class="menu-link">
              <div data-i18n="Without navbar">Add Members</div>
            </a>
          </li>
        </ul>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Groups & Association</span>
      </li>
      <!-- groups -->
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Groups</div>
        </a>

        <ul class="menu-sub">
          <!-- <li class="menu-item">
            <a href="/assembly" class="menu-link">
              <div data-i18n="Without menu">Assembly</div>
            </a>
          </li> -->
          <li class="menu-item">
            <a href="/addAssembly" class="menu-link">
              <div data-i18n="Without navbar">Add Assembly</div>
            </a>
          </li>
          <!-- <li class="menu-item">
            <a href="/ministry" class="menu-link">
              <div data-i18n="Without navbar">Ministry</div>
            </a>
          </li> -->
          <li class="menu-item">
            <a href="/addMinistry" class="menu-link">
              <div data-i18n="Without navbar">Add Ministry</div>
            </a>
          </li>
        </ul>
      </li>
      <!-- financials -->
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Financials</span>
      </li>
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Finance</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/tithe" class="menu-link">
              <div data-i18n="Without menu">Tithe</div>
            </a>
          </li>
          <!-- <li class="menu-item">
            <a href="/addMember" class="menu-link">
              <div data-i18n="Without navbar">Add Tithe</div>
            </a>
          </li> -->
        </ul>
      </li>
    </ul>
  </aside>
  <!-- / Menu -->
</template>

<script>
export default {};
</script>
