<template>
    <Menubar :model="items" class="!bg-[#E2E2E2] !rounded-none !px-8 !py-2"
        :pt="{ itemContent: 'hover:!bg-transparent group' }">
        <template #item="{ item, props }">
            <a v-ripple class="flex items-center" v-bind="props.action">
                <component :is="item.icon" size="15" :color="$page.props.route_name == item.link ? '`#032144`' : '#03214480'"
                    class="group-hover:fill-[#032144] transition-colors" />
                <span class="text-[#03214480] group-hover:!text-[#032144]" :class="{
                    '!text-[#032144]': $page.props.route_name == item.link,
                }">
                    {{ item.label }}
                </span>
            </a>
        </template>
    </Menubar>
</template>

<script setup>
// Imports
import {
    PhUsers,
    PhNote
} from "@phosphor-icons/vue";
import Menubar from 'primevue/menubar';
import {
    computed,
    markRaw
} from "vue";
import {
    router
} from "@inertiajs/vue3";
import { useI18n } from 'vue-i18n'

// Props & Emits

// Uses
const { t } = useI18n();

// Refs & Reactives & Variables

const items = computed(() => [
  {
    id: 1,
    label: t('navbar.usuarios'),
    icon: markRaw(PhUsers),
    command: () => router.get(route('usuarios.index')),
    link: 'usuarios.index',
  },
  {
    id: 2,
    label: t('navbar.servicos'),
    icon: markRaw(PhNote),
    command: () => router.get(route('servicos.index')),
    link: 'servicos.index',
  },
])

// Computed

// Watch

// Methods

// Hooks

</script>
<style scoped></style>
