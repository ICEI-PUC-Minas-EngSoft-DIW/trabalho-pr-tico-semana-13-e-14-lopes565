const API_URL = 'http://localhost:3000/filmes';

async function renderizarGraficoFilmesPorGenero() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }
        const filmes = await response.json();

        const contagemGeneros = filmes.reduce((acc, filme) => {
            const genero = filme.genero;
            acc[genero] = (acc[genero] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(contagemGeneros);
        const data = Object.values(contagemGeneros);

        const cores = labels.map((_, index) => {
            const hue = (index * 137.508) % 360;
            return `hsl(${hue}, 70%, 50%)`;
        });

        const ctx = document.getElementById('graficoPizzaGeneros').getContext('2d');
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de Filmes',
                    data: data, 
                    backgroundColor: cores,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Distribuição de Filmes por Gênero'
                    }
                }
            }
        });

    } catch (error) {
        console.error("Erro ao carregar ou renderizar o gráfico:", error);
        document.querySelector('.chart-container').innerHTML = 
            '<p style="color: red;">Não foi possível carregar os dados. Verifique se o JSON Server está rodando.</p>';
    }
}

renderizarGraficoFilmesPorGenero();