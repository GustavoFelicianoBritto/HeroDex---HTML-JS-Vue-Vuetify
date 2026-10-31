const { createApp, ref, computed, onMounted } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify({

    theme: {
            defaultTheme: 'dark',
            themes: {
                dark: {
                    colors: {
                        
                        background: 'transparent',
                        
                    },
                },
            },
        },
    });




const app = createApp({

    setup() {

        const heroList = ref([]);
        const isLoading = ref(false);
        const searchQuery = ref('');
        const filteredHeroes = computed(() => {
            const query = searchQuery.value.trim().toLowerCase();

            if (!query) {
                return heroList.value;
            }

            return heroList.value.filter((hero) =>
                hero.name.toLowerCase().includes(query)
            );
        });

        const dialog = ref(false);
        const selectedHero = ref(null);





        const fetchHeroes = async () => {

            isLoading.value = true;

            try {
                
                const response = await fetch(`https://cdn.jsdelivr.net/gh/GustavoFelicianoBritto/NordexMultiversoDP@v1.0.2/api/all.json`);

                const data = await response.json();

                heroList.value = data;


            }
            catch (error) {
                console.error('Erro ao buscar dados dos heróis:', error);
                isLoading.value = false;
            }
            finally {
                isLoading.value = false;
            }
        };

        onMounted(() => {

            fetchHeroes();



        });


        const verdetalhes = (heroi) => {
            selectedHero.value = heroi;
            dialog.value = true;
        }






        return {
            heroList,
            searchQuery,
            filteredHeroes,
            isLoading,
            selectedHero,
            dialog,
            verdetalhes,



        }

    }



});


app.use(vuetify);
app.mount('#app');





