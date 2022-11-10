<template>
  <div>
    {{ title }}
    <div>
    <h4>count: {{ count }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ['count'],
  data() {
    return {
      title: "App3 Content is loaded by federating components from App1 (Remote component)",
    };
  },
};
</script>

<style>
div {
  font-family: Arial, Helvetica, sans-serif;
}
</style>