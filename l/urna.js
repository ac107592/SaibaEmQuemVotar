/*
 * Ah, que legal que tu te interessou pelo
 * código; baixe-o completo (+documentação)
 * aqui: http://github.com/ac107592
 */
var glUfPrn="",glUf="",glCidade="",glCidadeId="",quickCidade="",
num="",st=0,num_ver=0,num_pref=0,daemon=0,
popup='left=0, top=0, status=0, toolbar=0, menubar=0, directories=0',tela=0,
filtro_ajuda=["A-F","G-L","M-R","S-Z"],analisa=1,ajudacomp=""

var msg_nulo='<h4>Você anulou seu voto; você sabe o que realmente significa este "ato"?</h4><p>No final das contas acabou-se transformando numa atitude de passividade diante ao cenário político vigente. Não caia na lenda da anulação das eleições e faça valer a sua vontade. <a href="sobre-o-voto-nulo.htm" class="button orange" target="_blank">Receba aqui maiores esclarecimentos</a></p>'
var msg_branco='<h4>Voce votou em branco; aconteceu quando apertou a tecla "BRANCO"</h4><p>Não é um voto válido e não vai a nenhum candidato. Não há representatividade pois abriu mão do seu direito de voto. Foi uma atitude conformista pois na prática é um gesto de apoio para quem vencer as eleições. Um referendo alienado. <a href="sobre-o-voto-branco.htm" class="button orange" target="_blank">Veja aqui o que significa votar em branco</a></p>'
var msg_legenda='<h4>Você votou na legenda</h4><p>O voto foi ao partido que, depois, serão repassados aos candidatos mais votados. O voto em legenda contribui para o coeficiente partidário, aumentando a chance do seu partido (e candidatos da coligação) em se elegerem.</p>'

var signos=[
	"arian", "taurin", "geminian","cancerian",
	"leonin","virginian","librian","escorpian",
	"sagitárian","capricórnian","aquarian","piscian"
];

var estado_civil=[// 1, 3, 5, 7, 9
	"solteir", "casad", "viúv", "separad", "divorciad"
];

var escolaridade=[
	"não lê e não escreve", "só lê e escreve", "não completou o ensino fundamental (1º grau)",
	"possui apenas o ensino fundamental (1º grau)", "não completou o ensino médio (2º grau)",
	"completou somente o ensino médio (2º grau)", "não concluiu a faculdade",
	"fez faculdade"
];


