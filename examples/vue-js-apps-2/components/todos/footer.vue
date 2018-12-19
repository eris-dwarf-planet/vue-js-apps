<template>
  <footer class="footer" v-if="todos.length">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> item
      <span v-if="remaining > 1">s</span> left</span>
    <ul class="filters">
      <li>
        <a hlef="" @click="changeSlug('all')" :class="{ selected: slug == 'all' }">All</a>
      </li>
      <li>
        <a hlef="" @click="changeSlug('active')" :class="{ selected: slug == 'active' }">Active</a>
      </li>
      <li>
        <a hlef="" @click="changeSlug('completed')" :class="{ selected: slug == 'completed' }">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" @click="removeCompleted" v-if="todos.length > remaining"> Clear completed</button>
  </footer>
</template>

<script>
export default {
  computed: {
    todos() {
      return this.$store.getters.allTodos
    },
    actives() {
      return this.$store.getters.activeTodos
    },
    remaining() {
      return this.$store.getters.activeTodos.length
    },
    slug() {
      return this.$store.getters.currentSlug
    }
  },
  methods: {
    removeCompleted() {
      this.$store.dispatch('setTodos', this.actives);
    },
    changeSlug(value) {
      this.$store.dispatch('setSlug', value);
    }
  }
}
</script>
