<template lang="pug">
    .uploader(
        :class="isDrag ? 'dragging' : ''"
        @dragover.prevent="dragover"
        @drop.prevent.stop="dropped"
    )
        label
            .back_screen(style="border: 2px solid black;")
                span.label クリックしてファイルを選択、もしくはドラッグ＆ドロップしてください
                input.file(type="file" @change="dropped($event)")
                .result(v-if="isLoaded")
                    .ok(v-if="valid === 1") 照合結果: 一致
                    .ng(v-if="valid === 0") 照合結果: 不一致
                    .processing(v-if="valid === -1") 照合中…
</template>

<script lang="ts">
import Vue from 'vue';

declare interface Event {
    target: {
        readyState: string | number,
        result: any,
        files: File[],
        error: { name: string }
    },
    dataTransfer: {
        files: File[]
    },
    loaded: boolean,
    total: number
}

export default Vue.extend({
    name: 'FileChecker',
    props: {},
    data() {
        return {
            isDrag: false,
            uploadingFiles: [] as any[],
            valid: -1,
            isLoaded: false
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
        dragover(e: DragEvent) {
            this.isLoaded = false;
            this.isDrag = true;
        },
        dropped(event: Event) {
            // let fileList = event.dataTransfer.files;
            let fileList = event.target.files ? event.target.files : event.dataTransfer.files;
            console.log(fileList);

            const a: any[] = [];
            for (let i = 0; i < fileList.length; i++) {
                a.push(fileList[i]);
            }
            console.log(a);

            if (fileList.length == 0) {
                alert('drop error');
                console.log(event);
                return false;
            }

            console.log(event);

            this.valid = -1;
            this.isDrag = false;
            this.isLoaded = true;
            let files: File[] = [];
            for (let i = 0; i < fileList.length; i++) {
                files.push(fileList[i]);
            }

            this.uploadingFiles = files;

            const img = this.uploadingFiles[0];
            let reader_pre = new FileReader();

            reader_pre.onload = () => {
                const file_as_text: string | ArrayBuffer | null = reader_pre.result!;

                // @ts-ignore
                const result: 0 | 1 | -1 = Math.round(Math.random());
                this.valid = result;
                this.isLoaded = true;
            };

            setTimeout(() => {
                reader_pre.readAsText(img);
            }, 2000);
        }
    }
});
</script>

<style scoped lang="less">

//* {
//    outline: 1px solid black;
//}

.uploader {
    color: white;

    &.dragging {
        outline: 6px dotted green;

        .back_screen {
            background-color: green;
        }
    }
}

.back_screen {
    width: 90vw;
    height: 90vh;
    margin: 0;
    background-color: black;
    opacity: 0.5;
    text-align: center;
}

label {
    //display: block;
}

span.label {
    position: relative;
    top: 45%;
}

input.file {
    display: none;
}

.result {
    .res () {
        font-size: 2rem;
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        width: 300px;
        height: 50px;
    }

    .ok {
        border: 3px double blue;
        color: blue;
        background-color: lightblue;
        .res();
    }

    .ng {
        border: 3px double red;
        color: red;
        background-color: pink;
        .res();
    }

    .processing {
        border: 3px double orange;
        color: orange;
        background-color: #ffffb6;

        .res();
    }
}
</style>
