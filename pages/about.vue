<template>
    <h2>about!</h2>
    <Button label="Check" icon="pi pi-check" @click="onClick" />
</template>

<script setup>
    const onClick = () => {
        console.log('clicked');
    }
</script>
