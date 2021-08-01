<template>
    <div class="login-field">
        <input
            @change="$emit('input', $event.target.value)"
            class="login-field__input"
            :value="value"
            placeholder="Name"
        >
    </div>
</template>

<script>
    export default {
        name: 'AuthField',
        props: {
            value: {
                type: String,
                default: '',
            },
        },
    };
</script>

<style lang="sass">
@import "../style/loginField.sass"
</style>
