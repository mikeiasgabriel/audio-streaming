# Audio Streaming

## Descrição
O projeto consiste em uma aplicação cliente/servidor para transmissão de um streaming de áudio e reprodução.

---

## Dependências
* Node 14+
* Yarn ou NPM

---

## Instação

### Servidor

```shell 
# Acessa a pasta do servidor
cd server/

# Instala as dependências
yarn install

# Inicia o servidor 
yarn start
```

### Cliente

Acessa a pasta `client` e abre o arquivo `index.html` em qualquer navegador web.

---

## Funcionamento

O servidor cria um streaming de áudio a partir do Sound Cloud (através da rota de download de uma API extraoficial). Esse stream é transmitido para o cliente que solicita qual track quer executar.

---

## Extra

Infelizmente, não conseguimos utilizar o `ffmpeg` nesse trabalho, mas gostaríamos de mostrar o que conseguimos aprender e utilizar desse framework de forma extra.

A partir de um arquivo de áudio qualquer, podemos gerar um stream de áudio udp ou rtp. Esse arquivo pode ser executado utilizando a ferramenta `ffplay`.

```sh 
# Cria o stream de áudio
ffmpeg -re -f mp3 -i ./teste.mp3 -acodec libmp3lame -ab 160k -ac 2 -ar 48000 -f mulaw -f rtp rtp://127.0.0.1:8082

# Reproduz o áudio a partir do streaming que está sendo recebido
ffplay rtp://127.0.0.1:8082
```

O motivo pelo qual não conseguimos aplicar essa ideia para resolver o desafio proposto é que não conseguimos obter o stream a partir do Sound Cloud e, mesmo que conseguíssemos, não foi possível converter os pacotes recebidos para algo executável.

Uma abordagem alternativa seria utilizar os pacotes do stream do arquivo transmitido para salvar em um novo arquivo, mas isso não seria produtivo para resolver o problema que nos foi proposto, mas seria útil para transferência de arquivos em rede, por exemplo.

Também aprendemos sobre conversão de tipos utilizando o `ffmpeg` de uma forma prática que nos renderá um projeto futuro. 

--- 

## Autores

* Mikéias Azevedo 
* Ascênio Sanderson
