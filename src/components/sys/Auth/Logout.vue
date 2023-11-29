<template>
    <div>
        
    </div>
</template>

<script>
export default {
  mounted() {
    sessionStorage.removeItem('AuthToken');
    window.location = '/';
  },
};

</script>