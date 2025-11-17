
const { createApp, ref, onMounted } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

const app = createApp({

    setup() {

        const heroList = ref([]);
        const isLoading = ref(false);

        const dialog = ref(false);
        const selectedHero = ref(null);


        const fetchHeroes = async () => {

            isLoading.value = true;

            try {

                const response = await fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');

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
            isLoading,

            selectedHero,
            dialog,
            verdetalhes

        }

    }



});


app.use(vuetify);
app.mount('#app');






