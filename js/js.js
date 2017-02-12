function troca(a, b)
{
  document.getElementById(a).style.display = "none";
  document.getElementById(b).style.display = "block";
}

troca("espera", "conteudo");

function error(){
  document.getElementById("alert").innerHTML = '<div class="alert alert-danger alert-dismissable fade in" id="error"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> <strong>A pesquisa não pode ser concluida</strong> Verifique sua conexão e se o nome buscado está correto.</div>';
}

function botaZero(num)
{
	if (num < 10)
	{
		return "0" + num;
	}
	else{
		return num;
	}
}
var data = new Date();

function pesqui(cidade){
        if (cidade == "not"){cidade = $("#cidade").val();}
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather",
            data: {
                q: cidade,
                lang: "pt",
                units: "metric",
                APPID: "4931f2ad273bb7518c53a8bc6c58d152"
            },
            dataType: "json",
            success: function(response) {
               console.log(response);
               if (response.cod == "404"){alert(response.message);}
               else{
                    atualy = response;
              }
            },
            failure: function(response){
                atualy = false;
                error();
                troca("espera", "conteudo");
                console.error(response);
            },
            error: function(responde){
              error();
              troca("espera", "conteudo");
            }
        });
    }

    function previsa(cidade)
    {
        if (cidade == "not"){cidade = $("#cidade").val();}
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast",
            data: {
                q: cidade,
                lang: "pt",
                units: "metric",
                APPID: "4931f2ad273bb7518c53a8bc6c58d152"
            },
            dataType: "json",
            success: function(response){
            	previsao = response;
            },
            failure: function(response){
              console.error(response);
              error();
              troca("espera", "conteudo");
            },
            error: function(responde){
              error();
              troca("espera", "conteudo");
            }
        });
    }

function botaZero(dia){
  if (dia.length == 1)
  {
    return "0" + dia;
  }
  else
  {
    return dia;
  }
}

function diaEspe(dia)
    {
      var hora = "hora";
      var idNum = 0;
      var a = 0;
      var t = 0;
      var data;  
      $("#diaEsp").html("Previsão para o dia " + dia);
    	var response = previsao;
      var d = dia.split("-");
      for (i in d){
        d[i] = botaZero(d[i]);
      }
      dia = d[0] + "-" + d[1] + "-" + d[2];
    	$("#diaEsp").html("Previsão para o dia " + dia);
      while (a < response.list.length)
      {
        data = response.list[a].dt_txt.substring(0, 10);
        console.log(data);
        console.log(data.length);
        console.log(dia);
        console.log(dia.length);
        if (data == dia)
        {       
          idNum += 1; 
          id = "dia" + idNum;
          diaAtual = data;
          horario = response.list[a].dt_txt.substring(11, 20);
          var previsa = "<br>Hora:<b>" + horario+ "</b><br><br>";
          previsa += "Maxima: " + response.list[a].main.temp_max + "°<br>";
          previsa += "Minima: " + response.list[a].main.temp_min + "°<br>";
          previsa += "Humidade: " + response.list[a].main.humidity+ "%<br>";
          previsa += "</div>";
          $("#" + (hora + t)).html(previsa);
          t += 3
          a += 1;
        }
        else{ a += 1; }
      }    

    }

function mediaDias(cidade){
        if (cidade == "not"){cidade = $("#cidade").val();}
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast/daily",
            data: {
                q: cidade,
                lang: "pt",
                units: "metric",
                APPID: "4931f2ad273bb7518c53a8bc6c58d152"
            },
            dataType: "json",
            success: function(response) {
               if (response.cod == "404"){
                alert(response.message);
                troca("espera", "conteudo");
              }
               else{
               	media = response;
                document.getElementById("atual").innerHTML = atualy.main.temp_max + "°<br><span id='abaixo'>" + response.list[0].weather[0].description + "</span>";
                document.getElementById('title').innerHTML = cidade;
                document.getElementById("tempo").innerHTML = "<img id='imgTem' src='http://openweathermap.org/img/w/" + response.list[0].weather[0].icon +".png'><br>"; 
                var num = "";   
                num += "Máxima: " + response.list[0].temp.max + "°<br>"; 
                num += "Minima: " + response.list[0].temp.min + "°<br>";
                num += "Humidade: " + response.list[0].humidity + "%<br>";
                num += "Vento: " + response.list[0].speed + " MPH";
                document.getElementById("dados").innerHTML = num;
                var t = 0
                var a = 1;
                proxDias = geraProxDias();
                while (a < 6)
                {
                	var previsa = "<tr onclick='diaEspe(" + '"' + proxDias[a-1] + '"' + ");'>";
                  previsa += "<td>" + proxDias[a-1] + "</td>";
                	previsa += "<td><img src='http://openweathermap.org/img/w/"+(response.list[a].weather[0].icon) +".png'></td>";
                  previsa += "<td>" + response.list[a].weather[0].description + "</td>";
                	previsa += "<td><img src='imgs/max.png' class='flecha'>" + response.list[a].temp.max + "°</td>";
                	previsa += "<td><img src='imgs/min.png' class='flecha'>" + response.list[a].temp.min + "°</td>";
                	previsa += "<td><img src='imgs/humidade.png' class='humidade'>" + response.list[a].humidity + "%</td>";
                	previsa += "</tr>";
                	previsa += "";
                	$("#" + ("dia" + a)).html(previsa);
                	a += 1;
                	}
                  troca("espera", "conteudo");
                }
            },
            failure: function(response) {
                console.error(response);
                console.log("Erro");
                error();
                troca("espera", "conteudo");
            },
            error : function(responde){
              error();
              troca("espera", "conteudo");
            }
        });
    }

function geraProxDias()
{
    var dias = [];
    var now = new Date;
    for (i = 1; i < 6; i ++)
    {
        r = now.setDate(now.getDate() + 1);
        data = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        dias.push(data);
    }
    
    return dias;
} 

$("#cidade").on('keydown', function (event) {
    if (event.keyCode !== 13) return;
       pesqui("not");
       pesqui("not");
       previsa("not");
       mediaDias("not");
       troca("conteudo", "espera");
});

function busca(city){
      pesqui(city);
      pesqui(city);
      previsa(city);
      mediaDias(city);
      pesqui(city);
      pesqui(city);
      previsa(city);
      mediaDias(city);
      troca("conteudo", "espera");
}
