import { App } from "./components/todos";
import "../scss/style.css";

const vm: App = new App();
vm.$mount("#app");
window.addEventListener("hashchange", vm.onHashChange);
