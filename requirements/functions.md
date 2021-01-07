# Funcionalidades

- A solução deverá conter a segurança necessária de forma a não permitir acesso ao endpoint a partir de domínios diversos do qual estará hospedado o serviço;

- A solução deverá conter controle de acesso por meio de autenticação JWT
  com expiração a cada 5 minutos e possibilidade de renovação;

- A solução deverá implementar pelo menos os verbos post, put, get;
  - d) A solução deverá conter recursos de paginação na consulta dos álbuns;
  - e) A solução deverá expor quais álbuns são/tem os cantores e/ou bandas
    possibilitando consultas parametrizadas;
  - f) Deverá ser possível realizar consultas por nome do artista, permitindo ordenar
    por ordem alfabética (asc e desc);
  - g) Deverá ser possível fazer o upload de uma ou mais imagens da capa do
    álbum;
  - h) As imagens deverão ser armazenadas no Object Store MinIO utilizando API
    S3;
  - i) Preferencialmente, a recuperação das imagens deverá ser através links
    apontando para o Min.IO Play com tempo de expiração.
  - j) Por fim, a solução deverá ser “dockerizada” de forma que a solução execute
    em docker.

# Modelo Exemplo

| Artista      | Álbuns                                       |
| ------------ | -------------------------------------------- |
| Serj tankian | "Harakiri", "Black Blooms" e "The Rough Dog" |

# Mais Instruções

https://drive.google.com/file/d/122ulw68Ez_tmXq_2wex3AetN5cpH4g0c/view
