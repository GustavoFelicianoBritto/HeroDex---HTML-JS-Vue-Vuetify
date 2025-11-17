const { createApp, ref, onMounted } = Vue;
const { createVuetify } = Vuetify;
const vuetify = createVuetify();

const app = createApp({
    setup() {
        
        const heroList = ref([]); 
        const isLoading = ref(true); 
        const choosenHeroes = ref([]); 

        const battleResult = ref(null); 
        const battleWinner = ref(null);
        const battleOver = ref(false); 

        
        
        const calculatePower = (hero) => {
            if (!hero.powerstats) return 0; 
            
           
            return Object.values(hero.powerstats).reduce((sum, stat) => sum + stat, 0);
        };

        
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

        
        const fetchHeroes = async () => {
            isLoading.value = true;
            try {
                const response = await fetch('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
                const data = await response.json();
                heroList.value = data; 

                
                newBattle(); 

            } catch (error) {
                console.error('Erro ao buscar dados dos heróis:', error);
            } finally {
                isLoading.value = false;
            }
        };

        
        onMounted(() => {
            fetchHeroes();
        });

        
        
        const escolher = (chosenHero) => {
    
            const opponentHero = choosenHeroes.value.find(h => h.id !== chosenHero.id);

            
            const chosenPower = calculatePower(chosenHero);
            const opponentPower = calculatePower(opponentHero);



            
            let actualWinner;

            if (chosenPower > opponentPower) {
                actualWinner = chosenHero;
            } else if (opponentPower > chosenPower) {
                actualWinner = opponentHero;
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
            
            
            battleOver.value = true;
        };


        
        return {
            isLoading,
            choosenHeroes,
            escolher,
            battleResult,
            battleOver,
            newBattle,
            battleWinner,
            
        }
    }
});

app.use(vuetify);
app.mount('#battleApp');