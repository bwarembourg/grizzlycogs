new Vue({
  el: '#app',
  data () {
    return {
      albums: null
    }
  },
  mounted () {
    axios
      .get('/.netlify/functions/music')
      .then(response => {
        this.albums = response.data.filter(m => m.type = "album");
      })
  }
})