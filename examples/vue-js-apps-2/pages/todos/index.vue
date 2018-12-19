<template>
  <section class="todoapp">
    <todo-header/>
    <section class="main" v-if="todos.length">
      <input class="toggle-all" type="checkbox" @click="allDone">
      <label for="toggle-all">Mark all as complete</label>
      <ul class="todo-list">
        <li v-for="todo in todos" :class="{'completed': todo.completed, 'editing': todo === editedTodo}">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button class="destroy" @click="removeTodo(todo)"></button>
          </div>
          <input class="edit" type="text" v-model="todo.title" v-todo-focus="todo == editedTodo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
        </li>
      </ul>
    </section>
    <todo-footer/>
  </section>
</template>

<script>
import TodoHeader from '~components/todos/header'
import TodoFooter from '~components/todos/footer'

export default {
  data() {
    return {
      editedTodo: null
    }
  },
  middleware: 'authenticated',
  created: function () {
    if (!this.$store.getters.isAuthenticated) {
      return;
    }
    this.$dynamoClient.findByUserId(this.$cognitoAuth.getCognitoIdentity(), (error, result) => {
      if (error) {
        this.error = true;
        this.errorMessage = error.message;
        console.error(error);
      } else {
        console.log('find successful:', result);
        var todos = (result.Items[0]) ? result.Items[0].todos : [];
        this.$store.dispatch('setTodos', todos);
      }
    });
  },
  watch: {
    todos: {
      deep: true,
      handler: 'save'
    }
  },
  computed: {
    todos() {
      if (this.$store.getters.currentSlug === 'active') {
        return this.$store.getters.activeTodos
      }
      if (this.$store.getters.currentSlug === 'completed') {
        return this.$store.getters.completedTodos
      }
      return this.$store.getters.allTodos
    }
  },
  methods: {
    allDone() {
      this.$store.dispatch('allDone')
    },
    editTodo(todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },
    doneEdit(todo) {
      this.editedTodo = null
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.$store.dispatch('removeTodo', todo)
      }
    },
    cancelEdit(todo) {
      this.editedTodo = null
      todo.title = this.beforeEditCache
    },
    removeTodo(todo) {
      this.$store.dispatch('removeTodo', todo)
    },
    save() {
      if (!this.$store.getters.isAuthenticated) {
        return;
      }
      this.$dynamoClient.save(this.$cognitoAuth.getCognitoIdentity(), this.$store.getters.allTodos, (error, result) => {
        if (error) {
          this.error = true;
          this.errorMessage = error.message;
          console.error(error);
        } else {
          console.log('save successful:', result);
          this.$store.dispatch('saveTodos')
        }
      });
    }
  },
  directives: {
    'todo-focus'(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  },
  components: {
    TodoHeader,
    TodoFooter
  }
}
</script>
<style>
.container {
  padding-left: 15%;
}

.footer {
  height: 50px;
}
</style>