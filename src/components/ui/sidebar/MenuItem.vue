<template>
  <div :class="className" @click="navigate">
    <a class="menu-link" :class="className" style="padding: 2px 0;">
      <span class="menu-bullet">
        <div class="menu-item">
          <i class="me-2 fas fa-circle-notch text-danger"></i>
        </div>
      </span>
      <span class="menu-title fs-6">{{ label }}</span>
    </a>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "MenuItem",
  props: {
    link: {
      type: String,
      default: "#",
    },
    label: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const router = useRouter();
    const navigate = () => {
      router.push(props.link);
    };
    return {
      navigate,
    };
  },
};
</script>
