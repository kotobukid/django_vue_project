<template>
    <div class="main_app">
        <span class="message">{{ message_from_parent }}</span>
    </div>
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

<style scoped lang="less">
.main_app {
    span.message {
        font-size: 2rem;
    }
}
</style>