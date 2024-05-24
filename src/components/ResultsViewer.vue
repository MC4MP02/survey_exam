<script>
export default {
  //fetch('http://localhost:3001/results')
  //.then(res=>res.json()).then(json=>{.....}) 
}
</script>

<template>
  <div>
    Survey Results:
    <!-- show it just when there are no results-->
    <span>Still Opened</span>
    <!-- show it just when there are results-->
    <!--
    <div>
      <div class="results"><span>Molt bé: </span><span>5</span></div>
      <div class="results"><span>bé: </span><span>10</span></div>
      <br />
      <div class="participants" style="background-color: lime"><span>Participants:</span><span>30</span></div>
    </div>
    -->
  </div>
</template>

<style scoped>
div.results {
  font-weight: bold;
  background-color:rgb(255, 204, 102);
}

div.participants {
  font-weight: bold;
} 
</style>