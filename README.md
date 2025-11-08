Este é um projeto pessoal feito por mim (Rafael) para praticar o uso do React. Nele irei consumir a API do Clash Royale para apresentar as informações do jogo em geral, desde cartas até jogadores existentes, utilizando de tudo que a API oferece.
 a estrutura de pastas está organizada, diferente dos meus primeiros projetos.

-> SuperGuiaDoClash
--> na pasta src você encontrará todos a estrutura de pastas do site.
---> na pasta components você encontrará os Botões e componentes reútilizáveis que usei em todo site.
---> na pasta páginas você encontrará as telas.
---> na pasta server você encontrará o servidor criado, simulando o Back-End.
---> embaixo da pasta server você encontrará o arquivo de App, mostrando a navegação.
--> ao dar npm i aparecerá a pasta node_modules com todas as instalações de bibliotecas utilizadas no projeto.

Para rodar localmente, você precisa entar neste link  --->  https://developer.clashroyale.com/#/
Crie uma conta ou entre em uma já existente
Feito isso, aperte no botão no canto superior direito e vá em 'My Account'
Clique em 'Create New Key', dê um nome para sua chave, coloque algo na descrição e forneça o endereço de IPv4 usando este link 
---> https://www.iplocation.net/myip
Crie sua chave e depois crie um arquivo '.env' na raiz do projeto com essa linha, colocando o token da chave dentro das aspas

VITE_CLASH_API_TOKEN=''   

Feito isso abra o terminal 'Ctrl + J' e rode este comando: 
node src/server/serverApi.cjs
se aparecer --> ✅ API rodando em http://127.0.0.1:3001 
é porque está tudo certo

Agora abra outro terminal (sem fechar o anterior) e dê os comandos respectivamente:
cd src
npm run dev
Dê Ctrl + click e aperte no link, depois entre no navegador e veja rodando.





