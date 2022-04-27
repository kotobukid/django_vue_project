<template>
    <div class="main_app">{{ message_from_parent }}</div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Prop, Vue} from "vue-property-decorator";

@Component({
    components: {}
})
class MainApp extends Vue {
    @Prop({default: ''})
    readonly message_from_parent!: string;
}

export default MainApp;

</script>

<style>
.main_app {
    font-size: 2rem;
}
</style>