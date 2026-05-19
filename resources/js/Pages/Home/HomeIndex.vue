<template>

        <Head title="" />

        <nav>
            <div class="flex items-center justify-around p-4 bg-gray-800 text-white">
                <div class="flex items-center gap-4">
                    <h1 class="text-xl font-bold">Sistema de Pedidos</h1>
                    <div>
                        <a href="/" class="text-white hover:text-gray-300">Caixa</a>
                        <a href="/pedidos" class="text-white hover:text-gray-300 ml-4">Pedidos</a>
                    </div>
                </div>
                
                <button class="bg-red-500 text-white rounded-md px-4 py-2 ml-3" @click="logout">Logout</button>
                
            </div>
        </nav>

        <div class="grid lg:grid-cols-2 sm:grid-cols-1 gap-4 w-11/12 mx-auto">
            <div class="flex flex-col gap-4 w-12/12 mt-4 border border-gray-300 rounded-md p-4">
                <h1 class="text-lg font-bold mt-4">Faça o pedido:</h1>
                <input type="text" placeholder="Nome do Cliente" class="border border-gray-300 rounded-md p-2" v-model="nome" />
                <p class="text-lg text-gray-500">Selecione os sabores:</p>
                <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
                    <Button label="Alho e Óleo" severity="secondary" @click="addSabor('Alho e Óleo')" />
                    <Button label="Mussarela" severity="secondary" @click="addSabor('Mussarela')" />
                    <Button label="Cebolinha" severity="secondary" @click="addSabor('Cebolinha')" />
                    <Button label="Milho" severity="secondary" @click="addSabor('Milho')" />
                    <Button label="Doritos" severity="secondary" @click="addSabor('Doritos')" />
                    <Button label="Cheddar" severity="secondary" @click="addSabor('Cheddar')" />
                    <Button label="Leite Condensado" severity="secondary" @click="addSabor('Leite Condensado')" />
                </div>
                <div class="flex flex-col gap-2">
                    <input type="text" placeholder="Outro sabor..." class="border border-gray-300 rounded-md p-2" v-model="outroSabor" />
                    <button class="bg-blue-500 text-white rounded-md p-2"
                        @click="addSabor(outroSabor)">Adicionar</button>
                </div>


            </div>

            <div class="flex flex-col gap-4 w-12/12 mt-4 border border-gray-300 rounded-md p-4">


                <h3 class="text-lg font-bold mt-4">Carrinho</h3>
                <p class="text-lg text-gray-500">Nome: {{ nome }}</p>
                <div class="flex flex-col gap-1 mt-2">
                    <span v-for="(sabor, index) in sabores" :key="index"
                        class="flex bg-gray-100 text-gray-700 px-3 py-1 text-lg rounded-md items-center justify-between">
                        {{ sabor }}
                        <Button icon="pi pi-times" severity="danger" variant="text" rounded aria-label="Cancel"
                            @click="removeSabor(index)" />
                    </span>
                </div>
                <div class="flex flex-col gap-2 mt-4">
                    <span class="text-lg text-gray-500">Total de Pizzas: {{ sabores.length }}</span>
                    <span class="text-lg text-gray-500">Total: R$ {{ (sabores.length * 10).toFixed(2) }}</span>
                </div>

                <button class="bg-green-500 text-white rounded-md p-2" @click="sendOrder">Enviar</button>
            </div>

        </div>

        <div class="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 w-11/12 mx-auto">

        <div class="flex flex-col gap-4 mt-10 border border-gray-300 rounded-md p-4">

            <h1 class="text-lg font-bold mt-4">Pedidos Recebidos:</h1>

            <div class="flex flex-col gap-2">
            <VirtualScroller :items="pedidosRecebidos" :itemSize="50" class="rounded-md"
                style="width: auto; height: 300px;">
                <template v-slot:item="{ item }">
                    <div class="border border-gray-300 rounded-md p-4 flex flex-col mt-2">
                    <div class="flex items-center justify-between">
                        <span class="ml-2">Nome: {{ item.nome }}</span>
                        <span class="ml-2 text-gray-900 text-sm">{{ item.timestamp }}</span>
                        <span class="ml-2 text-gray-900 text-sm">Status: {{ item.status }}</span>
                        <span class="ml-2 text-gray-900 text-sm">R$ {{ item.valor }},00</span>
                    </div>
                    </div>

                </template>
            </VirtualScroller>

            </div>

        </div>

        <div class="flex flex-col gap-4 mt-10 border border-gray-300 rounded-md p-4">

            <h1 class="text-lg font-bold mt-4">Pedidos Prontos:</h1>
            <VirtualScroller :items="pedidosProntos" :itemSize="50"
                style="width: auto; height: 300px;">
                <template v-slot:item="{ item }">
                    <div class="border border-gray-300 rounded-md p-4 flex flex-col mt-2">
                    <div class="flex items-center justify-between">
                        <span class="ml-2">Nome: {{ item.nome }}</span>
                        <span class="ml-2 text-gray-900 text-sm">{{ item.timestamp }}</span>
                        <span class="ml-2 text-gray-900 text-sm">Status: {{ item.status }}</span>
                        <span class="ml-2 text-gray-900 text-sm">R$ {{ item.valor }},00</span>
                    </div>
                    </div>

                </template>
            </VirtualScroller>

        </div>

        <div class="flex flex-col gap-4 mt-10 border border-gray-300 rounded-md p-4">

            <h1 class="text-lg font-bold mt-4">Pedidos Entregues:</h1>

            <VirtualScroller :items="pedidosEntregues" :itemSize="50"
                style="width: auto; height: 300px;">
                <template v-slot:item="{ item }">
                    <div class="border border-gray-300 rounded-md p-4 flex flex-col mt-2">
                    <div class="flex items-center justify-between">
                        <span class="ml-2">Nome: {{ item.nome }}</span>
                        <span class="ml-2 text-gray-900 text-sm">{{ item.timestamp }}</span>
                        <span class="ml-2 text-gray-900 text-sm">Status: {{ item.status }}</span>
                        <span class="ml-2 text-gray-900 text-sm">R$ {{ item.valor }},00</span>
                    </div>
                    </div>

                </template>
            </VirtualScroller>

        </div>
        </div>

        <footer class="flex items-center justify-center p-4 bg-gray-800 text-white mt-10 text-sm">
            <span>&copy; 2026 Anderson Conterno - Todos os direitos reservados.</span>
        </footer>


