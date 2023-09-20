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
});

