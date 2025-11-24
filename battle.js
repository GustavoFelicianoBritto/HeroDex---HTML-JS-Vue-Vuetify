const { createApp, ref, onMounted } = Vue;
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
        const isLoading = ref(true);
        const choosenHeroes = ref([]);

        const battleResult = ref(null);
        const battleWinner = ref(null);
        const battleOver = ref(false);

        const pontuacao = ref('')
        const fotogato = ref('')
        



        const fetchHeroes = async () => {
            isLoading.value = true;
            try {
                const response = await fetch('https://cdn.jsdelivr.net/gh/GustavoFelicianoBritto/NordexMultiversoDP@v1.0.2/api/all.json');
                const data = await response.json();
                heroList.value = data;


                newBattle();

            } catch (error) {
                console.error('Erro ao buscar dados dos heróis:', error);
                isLoading.value = false;
            } finally {
                isLoading.value = false;
            }
        };



        const randomCat = async () => {

            try{
                const response = await fetch('https://api.thecatapi.com/v1/images/search');
                const data = await response.json();

                fotogato.value = data[0].url;
                


            }
            catch(error){
                console.error('Erro ao buscar foto:', error);
                alert('Erro ao buscar foto:', error)

            }
            
        }


        const newBattle = () => {

            battleResult.value = null;
            battleOver.value = false;
            battleWinner.value = null;

            

            const data = heroList.value;

            if (!data || data.length === 0) return;

            

            const hero1 = data[Math.floor(Math.random() * data.length)];
            let hero2 = data[Math.floor(Math.random() * data.length)];

            while (hero1.id === hero2.id) {
                hero2 = data[Math.floor(Math.random() * data.length)];
            }
            choosenHeroes.value = [hero1, hero2];
        };

        onMounted(() => {
            fetchHeroes();
        });

        const calculatePower = (hero) => {
            if (!hero.powerstats) return 0;


            return Object.values(hero.powerstats).reduce((sum, stat) => sum + stat, 0);
        };

        const escolher = (chosenHero) => {

            const opponentHero = choosenHeroes.value.find(h => h.id !== chosenHero.id);


            const chosenPower = calculatePower(chosenHero);
            const opponentPower = calculatePower(opponentHero);

            const powerDiference = Math.abs(chosenPower - opponentPower);
            const powerSum = chosenPower + opponentPower;

            const delta = powerSum === 0 ? 0 : powerDiference / powerSum;

            const rewardPoint = Math.round(100 * (1 - delta));

            fotogato.value="";



            let actualWinner;

            const currentPoints = parseInt(localStorage.getItem('points') || '0');

            if (chosenPower > opponentPower) {
                actualWinner = chosenHero;



                localStorage.setItem('points', currentPoints + rewardPoint);




            } else if (opponentPower > chosenPower) {
                actualWinner = opponentHero;

                localStorage.setItem('points', 0);



            } else {

                battleResult.value = `EMPATE! Ambos têm ${chosenPower} de poder total.`;
                battleOver.value = true;

                return;
            }


            if (chosenHero.id === actualWinner.id) {
                battleResult.value = `Você Acertou! ${actualWinner.name} vence com ${chosenPower} de poder total (Oponente: ${opponentPower}).
                `;
                
                battleWinner.value = actualWinner;
            } else {
                battleResult.value = `Você Errou! O vencedor é ${actualWinner.name} com ${opponentPower} de poder (Seu herói: ${chosenPower}).`;
                
                battleWinner.value = actualWinner;
            }

            pontuacao.value = `Sua pontuação: ${localStorage.getItem('points')}`

            battleOver.value = true;

            randomCat();

        
        };



        return {
            isLoading,
            choosenHeroes,
            escolher,
            battleResult,
            battleOver,
            newBattle,
            battleWinner,
            pontuacao,
            fotogato


        }
    }
});

app.use(vuetify);
app.mount('#app');