/*
Count down until any date script-
By JavaScript Kit (www.javascriptkit.com)

Modified by Robert M. Kuhnhenn, D.O.
on 5/30/2006 to count down to a specific date AND time,
and on 1/10/2010 to include time zone offset.

...e otimizado (JS+Math+CSS) por mim XD
*/
function ir(s){s=new String(s);if(s.length==1){return "0"+s}else{return s}}
function countdown(G,J,D,z,I){theyear=G;themonth=J;theday=D;thehour=z;theminute=I;var E=new Date(),B=E.getYear(),m=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");if(B<1000){B+=1900}var S=E.getMonth(),P=E.getDate(),R=E.getHours(),N=E.getMinutes(),H=E.getSeconds(),Q=m[S]+" "+P+", "+B+" "+R+":"+N+":"+H,O=Date.parse(Q)+(-3000*3600),K=(m[J-1]+" "+D+", "+G+" "+z+":"+I),T=Date.parse(K)-(E.getTimezoneOffset()*(60000)),C=T-O,L=Math.floor(C/(3600000*24)),d=Math.floor((C%(3600000*24))/3600000),M=Math.floor(((C%(3600000*24))%(3600000))/60000),F=Math.floor((((C%(3600000*24))%(3600000))%(60000))/1000),A=document;if(L<=0&&d<=0&&M<=0&&F<=0){A.getElementById("form").style.display="none";return}else{A.getElementById("dday").innerHTML=ir(L);A.getElementById("dhour").innerHTML=ir(d);A.getElementById("dmin").innerHTML=ir(M);A.getElementById("dsec").innerHTML=ir(F);setTimeout(function(){countdown(theyear,themonth,theday,thehour,theminute)},1000)}}

function currentYPosition(){if(self.pageYOffset){return self.pageYOffset}if(document.documentElement&&document.documentElement.scrollTop){return document.documentElement.scrollTop}if(document.body.scrollTop){return document.body.scrollTop}return 0}
function elmYPosition(a){var d=document.getElementById(a),c=d.offsetTop,b=d;while(b.offsetParent&&b.offsetParent!=document.body){b=b.offsetParent;c+=b.offsetTop}return c}
function smoothScroll(j){var g=currentYPosition(),a=elmYPosition(j);var b=a>g?a-g:g-a;if(b<100){scrollTo(0,a);return}var e=Math.round(b/100);if(e>=20){e=20}var d=Math.round(b/25);var h=a>g?g+d:g-d;var c=0;if(a>g){for(var f=g;f<a;f+=d){setTimeout("window.scrollTo(0, "+h+")",c*e);h+=d;if(h>a){h=a}c++}return}for(var f=g;f>a;f-=d){setTimeout("window.scrollTo(0, "+h+")",c*e);h-=d;if(h<a){h=a}c++}}

function mostraCamada(id){
	var o=d.getElementById(id)
	o.style.visibility="visible"
	o.style.opacity=1
}

function ocultaCamada(id){
	var o=d.getElementById(id)
	o.style.visibility="hidden"
	o.style.opacity=0
}

function poeClasse(ids,clss){
	tmp=ids.split(",")
	if(tmp.length)
	{
		for(var i=0;i<tmp.length;i++)
			d.getElementById(tmp[i]).className=clss
	}
	else
		d.getElementById(tmp[i]).className=clss
}

function tiraClasse(ids){
	poeClasse(ids,"")
}

function interpretaTeclas(tec){
	if(!tela)
		return

	if(tela != 100){
		if(tec != 27)
			return
		switch(tela){
			case 1: d.getElementById("voltar_busca").click(); break
			case 2: fecha_ajuda(); break
			case 3: fecha_analise()
		}
		return
	}

	switch(tec){
		case 8: set(-1); break
		case 13: set(100); break
		case 27: if(confirm("Deseja reiniciar a urna?")) init_urna(); break
		case 108: abre_ajuda(); break
		case 105: abre_analise(); break
		default:
			if(tec > 47 && tec < 58)
				set(tec-48)
	}
}

function void_main(){

	evMapa()

	AttEvt(d.getElementById("start"), "click", function(){
		smoothScroll("inicio")
		d.getElementById("uf").selectedIndex=0
		abre_busca()
	})

	AttEvt(d.getElementById("voltar_busca"), "click", function(){
		poeClasse("busca","invisivel")
		poeClasse("abertura","sombra")
		tela=0
	})

	AttEvt(d.getElementById("f_af"), "click", function(){ filtra_cidades("a-f") })
	AttEvt(d.getElementById("f_gl"), "click", function(){ filtra_cidades("g-l") })
	AttEvt(d.getElementById("f_mr"), "click", function(){ filtra_cidades("m-r") })
	AttEvt(d.getElementById("f_sz"), "click", function(){ filtra_cidades("s-z") })

	AttEvt(d.getElementById("cidade"), "keyup", function(){ busca_cidades() })

	AttEvt(d.getElementById("b0"), "click", function(){ set(0) })
	AttEvt(d.getElementById("b1"), "click", function(){ set(1) })
	AttEvt(d.getElementById("b2"), "click", function(){ set(2) })
	AttEvt(d.getElementById("b3"), "click", function(){ set(3) })
	AttEvt(d.getElementById("b4"), "click", function(){ set(4) })
	AttEvt(d.getElementById("b5"), "click", function(){ set(5) })
	AttEvt(d.getElementById("b6"), "click", function(){ set(6) })
	AttEvt(d.getElementById("b7"), "click", function(){ set(7) })
	AttEvt(d.getElementById("b8"), "click", function(){ set(8) })
	AttEvt(d.getElementById("b9"), "click", function(){ set(9) })
	AttEvt(d.getElementById("bb"), "click", function(){ set("") })
	AttEvt(d.getElementById("bc"), "click", function(){ set(-1) })
	AttEvt(d.getElementById("bconf"), "click", function(){ set(100) })

	AttEvt(d.getElementById("pnlVoltar"), "click", function(){ abre_busca() })
	AttEvt(d.getElementById("pnlCandidatos"), "click", function(){ abre_ajuda() })

	AttEvt(d.getElementById("reinicia"), "click", function(){ init_urna() })
	AttEvt(d.getElementById("analise"), "click", function(){ abre_analise() })
	AttEvt(d.getElementById("imprima"), "click", function(){ imprime_cola() })
	AttEvt(d.getElementById("compartilhar"), "click", function(){ abre_compartilhar() })

	AttEvt(d.getElementById("pnlVoltarUrna"), "click", function(){ fecha_analise() })

	loaded=1
}

function wr(id,dt){
	d.getElementById(id).innerHTML=dt
}

/** BUSCA */
function abre_busca() {
	poeClasse("abertura,urna,analisevoto","invisivel")
	tiraClasse("busca")
	tela=1
}

function filtra_cidades(filtro){
	var out="",ini=0,fim=0,busca=0,cidades=new Array()

	if(filtro != "")
	{
		busca=filtro.split("-")
		ini=(busca[0]).charCodeAt(0)
		fim=(busca[1]).charCodeAt(0)
	}

	for(var i in cid)
	{
		if(busca)
		{
			comp=cid[i][0].toLowerCase()
			comp=comp.charCodeAt(0)

			if(!(comp >= ini && comp <= fim))
				continue
		}

		cidades.push(i)
	}

	max=cidades.length

	for(var i=0; i<max; i+=3)
	{
		if(i+2 < max)
			out+="<tr><td onClick=\"carregaUrna('" + cidades[i] + "')\">"+ cid[cidades[i]] +"</td><td onClick=\"carregaUrna('" + cidades[i+1] + "')\">"+ cid[cidades[i+1]] +"</td><td onClick=\"carregaUrna('" + cidades[i+2] + "')\">"+ cid[cidades[i+2]] +"</td></tr>"
		else if(i+1 < max)
			out+="<tr><td onClick=\"carregaUrna('" + cidades[i] + "')\">"+ cid[cidades[i]] +"</td><td colspan='2' onClick=\"carregaUrna('" + cidades[i+1] + "')\">"+ cid[cidades[i+1]] +"</td></tr>"
		else
			out+="<tr><td colspan='3' onClick=\"carregaUrna('" + cidades[i] + "')\">"+ cid[cidades[i]] +"</td></tr>"
	}

	d.getElementById("cidade").value=""
	wr("tbCidadesConteudo", "<table>"+out+"</table>")
	smoothScroll("inicio")
}

function busca_cidades(){
	var out="", achou=false,busca=d.getElementById("cidade").value,
	param=busca.split(" "),cidades=new Array()

	for(var i in cid)
	{
		out=new String(" "+cid[i])
		achou=false

		for(var j=0; j<param.length; j++)
		{
			if(param[j] == "")
				continue
			var regexp = eval("/" + param[j] + "/gi")
			if(out.search(regexp) > 0)
				achou=true
		}

		if(achou)
			cidades.push(i)
	}

	max=cidades.length,out=""

	for(var i=0; i<max; i+=3)
	{
		if(i+2 < max)
			out+="<tr><td onClick=\"carregaUrna('" + cidades[i] + "')\">"+ cid[cidades[i]] +"</td><td onClick=\"carregaUrna('" + cidades[i+1] + "')\">"+ cid[cidades[i+1]] +"</td><td onClick=\"carregaUrna('" + cidades[i+2] + "')\">"+ cid[cidades[i+2]] +"</td></tr>"
		else if(i+1 < max)
			out+="<tr><td onClick=\"carregaUrna('" + cidades[i] + "')\">"+ cid[cidades[i]] +"</td><td colspan='2' onClick=\"carregaUrna('" + cidades[i+1] + "')\">"+ cid[cidades[i+1]] +"</td></tr>"
		else
			out+="<tr><td colspan='3' onClick=\"carregaUrna('" + cidades[i] + "')\">"+ cid[cidades[i]] +"</td></tr>"
	}

	wr("tbCidadesConteudo", "<table>"+out+"</table>")
	smoothScroll("inicio")
}

function selUF(uf){
	if(uf == "")
		return

	o=d.getElementById("uf")
	for(var i=0;i<o.options.length;i++){
		v=o.options[i].value
		if(v=="")
			continue
		if(v==uf)
			o.selectedIndex=i
		d.getElementById(v).style.backgroundImage=""
	}

	glUf=uf
	glUfPrn=uf.toUpperCase()
	d.getElementById(uf).style.backgroundImage='url("l/uf/'+uf+'.gif")'
	tiraClasse("tbCidadesCabecalho,tbCidadesConteudo")
	poeClasse("tbCidadesCabecalho","oculto")
	wr("tbCidadesConteudo", '<div class="carregando"></div>')
	d.getElementById("cidade").value=""
	smoothScroll("inicio")

	setTimeout(function(){
		carregaJS("dados/"+uf+".js",function(){
			tiraClasse("tbCidadesCabecalho")
			filtra_cidades("")
		})
	}, 200)
}

function selUFDrop(){
	o=d.getElementById("uf")
	selUF( o.options[o.selectedIndex].value )
}

function evMapa(){
	o=d.getElementById("uf")
	for(var i=0;i<o.options.length;i++)
	{
		s=o.options[i].value
		if(s!='')
			eval('AttEvt(d.getElementById("'+s+'"), "click", function(){selUF("'+s+'")})')
	}

	AttEvt(o, "change", function(){ selUFDrop() })
}


/** URNA ELETRONICA */
function imprime_cola(){
	window.open("imprime-cola.htm", "_blank")
}

function init_urna(){
	num="",st=0,num_ver=0,num_pref=0,daemon=0,tela=100,loaded_urna=1

	som("beep")
	smoothScroll("inicio")
	tiraClasse("atalhos,tela")

	wr("pnlCandidatos", "Números dos candidatos de "+glCidade+" / "+glUfPrn)
	ocultaCamada("fim")
	wr("tela", '<img src="l/carregando.gif" height="140" id="foto"><h4>SEU VOTO PARA</h4><h2 id="escolha">VEREADOR(A)</h2><table id="numero"><tr><td>Número</td><th><div id="digitos"></div></th></tr></table><table id="nome"><tr><td>Nome</td><th id="nome_data"></th></tr></table><table id="partido"><tr><td id="partido_label">Partido</td><th id="partido_data"></th></tr></table><table id="coligacao"><tr><td>Coligação</td><th id="coligacao_data"></th></tr></table><h4 id="feedback"></h4><div id="rodape">Aperte a tecla:<br><div id="voto_legenda">(voto na legenda)</div><blockquote>VERDE para CONFIRMAR este voto<br>LARANJA para CORRIGIR este voto</blockquote></div>')
	atualizaDisplay(0)
}

function atualizaDisplay(b){
	if(daemon)
		return

	o="",max=5
	if(st)
		max=2

	for(i=0; i<max; i++)
	{
		if(num[i])
			v=num[i]
		else
			v="&nbsp;"

		if(b && (num.length == i))
			blink=" id='sel'"
		else
			blink=""

		o+="<span"+ blink +">"+ v +"</span>"
	}
	wr("digitos",o)

	b=(!b)
	setTimeout("atualizaDisplay("+b+")", 500)
}

function vis(id,st){
	o=d.getElementById(id)
	if(st == 0)
		o.style.visibility="hidden"
	else
		o.style.visibility="visible"
}

function status(msk){
	var ids=["numero", "foto", "nome", "feedback", "partido", "partido_label", "coligacao", "rodape", "voto_legenda"]

	for(i=0; i<ids.length; i++)
		vis(ids[i], msk[i])
}

function getCol(n){
	n+=" "
	n=n.substr(0, 2)
	for(var x in col)
		for(i=0; i<col[x].length;i++)
			if(col[x][i] == n)
				return(x)
	return ""
}

function som(f){
	setTimeout(function(){
		wr("speaker", '<object type="application/x-shockwave-flash" data="l/player.swf" width="1" height="1" id="dewplayer" name="dewplayer"><param name="wmode" value="transparent"/><param name="movie" value="l/player.swf"/><param name="flashvars" value="mp3=l/'+f+'.mp3&amp;autostart=1"/></object>')
	}, 5)
}

function vereador(i){
	if(num != "")
		s=num.length
	else
		s=0

	if(s == 5)
		return

	switch(s){
		case 0:
			num+=i
			status("100000000")
		break
		case 1:
			num+=i

			if(typeof prt[num] != "undefined")
			{
				status("100011011")
				wr("partido_data", prt[num])
			}
				else
			{
				status("100100010")
				wr("partido_data", "NÚMERO ERRADO")
				wr("feedback", "VOTO NULO")
			}
		break
		case 2: case 3:
			num+=i
		break
		case 4:
			num+=i
			if(typeof ver[num] != "undefined")
			{
				status("111011110")
				wr("coligacao_data", getCol(num))
				wr("nome_data", ver[num][0])
				o=d.getElementById("foto")
				o.src="l/carregando.gif"
				o.src="fotos/" + glUf + "/" + glCidadeId + "/" + ver[num][1] + ".jpg"
			}
				else
			{
				status("100100010")
				wr("partido_data", "NÚMERO ERRADO")
				wr("feedback", "VOTO NULO")
			}
	}
}

function prefeito(i){
	s=num.length
	if(s == 2)
		return

	switch(s){
		case 0:
			num+=i
			status("100000000")
		break
		case 1:
			num+=i

			if(typeof prf[num] != "undefined")
			{
				status("111011110")
				wr("coligacao_data", getCol(num))
				wr("partido_data", prt[num])
				wr("nome_data", prf[num][0] + "<br><small>VICE: "+ vcp[num][0] +"</small>")
				o=d.getElementById("foto")
				o.src="l/carregando.gif"
				o.src="fotos/" + glUf + "/" + glCidadeId + "/" + prf[num][1] + ".jpg"
			}
				else
			{
				status("100110010")
				wr("partido_data", "NÚMERO ERRADO")
				wr("feedback", "VOTO NULO")
			}
	}
}

function set(i){
	if(st==2)
		return

	smoothScroll("inicio")

	if(i === ""){
		num=""
		status("000100010")
		som("beep")
		wr("feedback", "VOTO EM BRANCO")
		return
	}else if(i < 0){
		num=""
		som("troca")
		status("100000000")
		d.getElementById("foto").src="l/carregando.gif"
		return
	}else if(i == 100){
		if(st){
			status("000000000")
			num_pref=num
			st=2
			daemon=1
			wr("tela", "<p>FIM</p>")
			poeClasse("tela","fim")
			som("fim")
			mostraCamada("fim")
			poeClasse("atalhos","invisivel")
			if(analisa)
				abre_analise()
		}else{
			num_ver=num
			num=""
			status("100000000")
			som("troca")
			d.getElementById("foto").src="l/carregando.gif"

			wr("escolha", "PREFEITO(A)")
			st=1
		}
		return
	}

	i=i.toString()

	som("beep")
	if(st == 0)
		vereador(i)
	else if(st > 0)
		prefeito(i)
}

function carregaUrna(cidid){
	glCidadeId = cidid
	if(typeof cid != "undefined")
		glCidade = cid[cidid]
	else
		glCidade = quickCidade

	wr("modal", "<h1>Inicializando a urna eletrônica de votação...<h1>[ "+glCidade+" / "+glUfPrn+" ]</h1></h1>")
	mostraCamada("modal")
	poeClasse("abertura,busca,urna,analisevoto","invisivel")

	carregaJS("dados/"+glUf+"/"+cidid+".js",function(){
		wr("modal", "")
		init_urna()
		ocultaCamada("modal")
		tiraClasse("urna")
	})
}

function qckUrna(id,o){
	tmp=o.innerHTML.split(" / ")
	quickCidade=tmp[0]
	glUf=tmp[1].toLowerCase()
	glUfPrn=tmp[1]
	carregaUrna(id)
}

function fecha_ajuda(){
	ocultaCamada("modal")
	ocultaCamada("ajuda")
	loaded_urna=1,tela=100
}

function abre_ajuda(){
	tela=2
	out="<h3 style='margin:0 0 10px 0'>Números dos candidatos de "+glCidade+" / "+glUfPrn+" <a href='javascript:fecha_ajuda()' title='Fechar esta janela' class='button small red'><span id='xis'></span>fechar guia</a></h3>"

	for(var i in filtro_ajuda)
	{
		var tmp=( filtro_ajuda[i].toLowerCase() ).split("-")

		ini=(tmp[0]).charCodeAt(0)
		fini=(tmp[1]).charCodeAt(0)

		// Vereadores
		out+='<div><h4><a href="javascript:estica(\'ver'+ filtro_ajuda[i] +'\')">Candidatos (as) a vereador (a) <span>[ '+filtro_ajuda[i]+' ]</span></a></h4><p id="ajuda_ver'+filtro_ajuda[i]+'">'

		j=1
		for(k in ver)
		{
			comp=(ver[k][0][0].toLowerCase()).charCodeAt(0)

			if(!(comp >= ini && comp <= fini))
				continue

			out+="<span><b>"+k+"</b> - "+ ver[k][0] +"</span>"
			if(j%2==0)
				out+="<br>"
			j++
		}
	}

	// Prefeitos
	out+='<div><h4><a href="javascript:estica(\'pref\')">Candidatos (as) a prefeito (a)</a></h4><p id="ajuda_pref" class="sel">'

	j=1
	for(i in prf)
	{
		out+="<span><b>"+i+"</b> - "+prf[i][0]+"</span>"

		if(j%2==0)
			out+="<br>"
		j++
	}

	out+='<a class="button blue" href="prefeitos/'+glArqCidade+"_"+glUf+'.jpg" target="_blank">Visualizar o mosaico destes candidatos</a>'

	out+='</p></div>'

	wr("ajuda", out)
	mostraCamada("modal")
	mostraCamada("ajuda")
}

function abre_compartilhar(){
	tela=2
	out='<h1><a class="button small red" title="Fechar esta janela" href="javascript:fecha_ajuda()"><span id="xis"></span>fechar guia</a></h1><h2>Compartilhe esta página...</h2><h3>Divulgue para os seus amigos no facebook ou informe a todos os seus contatos que seguem você no Twitter sobre o simulador de votação. O Saiba em Quem Votar é indicado para:</h3><ul><li>Todos que possuem aversão ao processo político;</li><li>Pessoas que irão anular o voto;</li><li>Eleitores que já possuem candidato, mas que têm dúvidas a esclarecer e podem sanar pelo menos algumas com as informações que descobre no site;</li><li>Pessoas que têm atitude, querem mudanças no cenário político atual, mas não sabem o que fazer. Compartilhando esta página, você está ajudando de imediato na discussão das eleições e promovendo a transparência de informações.</li></ul><br><br>'+
	'<div id="redes"><a id="facebook" title="Compartilhe no Facebook" href="javascript:" onclick="window.open(\'http://www.facebook.com/sharer.php?s=100&p[title]=Saiba+em+quem+votar+em+2012&p[summary]=Conhe%C3%A7a%2C%20comente%2C%20compartilhe%20e%20controle%20sua%20escolha.%20Saiba%20um%20pouco%20da%20hist%C3%B3ria%20e%20troque%20informa%C3%A7%C3%B5es%20sobre%20os%20(as)%20candidatos%20(as).%20Quem%20ganha%20%C3%A9%20voc%C3%AA%20e%20a%20democracia.%20Transpar%C3%AAncia%20e%20informa%C3%A7%C3%A3o%20nas%20elei%C3%A7%C3%B5es%20podem%20mudar%20o%20presente%20e%20futuro%20das%20cidades%2C%20estados%20e%20do%20Brasil%20para%20melhor.&p[url]=http%3A%2F%2Fsaibaemquemvotar.com.br%2F&p[images][0]=http%3A%2F%2Fsaibaemquemvotar.com.br%2Fapple-touch-icon-114x114.png\', \'_blank\', \''+popup+', width=548, height=325\')">Facebook</a>'+
	'<a id="twitter" title="Postar no Twitter" href="javascript:" onclick="window.open(\'http://migre.me/compartilhar?msg=Conheça um pouco da história dos candidatos às eleições em\', \'_blank\', \''+ popup +', width=600, height=400\')">Twitter</a>'+
	'<a id="orkut" title="Promova no Orkut" href="javascript:" onclick="window.open(\'http://promote.orkut.com/preview?nt=orkut.com&amp;du=http://saibaemquemvotar.com.br&amp;tn=http://saibaemquemvotar.com.br/apple-touch-icon-114x114.png\', \'_blank\', \''+ popup +', width=800, height=550\')">Orkut</a></div>'

	mostraCamada("modal")
	d.getElementById("modal").style.opacity=0.7
	wr("ajuda", out)
	mostraCamada("ajuda")
}

function estica(id){
	for(var i in filtro_ajuda)
		tiraClasse("ajuda_ver"+filtro_ajuda[i])

	tiraClasse("ajuda_pref")
	poeClasse("ajuda_"+id,"sel")
}

/* Analisador */
function float2moeda(a){x=0;if(a<0){a=Math.abs(a);x=1}if(isNaN(a)){a="0"}cents=Math.floor((a*100+0.5)%100);a=Math.floor((a*100+0.5)/100).toString();if(cents<10){cents="0"+cents}for(var b=0;b<Math.floor((a.length-(1+b))/3);b++){a=a.substring(0,a.length-(4*b+3))+"."+a.substring(a.length-(4*b+3))}ret=a+","+cents;if(x==1){ret=" - "+ret}return ret}

function obtemInfo(id,vet,ehovice){
	i=vet[2],max="",o=ehovice

	if(!o)
		max="<li>sua despesa máxima de campanha é<br><b>R$ "+float2moeda(i[3]+"00")+"</b></li>" // Despesa
	else
		o=-1

	sexo=((i[o+5]) == 2) ? 0 : 1; // 0 masc, 1 fem
	art=(sexo)?"a":"o"

	out="<ul id='dados_"+id+"'>"+
	"<li><b>"+i[0]+"</b></li>"+ // Nome completo
	"<li>"+i[1]+"</li>"+ // Profissao
	"<li>"+signos[i[o+8]-1]+art+" de "+i[o+4]+" anos</li>"+ // Signo + Idade
	"<li>nasceu em "+i[2]+"</li>"+ // Natural de
	"<li>"+(escolaridade[i[o+6]-1])+"</li>"+ // Escolaridade
	"<li>é "+(estado_civil[ ((i[o+7])-1)/2])+art+"</li>"+ // Estado civil
	max+"</ul>"

	return out
}

function SilviaSaint(){
	analisa=d.getElementById("lblPopup").checked
}

function formataMoeda(num){
	var parteInteira = parseInt(num = Math.abs(+num || 0).toFixed(2)) + "", j = (j = parteInteira.length) > 3 ? j % 3 : 0;
	return "R$ " + (j ? parteInteira.substr(0, j) + "." : "") +
	parteInteira.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + ".") +
	("," + Math.abs(num - parteInteira).toFixed(2).slice(2))
}

