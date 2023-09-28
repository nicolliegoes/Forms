$(document).ready(function () {
    $("#buscar-cep").click(function () {
        const cep = $("#cep").val();

        $.ajax({
            url: `https://viacep.com.br/ws/${cep}/json/`,
            dataType: "json",
            success: function (data) {
                if (!data.erro) {
                    $("#logradouro").val(data.logradouro);
                    $("#bairro").val(data.bairro);
                    $("#cidade").val(data.localidade);
                    $("#estado").val(data.uf);
                } else {
                    alert("CEP não encontrado.");
                }
            },
            error: function () {
                alert("Ocorreu um erro ao buscar o CEP.");
            }
        });
    });

    document.getElementById("cadastro-form").addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        const cadastroData = {};
        formData.forEach((value, key) => {
            cadastroData[key] = value;
        });

        sessionStorage.setItem("cadastroData", JSON.stringify(cadastroData));

    });

    $(document).ready(function () {
        $("#cadastrar-usuario").click(function () {
            const formData = $("#cadastro-form").serializeArray();
            const cadastroData = {};
            formData.forEach((item) => {
                cadastroData[item.name] = item.value;
            });
    
            $.ajax({
                url: "http://localhost:3000/api/cadastrar-usuario", 
                method: "POST",
                data: JSON.stringify(cadastroData),
                contentType: "application/json",
                success: function (response) {
                    console.log(response.message);
                    window.location.href = "parabens.html";
                },
                error: function () {
                    alert("Erro ao cadastrar usuário.");
                },
            });
        });

    });

    // Função para inicializar o mapa
    function initMap() {
        // Coordenadas do mapa (latitude e longitude)
        const coordenadas = [-23.5505, -46.6333]; // Exemplo: São Paulo

        // Crie um mapa
        const mapa = L.map('mapa').setView(coordenadas, 12); // Nível de zoom inicial

        // Adicione um mapa base (por exemplo, OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapa);

        // Crie um marcador (latitude e longitude)
        const marcador = L.marker(coordenadas).addTo(mapa);

        // Lidar com o clique no botão de localização
        document.getElementById("localizacao-button").addEventListener("click", function () {
            // Centralize o mapa na posição do marcador
            mapa.setView(coordenadas, 12);
        });
    }

    // Chame a função de inicialização do mapa quando o documento estiver pronto
    $(document).ready(function () {
        initMap();
    });


    
});
