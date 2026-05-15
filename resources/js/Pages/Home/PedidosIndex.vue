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


    <Tabs value="0" class="w-11/12 mx-auto">
        <TabList class="">
            <Tab value="0" class="text-sm font-bold">Pendentes
                <span class="bg-red-500 text-white rounded-full px-2 py-1 text-xs">{{ pedidosRecebidos.length }}</span>
            </Tab>
            <Tab value="1" class="text-sm font-bold">Prontos
                <span class="bg-green-500 text-white rounded-full px-2 py-1 text-xs">{{ pedidosProntos.length }}</span>
            </Tab>
            <Tab value="2" class="text-sm font-bold">Entregues
                <span class="bg-gray-800 text-white rounded-full px-2 py-1 text-xs">{{ pedidosEntregues.length }}</span>
            </Tab>
        </TabList>
        <TabPanels>
            <TabPanel value="0">

                <div class="flex flex-col gap-4 mt-4 border border-gray-300 rounded-md p-4">

                    <h1 class="text-lg font-bold mt-4">Pedidos Recebidos:</h1>

                    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div v-for="value in pedidosRecebidos" :key="value.timestamp"
                            class="border border-gray-300 rounded-md p-4 mt-4 gap-4 flex flex-col">
                            <div class="flex items-center justify-between">
                                <span class="ml-2">Nome: {{ value.nome }}</span>
                                <span class="ml-2 text-gray-900 text-sm">{{ value.timestamp }}</span>
                            </div>

                            <div>
                                <span class="ml-2 font-bold">Sabores:</span>
                                <div v-for="sabor in value.sabores" :key="sabor"
                                    class="flex bg-gray-100 text-gray-700 px-3 py-1 rounded-md items-center justify-between mt-2">
                                    {{ sabor }}
                                </div>
                            </div>

                            <div class="flex justify-end">
                                <Button label="Pronto" severity="success" @click="doneOrder(value.firebaseKey)" />
                            </div>


                        </div>

                    </div>

                </div>

            </TabPanel>
            <TabPanel value="1">
                <div class="flex flex-col gap-4 mt-4 border border-gray-300 rounded-md p-4">

                    <h1 class="text-lg font-bold mt-4">Pedidos Prontos:</h1>

                    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div v-for="value in pedidosProntos" :key="value.timestamp"
                            class="border border-gray-300 rounded-md p-4 mt-4 gap-4 flex flex-col">
                            <div class="flex items-center justify-between">
                                <span class="ml-2">Nome: {{ value.nome }}</span>
                                <span class="ml-2 text-gray-900 text-sm">{{ value.timestamp }}</span>
                            </div>

                            <div>
                                <span class="ml-2 font-bold">Sabores:</span>
                                <div v-for="sabor in value.sabores" :key="sabor"
                                    class="flex bg-gray-100 text-gray-700 px-3 py-1 rounded-md items-center justify-between mt-2">
                                    {{ sabor }}
                                </div>
                            </div>

                            <div class="flex justify-end gap-4">
                                <Button label="Retornar" severity="warning" @click="returnOrder(value.firebaseKey)" />
                                <Button label="Entregar" severity="success" @click="finishOrder(value.firebaseKey)" />
                            </div>


                        </div>

                    </div>

                </div>

            </TabPanel>
            <TabPanel value="2">




                <div class="flex flex-col gap-4 mt-4 border border-gray-300 rounded-md p-4">

                    <h1 class="text-lg font-bold mt-4">Pedidos Entregues:</h1>

                    <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                        <div v-for="value in pedidosEntregues" :key="value.timestamp"
                            class="border border-gray-300 rounded-md p-4 mt-4 gap-4 flex flex-col">
                            <div class="flex items-center justify-between">
                                <span class="ml-2">Nome: {{ value.nome }}</span>
                                <span class="ml-2 text-gray-900 text-sm">{{ value.timestamp }}</span>
                            </div>

                            <div>
                                <span class="ml-2 font-bold">Sabores:</span>
                                <div v-for="sabor in value.sabores" :key="sabor"
                                    class="flex bg-gray-100 text-gray-700 px-3 py-1 rounded-md items-center justify-between mt-2">
                                    {{ sabor }}
                                </div>
                            </div>

                            <div class="flex justify-end gap-4">
                                <Button label="Retornar" severity="warning"
                                    @click="returnFinishedOrder(value.firebaseKey)" />
                            </div>


                        </div>

                    </div>

                </div>

            </TabPanel>
        </TabPanels>
    </Tabs>



    <footer class="position-fixed bottom-0 left-0 w-full bg-gray-800 text-white text-center py-4">
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

const sabores = ref([]);

const pedidos = ref([]);

const pedidosRecebidos = computed(() => pedidos.value.filter(p => p.status === 'recebido'));
const pedidosProntos = computed(() => pedidos.value.filter(p => p.status === 'pronto'));
const pedidosEntregues = computed(() => pedidos.value.filter(p => p.status === 'entregue'));


const doneOrder = async (firebaseKey) => {
    axios.post('/api/v1/done-order', { firebaseKey })
        .then(response => {
            toast.success(response.data.message);
        })
        .catch(error => {
            console.error(error);
            // Handle error (e.g., show an error message)
        });
};

const finishOrder = async (firebaseKey) => {
    axios.post('/api/v1/finish-order', { firebaseKey })
        .then(response => {
            toast.success(response.data.message);
        })
        .catch(error => {
            console.error(error);
            // Handle error (e.g., show an error message)
        });
};

const returnFinishedOrder = async (firebaseKey) => {

    if (!confirm('Deseja retornar este pedido para "Pronto"?')) {
        return; // Se o usuário cancelar, não faz nada
    }

    axios.post('/api/v1/done-order', { firebaseKey })
        .then(response => {
            toast.success('Pedido retornado para "Pronto"');
        })
        .catch(error => {
            console.error(error);
            // Handle error (e.g., show an error message)
        });
};

const returnOrder = async (firebaseKey) => {

    if (!confirm('Deseja retornar este pedido para "Recebido"?')) {
        return; // Se o usuário cancelar, não faz nada
    }

    axios.post('/api/v1/return-order', { firebaseKey })
        .then(response => {
            toast.success('Pedido retornado para "Recebido"');
        })
        .catch(error => {
            console.error(error);
            // Handle error (e.g., show an error message)
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
