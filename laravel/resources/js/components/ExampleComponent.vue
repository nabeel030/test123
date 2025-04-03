<template>
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-full max-w-2xl">
            <div class="bg-white shadow-lg rounded-lg">
                <div class="bg-blue-500 text-white text-lg font-semibold p-4 rounded-t-lg">
                    WhatsApp Login
                </div>

                <div class="p-6">
                    <img :src="qrcode" alt="qr-code" class="mx-auto" v-if="qrcode">
                    <div v-if="!loginStatus && !qrcode.length" class="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                        role="alert">
                        <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                            <span class="font-medium">Wait for QR Code...</span>
                        </div>
                    </div>
                    <div v-if="loginStatus" class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                        <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <div>
                            <span class="font-medium">Loggedin Successfully!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const qrcode = ref('');
const loginStatus = ref(false);
const logoutStatus = ref(false);

onMounted(() => {
    console.log("Listening for Pusher events...");
    window.Echo.channel("botsify")
        .listen(".qrcode.sent", (data) => {
            qrcode.value = data.url;
        })
        .listen(".login.status", (data) => {
            loginStatus.value = data.status;
            qrcode.value = '';
        });
});

onBeforeUnmount(() => {
    window.Echo.leaveChannel("botsify");
});
</script>
