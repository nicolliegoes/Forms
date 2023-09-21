$(document).ready(function () {
    $("#buscar-cep").click(function () {
        const cep = $("#cep").val();

        // Fazer solicitação AJAX para o ViaCEP
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

        // Obtenha os dados do formulário
        const formData = new FormData(this);

        // Crie um objeto para armazenar os dados do cadastro
        const cadastroData = {};
        formData.forEach((value, key) => {
            cadastroData[key] = value;
        });

        // Armazene temporariamente os dados no SessionStorage
        sessionStorage.setItem("cadastroData", JSON.stringify(cadastroData));

    });
});
