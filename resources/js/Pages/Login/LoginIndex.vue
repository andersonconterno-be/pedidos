<template>

<div class="flex flex-col gap-5">


    <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" v-model="login" />

    </div>
    <div class="flex flex-col gap-1">
        <Password name="password" placeholder="Password" :feedback="false" fluid v-model="password" />

    </div>
    <div class="flex flex-col gap-1">
        <InputText name="nome" type="text" placeholder="Nome" v-model="nome" />

    </div>
    <div class="flex gap-5">
        <Button  severity="secondary" label="Cadastrar" @click="cadastro" />

        <Button  severity="danger" label="Logar" @click="logando" />
    </div>

    <p @click="esquecisenha" class="flex cursor-pointer" >Esqueci minha senha</p>
</div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const login = ref('');
const password = ref('');
const toast = useToast();
const nome = ref('');

const logando = () => {
    if(login.value === '' || password.value === '') {
        toast.error('Preencha todos os campos');
        return;
    }

    axios.post('/api/v1/login',{
        login: login.value,
        password: password.value
    }).then(sucesso => {
        toast.success(sucesso.data.message);
        document.location.href = '/';
    }).catch(erro => {
        toast.error(erro.response.data.error);
    });
}


const cadastro = () => {
    if(login.value === '' || password.value === '' || nome.value === '') {
        toast.error('Preencha todos os campos');
        return;
    }

    axios.post('/api/v1/cadastro',{
        login: login.value,
        password: password.value,
        nome: nome.value
    }).then(sucesso => {
        toast.success(sucesso.data.message);
    }).catch(erro => {
        toast.error(erro.response.data.error);
    });
}

const esquecisenha = async () => {
    if(login.value === '') {
        toast.error('Preencha o campo de login');
        return;
    }

    await axios.post('/api/v1/esqueci-senha', {
        login: login.value
    }).then(sucesso => {
        toast.success(sucesso.data.message);
    }).catch(erro => {
        toast.error(erro.response.data.error);
    });

}
</script>
