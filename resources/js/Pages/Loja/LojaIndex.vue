<template>
    <div class="p-8 mx-auto flex flex-col">
        Loja
        <div class="grid grid-cols-2 gap-8">
            <div>
                Produtos
                <InputText v-model="busca"/>
                <div v-for="produto in produtosFiltrados" :key="produto.id" class="flex flex-row gap-2">
                    {{ produto.nome }}
                    {{ produto.preco }}
                    <button class="bg-green-600 rounded px-3 text-sm text-white py-1" @click="adicionarAoCarrinho(produto)">Adicionar</button>
                </div>
            </div>
            <div>
                Carrinho
                <div v-for="item in carrinho" :key="item.id" class="flex flex-row gap-2">
                    {{ item.nome }}
                    {{ item.preco }}
                    <button class="bg-red-600 rounded px-3 text-sm text-white py-1" @click="removerDoCarrinho(item)">Remover</button>
                </div>
                Total = {{ total }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const produtos = ref([]);
const carrinho = ref([]);
const carregando = ref(false);
const busca = ref('')

const total = computed(() =>{
    return carrinho.value.reduce((soma, item) => soma + Number(item.preco), 0).toFixed(2)
})

const produtosFiltrados = computed(() => {
    const termo = busca.value.toLowerCase()
    return produtos.value.filter(produto => produto.nome.toLowerCase().includes(termo))
})


const carregarProdutos = async () => {
    const resultado = await axios.get('/produtos')
    produtos.value = resultado.data
}

const adicionarAoCarrinho = async (produto) => {
    carrinho.value.push(produto)
}

const removerDoCarrinho = async (produto) => {
    const index = carrinho.value.indexOf(produto)
    carrinho.value.splice(index)
}

onMounted(async () => {
    await carregarProdutos()
});

</script>