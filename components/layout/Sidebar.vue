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

      <li class="menu-item" v-if="userId == 1">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Users</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/user" class="menu-link">
              <div data-i18n="Without menu">User</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/register" class="menu-link">
              <div data-i18n="Without navbar">Register</div>
            </a>
          </li>
        </ul>
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
      <!-- area -->
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Area</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/area" class="menu-link">
              <div data-i18n="Without menu">Area</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addArea" class="menu-link">
              <div data-i18n="Without navbar">Add Area</div>
            </a>
          </li>
        </ul>
      </li>
      <!-- district -->
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">District</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/district" class="menu-link">
              <div data-i18n="Without menu">District</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addDistrict" class="menu-link">
              <div data-i18n="Without navbar">Add District</div>
            </a>
          </li>
        </ul>
      </li>
      <!-- assembly -->
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Assembly</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/assembly" class="menu-link">
              <div data-i18n="Without menu">Assembly</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addAssembly" class="menu-link">
              <div data-i18n="Without navbar">Add Assembly</div>
            </a>
          </li>
        </ul>
      </li>
      <!-- ministry -->
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Ministry</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/ministry" class="menu-link">
              <div data-i18n="Without navbar">Ministry</div>
            </a>
          </li>
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
          <div data-i18n="Layouts">Tithe</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/tithe" class="menu-link">
              <div data-i18n="Without menu">All Tithe</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/titheMember" class="menu-link">
              <div data-i18n="Without menu">Members Tithe</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addTithe" class="menu-link">
              <div data-i18n="Without menu">Add Tithe</div>
            </a>
          </li>
          <!-- <li class="menu-item">
            <a href="/addMember" class="menu-link">
              <div data-i18n="Without navbar">Add Tithe</div>
            </a>
          </li> -->
        </ul>
      </li>
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Finance</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/budgetItem" class="menu-link">
              <div data-i18n="Without menu">Budget Item</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addBudgetItem" class="menu-link">
              <div data-i18n="Without menu">Add Budget Item</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/budget" class="menu-link">
              <div data-i18n="Without menu">Budget</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addBudget" class="menu-link">
              <div data-i18n="Without navbar">Add Budget</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/expenditure" class="menu-link">
              <div data-i18n="Without menu">Expenditure</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addExpenditure" class="menu-link">
              <div data-i18n="Without navbar">Add Expenditure</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/income" class="menu-link">
              <div data-i18n="Without menu">Income</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addIncome" class="menu-link">
              <div data-i18n="Without navbar">Add Income</div>
            </a>
          </li>
        </ul>
      </li>
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text">Trainings</span>
      </li>
      <li class="menu-item">
        <a href="#" class="menu-link menu-toggle">
          <i class="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Trainings</div>
        </a>

        <ul class="menu-sub">
          <li class="menu-item">
            <a href="/trainingItem" class="menu-link">
              <div data-i18n="Without menu">Training Item</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="addTrainingItem" class="menu-link">
              <div data-i18n="Without menu">Add Training Items</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/training" class="menu-link">
              <div data-i18n="Without menu">Training</div>
            </a>
          </li>
          <li class="menu-item">
            <a href="/addTraining" class="menu-link">
              <div data-i18n="Without menu">Add Training</div>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
  <!-- / Menu -->
</template>

<script setup>
import { useLoginStore } from "~/stores/LoginStore";
const userId = ref("");

const loginStore = useLoginStore();
onMounted(async () => {
  setTimeout(async () => {
    userId.value = await loginStore.getUserId;
  }, 1000);
});

const getUserID = computed(() => {
  return userId.value == 1 ? true : false;
});
</script>
