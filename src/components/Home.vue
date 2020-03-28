<template>
  <div class="booklist" >
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
      <app-book-card></app-book-card>
  </div>
</template>

<script>
import Card from "./Bookcard";

export default {
  components: {
    appBookCard: Card
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.booklist {
  display: flex;
  flex-wrap: wrap;
}

</style>
