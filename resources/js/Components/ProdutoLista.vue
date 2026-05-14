<template>
    <p v-if="carregando">Carregando...</p>
    <div v-else>
        <h2 class="text-xl font-semibold mb-3">Produtos</h2>
        <div class="flex flex-col gap-2">
            <div v-for="produto in produtos" :key="produto.id" class="flex flex-row gap-2 justify-between">
                <div class="flex flex-row gap-2">
                    <span class="font-bold">{{ produto.nome }}</span>
                    <span>R$ - {{ Number(produto.preco).toFixed(2) }}</span>
                </div>
                <button class="bg-green-600 rounded px-2 text-sm text-white py-1 justify-between"
                    @click="$emit('adicionar', produto)">Adicionar</button>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    produtos: {
        type: Array,
        required: true
    },
    carregando: {
        type: Boolean,
        default: false
    }
})

defineEmits(['adicionar'])

</script>