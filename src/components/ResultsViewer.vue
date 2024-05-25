<script>
export default {
  //fetch('http://localhost:3001/results')
  //.then(res=>res.json()).then(json=>{.....}) 
  props: ['options'],
  data() {
    return {
      isVotes: false,
      results: [],
      participants: 0,
    }
  },
  mounted() {
    fetch('http://localhost:3001/results')
      .then(res => res.json())
      .then(json => {
        this.isVotes = true
        console.log(json);
        this.participants = json.participants
        this.results = json.responses
      })
  },
  computed: {
    bgColor() {
      return this.participants >= 3 ? 'lime' : 'yellow'
    }
  }
}
</script>

<template>
  <div>
    Survey Results:
    <span v-if="!isVotes">Still Opened</span>

    <div v-if="isVotes">
      <div class="results" v-for="(opt, index) in options">
        <span>{{ opt }}: </span> <span> {{ results[index] }} </span>
      </div>
      <br />
      <div class="participants" :style="`background-color: ${bgColor}`">
        <span>Participants: </span><span> {{ participants }} </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.results {
  font-weight: bold;
  background-color: rgb(255, 204, 102);
}

div.participants {
  font-weight: bold;
}
</style>