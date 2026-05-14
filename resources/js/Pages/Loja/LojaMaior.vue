<template>
    <div class="p-8 mx-auto flex flex-col max-w-4xl">
        <h1 class="text-2xl font-bold">Loja do Desenvolvimento</h1>
        <InputText v-model="busca"/>
        <div class="grid grid-cols-2 gap-8">
            <p v-if="erro.length > 0"> {{ erro }} </p>
            <ProdutoLista 
                :produtos="produtos" 
                :carregando="carregando"
                @adicionar="(produto) => adicionarAoCarrinho(produto)" 
            />  
            <div>
                <h2 class="text-xl font-semibold mb-3">Carrinho</h2>
                <div class="flex flex-col gap-2">
                    <div v-for="item in carrinho" :key="item.id" 
                    class="flex flex-row gap-2 justify-between">
                    <div class="flex flex-row gap-2">
                        <span class="font-bold">{{ item.nome }}</span>
                        <span>R$ - {{ Number(item.preco).toFixed(2) }}</span>
                    </div>
                        <button class="bg-red-600 rounded px-3 text-sm text-white py-1" @click="removerDoCarrinho(item)">Remover</button>
                    </div>
                </div>
                <h2 class="font-bold mt-4">Total = {{ total }}</h2>
            </div>

            

        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import ProdutoLista from '@/Components/ProdutoLista.vue'
import axios from 'axios'

const produtos = ref([]);
const erro = ref('')
const carrinho = ref([]);
const carregando = ref(false);
const busca = ref('');

const total = computed(() =>{
    return carrinho.value.reduce((soma, item) => soma + Number(item.preco), 0).toFixed(2)
})


const carregarProdutos = async () => {
    try{
        carregando.value = true
        const resultado = await axios.get('/produtos/todos', {
            params: { q: busca.value.toLowerCase() }
        })
        produtos.value = resultado.data
    } catch(e) {
        erro.value = e
    } finally {
        carregando.value = false
    }
}

const adicionarAoCarrinho = async (produto) => {
    carrinho.value.push(produto)
}

const removerDoCarrinho = async (produto) => {
    const index = carrinho.value.indexOf(produto)
    carrinho.value.splice(index)
}

let timeout = null;
watch(busca, () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        carregarProdutos()
    }, 500)
})


onMounted(async () => {
    await carregarProdutos()
});

</script>