</template>

<script setup>
// -----------------------------
// Imports
// -----------------------------
import { Head } from '@inertiajs/vue3';
import Layout from '@/Layouts/Layout.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { db } from '@/Utils/firebase';
import { ref as dbRef, onValue } from "firebase/database";
import { subscribe } from 'firebase/data-connect';
import { computed } from 'vue';


const toast = useToast();

const nome = ref('');
const sabores = ref([]);
const outroSabor = ref('');

const pedidos = ref([]);

const pedidosRecebidos = computed(() => pedidos.value.filter(p => p.status === 'recebido'));
const pedidosProntos = computed(() => pedidos.value.filter(p => p.status === 'pronto'));
const pedidosEntregues = computed(() => pedidos.value.filter(p => p.status === 'entregue'));

const sendOrder = async () => {

    if(sabores.value.length === 0 && !nome.value) {
        toast.warning('Preencha o nome do cliente e adicione pelo menos um sabor!');
        return;
    }


    if(!nome.value) {
        toast.warning('Insira o nome do cliente!');
        return;
    }

    if(sabores.value.length === 0) {
        toast.warning('Adicione pelo menos um sabor!');
        return;
    }
    

    axios.post('/api/v1/send-order', { nome: nome.value, sabores: sabores.value, valor: sabores.value.length * 10 })
        .then(response => {
            toast.success(response.data.message);
        })
        .catch(error => {
            console.error('Error sending message:', error);
            // Handle error (e.g., show an error message)
        });

};

const addSabor = (sabor) => {
    if (!sabor) {
        toast.warning('Escreva um sabor!');
        return;
    }
    sabores.value.push(sabor);
};

const removeSabor = (index) => {
    sabores.value.splice(index, 1);
};

const logout = async () => {
    axios.post('/api/v1/logout')
        .then(response => {
            toast.success('Logout realizado com sucesso!');
            window.location.href = '/login'; // Redireciona para a página de login
        })
        .catch(error => {
            console.error(error);
            toast.error('Erro ao realizar logout. Tente novamente.');
        });
};

onMounted(() => {
    const pedidosRef = dbRef(db, 'pedidos');
    onValue(pedidosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            // Em vez de Object.values, vamos mapear as chaves e os valores
            const listaFormatada = Object.keys(data).map(key => {
                return {
                    firebaseKey: key, // Guardamos a chave (-OsRk...) aqui
                    ...data[key]      // Espalhamos o restante dos dados do pedido
                };
            });
            pedidos.value = listaFormatada;
        } else {
            pedidos.value = [];
        }
        // toast.info('Novo pedido recebido!');
        //console.log(messages[0].img);
    });
});


</script>
<style scoped></style>
