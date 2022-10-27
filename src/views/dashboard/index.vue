<template>
  <div>
    <Card style="margin-top: 10px"></Card>
    <Sale></Sale>
  </div>
</template>

<script>
import Card from "./Card";
import Sale from "./Sale";

export default {
  name: "Dashboard",
  components: {
    Card,
    Sale,
  },
};
</script>

<style scoped></style>