function drawPatrimonio(id){
	var o=d.getElementById(id)

	eval("var num = num_"+id)
	eval("var vet_bem = bem[num]")
	eval("var vet_pat = pat[num]")

	if(id == "pref")
		eval("var info=prf[num]")
	else
		eval("var info="+id+"[num]")

	poeClasse("dados_"+id, "invisivel")

	if(typeof vet_pat == "undefined")
		return

	out="<a href='javascript:fecha_ajuda()' title='Fechar esta janela' class='dir button small red'><span id='xis'></span>fechar guia</a>"
	for(var i=0; i<vet_pat.length; i++)
	{
		ano=vet_pat[i][0]
		out+="<h3>Relação oficial de bens do ano "+ano+"</h3>"+
		"<table width='100%'>"+
		"<tr><th>Valor</th><th>Descrição</th></tr>"
		total=0

		for(var j=1; j<vet_pat[i].length; j++)
		{
			total+=vet_pat[i][j][0]
			val=formataMoeda(vet_pat[i][j][0])
			desc=vet_pat[i][j][1]

			if(j % 2 == 0)
				out+="<tr>"
			else
				out+="<tr bgcolor='#CCC'>"

			out+="<th align='left' nowrap='nowrap'>"+val+"</th>"+
			"<td>"+desc+"</td>"+
			"</tr>"
		}
		out+="<tr><th>TOTAL</th><td>"+formataMoeda(total)+"</td></tr>"+
		"</table>"
	}

	mostraCamada("modal")
	d.getElementById("modal").style.opacity=0.7
	wr("ajuda", out)
	mostraCamada("ajuda")

	if(typeof vet_bem == "undefined")
		return

	if(vet_bem.length <= 1)
	{
		o.innerHTML=""
		tiraClasse("dados_"+id)
		return
	}

	o.innerHTML="<div id='graph_"+id+"' style='float:right'></div><b>"+info[0]+"<br><br>"+num+"</b>"

	var myData = vet_bem
	var myChart = new JSChart('graph_'+id, 'line')
	myChart.setDataArray(myData)
	myChart.setTitle('Evolução de bens')
	myChart.setTitleColor('#8E8E8E')
	myChart.setTitleFontSize(11)
	myChart.setAxisNameX('')
	myChart.setAxisNameY('')
	myChart.setAxisColor('#C4C4C4')
	myChart.setAxisValuesColor('#000')
	myChart.setAxisPaddingLeft(50)
	myChart.setAxisPaddingRight(10)
	myChart.setAxisPaddingTop(10)
	myChart.setAxisPaddingBottom(20)
	myChart.setAxisValuesNumberX(6)
	myChart.setGraphExtend(true)
	myChart.setGridColor('#c2c2c2')
	myChart.setLineWidth(4)
	myChart.setLineColor('#9F0505')
	myChart.setSize(260, 200)
	myChart.draw()
}

