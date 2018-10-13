<template>
    <div>
        <div class="columns box-title is-gapless is-mobile">
            <div class="column">
                <slot name="titleCard"></slot>
            </div>
            <span class="column icon is-1"  @click="activeClass()">
                <i v-if="isActive" class="fas fa-2x fa-angle-down"></i>
                <i v-if="!isActive" class="fas fa-2x fa-angle-up"></i>
            </span>
        </div>

        <transition name="fade">
            <slot name="contentCard" v-if="isActive"></slot>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        active: Boolean
    },
    data() {
        return {
            isActive: false
        }
    },
    methods: {
        activeClass() {
            this.isActive = !this.isActive;
        }
    },
    created() {
        this.isActive = this.active
    }
}
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
    opacity: 0;
}
</style>


