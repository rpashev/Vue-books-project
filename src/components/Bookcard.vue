<template>
  <div class="single-book">
    <div class="card">
      <div class="card-title">
        <p>{{book.title}}</p>
        <p>{{book.author}}</p>
      </div>
      <img :src="book.imageLink" alt />
    </div>
    <div class="buttons">
        <button> ADD HERE</button>
        <button> ADD HERE</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["book"],
 
};
</script>

<style scoped>
.single-book{
    margin: 3rem;
    box-shadow: 5px 10px #cccaca;
    border-radius: 3%;
}
.single-book:hover {
    transform: scale(1.1);
    transition: 0.5s ease;
}
.card {
  border: 2px solid black;
  position: relative;
  width: 250px;
  height: 420px;
}
.card .card-title p {
  text-align: center;
}
.card img {
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 0;
}
.buttons button {
    border-radius: 0%;
    background: greenyellow;
    width: 50%;
    cursor: pointer;
    
}
</style>
