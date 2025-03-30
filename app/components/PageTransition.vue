<template>
    <UTransition :name="name" :mode="mode" :appear="appear">
        <slot />
    </UTransition>
</template>

<script setup>
    defineProps({
        name: {
            type: String,
            default: 'fade'
        },
        mode: {
            type: String,
            default: 'out-in'
        },
        appear: {
            type: Boolean,
            default: false
        }
    })
</script>