function plotaPatrimonio(id){
	carregaJS("l/jscharts.js", function(){
		drawPatrimonio(id)
	})
}

function exibe_bens(id){
	wr(id, "<div style='float:right'>...carregando dados patrimoniais!</div>")

	if(typeof bem == "undefined")
		carregaJS("bens/"+ glUf + "/" + glCidadeId + ".js", function(){
			plotaPatrimonio(id)
		})
	else
		plotaPatrimonio(id)
}

function analisa_votos(){
	var prefeito=prf[num_pref],vicepref=vcp[num_pref],vereador=ver[num_ver],b='&nbsp;&nbsp;',
	inter='http://inter01.tse.jus.br/spce.cnpj.2012/consulta/HistoricoCandidatoPorId.action?',
	div='http://divulgacand2012.tse.jus.br/divulgacand2012/'

	if(num_ver=="")
		out=msg_branco
	else if(!(prt[num_ver] === undefined))
		out=msg_legenda
	else if(vereador === undefined)
		out=msg_nulo
	else
	{ // preenche vereador
		img="fotos/" + glUf + "/" + glCidadeId + "/" + vereador[1] + ".jpg"
		out="<h3>Vereador...</h3><img src='"+ img +"' width='100'/>"
		out+=obtemInfo("ver",vereador,0)
		out+="<div id='ver'></div>"+
		"<p><a href='javascript:exibe_bens(\"ver\")' class='button blue'>Exibir dados financeiros</a><br>"+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+vereador[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=1" target="_blank" class="small button red">Negativa criminal #1</a>'+b+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+vereador[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=2" target="_blank" class="small button red">Negativa criminal #2</a>'+b+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+vereador[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=3" target="_blank" class="small button red">Negativa criminal #3</a><br>'+
		'<a href="'+inter+'sqCandidato='+vereador[1]+'&sgUe='+glCidadeId+'&origemUrl=divulgacand" target="_blank" class="button pink">Situação do CNPJ</a>'+b+
		'<a href="'+div+'RelatorioDetalheCandidato/gerarRelatorio.action?sqCandidato='+vereador[1]+'&sgUe='+glCidadeId+'" target="_blank" class="button orange">Relatório do TSE</a>'+b+
		"<a href='javascript:exibe_doadores(\"ver\")' class='button'>Doadores de campanha</a></p>"
	}

	chk=""
	if(analisa)
		chk=' checked="checked"'

	out+="<br><br><h4>E aí, os (as) candidatos (as) merecem sua confiança e seu voto? Avalie!</h4>"+
	'<h4>&nbsp;</h4>'+
	'<label class="esq" for="lblPopup"><input type="checkbox" id="lblPopup" onchange="SilviaSaint()" value="1"'+chk+'/> analisar os candidatos ao final de cada simulação?</label>'
	wr("vereador", out)

	if(num_pref=="")
		out=msg_branco
	else if(prefeito === undefined)
		out=msg_nulo
	else
	{ // preenche prefeito
		img="fotos/" + glUf + "/" + glCidadeId + "/" + prefeito[1] + ".jpg"
		out="<h3>Prefeito...</h3><img src='"+ img +"' width='100'/>"
		out+=obtemInfo("pref",prefeito,0)
		out+="<div id='pref'></div>"+
		"<p><a href='javascript:exibe_bens(\"pref\")' class='button blue'>Exibir dados financeiros</a><br><br>"+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+prefeito[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=1" target="_blank" class="small button red">Negativa criminal #1</a>'+b+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+prefeito[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=2" target="_blank" class="small button red">Negativa criminal #2</a>'+b+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+prefeito[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=3" target="_blank" class="small button red">Negativa criminal #3</a><br><br>'+
		'<a href="'+inter+'sqCandidato='+prefeito[1]+'&sgUe='+glCidadeId+'&origemUrl=divulgacand" target="_blank" class="button pink">Situação do CNPJ</a>'+b+
		'<a href="'+div+'RelatorioDetalheCandidato/gerarRelatorio.action?sqCandidato='+prefeito[1]+'&sgUe='+glCidadeId+'" target="_blank" class="button orange">Relatório do TSE</a>'+b+
		"<a href='javascript:exibe_doadores(\"pref\")' class='button'>Doadores de campanha</a></p>"

		img="fotos/" + glUf + "/" + glCidadeId + "/" + vicepref[1] + ".jpg"
		out+="<br><br><h3>Vice-prefeito...</h3><img src='"+ img +"' width='100'/>"
		out+=obtemInfo("vcp",vicepref,1)
		out+='<p><br><a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+vicepref[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=1" target="_blank" class="small button red">Negativa criminal #1</a>'+b+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+vicepref[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=2" target="_blank" class="small button red">Negativa criminal #2</a>'+b+
		'<a href="'+div+'mostrarArquivoCertidaoCriminal.action?sqCandidato='+vicepref[1]+'&codigoMunicipio='+glCidadeId+'&sqProcesso=3" target="_blank" class="small button red">Negativa criminal #3</a><br><br>'+
		'<a href="'+div+'RelatorioDetalheCandidato/gerarRelatorio.action?sqCandidato='+vicepref[1]+'&sgUe='+glCidadeId+'" target="_blank" class="button orange">Relatório do TSE</a></p>'
	}

	wr("prefeito", out)
}

function abre_analise(){
	tela=3
	ajudacomp=d.getElementById("ajuda").innerHTML
	poeClasse("abertura,busca,urna","invisivel")
	poeClasse("ajuda","scroll")
	tiraClasse("analisevoto")
	analisa_votos()
}

function fecha_analise(){
	tela=100
	wr("ajuda", ajudacomp)
	poeClasse("abertura,busca,analisevoto","invisivel")
	tiraClasse("urna,ajuda")
}

function mostraDoadores(id){
	eval("var num = num_"+id)

	if(rec[num] === undefined)
	{
		alert("Os dados oficiais ainda não foram repassados ao TSE!")
		return
	}

	total=0,out="<h3>Relação oficial de doadores da campanha <a href='javascript:fecha_ajuda()' title='Fechar esta janela' class='dir button small red'><span id='xis'></span>fechar guia</a></h3>"+
	"<table width='100%'>"+
	"<tr><th>Data</th><th>Valor</th><th>Doador (CPF/CNPJ)</th><th>Receita</th><th>Fonte</th></tr>"

	for(var i=0; i<rec[num].length; i++)
	{
		total+=rec[num][i][0]
		val="<b>"+formataMoeda(rec[num][i][0])+"</b><br>"+rec[num][i][1]
		if(i % 2 == 0)
			out+="<tr bgcolor='#CCC'>"
		else
			out+="<tr>"
		out+="<td>"+rec[num][i][2]+"</td>"+
		"<th align='left' nowrap='nowrap'>"+val+"</th>"+
		"<td>"+rec[num][i][3]+"<br>"+rec[num][i][4]+"</td>"+
		"<td>"+rec[num][i][5]+"</td>"+
		"<td>"+rec[num][i][6]+"</td>"+
		"</tr>"
	}
	out+="<tr><td><h4>TOTAL</h4></td><th colspan='4'><h4>"+formataMoeda(total)+"</h4></th></tr>"+
	"</table>"

	mostraCamada("modal")
	d.getElementById("modal").style.opacity=0.7
	wr("ajuda", out)
	mostraCamada("ajuda")
}

function exibe_doadores(id){
	if(typeof rec == "undefined")
		carregaJS("receita-2708/"+ glUf + "/" + glCidadeId + ".js", function(){
			mostraDoadores(id)
		})
	else
		mostraDoadores(id)
}