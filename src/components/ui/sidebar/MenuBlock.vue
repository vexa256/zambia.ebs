<template>
  <div class="menu-item menu-accordion" data-kt-menu-trigger="click">
    <span class="menu-link">
      <span class="menu-icon">
        <span class="svg-icon svg-icon-2 text-light">
          <i
            :style="{ fontSize: iconSize }"
            :class="iconClass"
            aria-hidden="true"
          ></i>
        </span>
      </span>
      <span class="menu-title">
        {{ title }}
      </span>
      <span class="menu-arrow"></span>
    </span>
    <div class="menu-sub menu-sub-accordion">
      <div :class="['menu-item', submenuClass]">
        <MenuItem
          v-for="(item, index) in menuItems"
          :key="index"
          :label="item.label"
          :className="item.className"
          :link="item.link"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  name: "MenuBlock",
  components: {
    MenuItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    iconClass: {
      type: String,
      required: true,
    },
    iconSize: {
      type: String,
      default: "20px",
    },
    submenuClass: {
      type: String,
      required: true,
    },
    menuItems: {
      type: Array,
      required: true,
    },
  },
};
</script>
