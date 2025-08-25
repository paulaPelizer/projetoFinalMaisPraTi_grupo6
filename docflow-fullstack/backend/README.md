# DocFlow Backend Java (Spring Boot + SQL Server)

Um esqueleto pronto para iniciar a migração das automações hoje em Node/React para um backend Java moderno com Spring Boot, conectando no SQL Server.

## Requisitos
- Java 17+
- Maven 3.9+
- SQL Server (local ou em contêiner - porta 1433)
- SQL Server Management Studio (opcional, para administração)

## Passo a passo
1. **Crie o banco `docflow`** no SQL Server e um usuário com permissão (ou use `sa` em dev).
2. Ajuste `src/main/resources/application.yml` com `username`/`password`.
3. Rode as migrações:
   ```bash
   ./mvnw -q -DskipTests spring-boot:run
   ```
   O Flyway criará o schema `app` e tabelas básicas.
4. Acesse a documentação interativa:
   - Swagger UI: http://localhost:8080/swagger-ui/index.html
   - Healthcheck: http://localhost:8080/actuator/health

## Endpoints iniciais
- `POST /api/v1/jobs` — cria um job (automação) agendado ou imediato.
- `GET /api/v1/jobs/<built-in function id>` — consulta um job por id.
- `GET /api/v1/jobs` — lista jobs (com filtros).
- Agendador interno verifica jobs `QUEUED` a cada 5s e despacha para o processor do tipo correspondente.

## Como mapear automações do Node/React
- Cada automação vira um `JobType` (enum) + um `JobProcessor` que implementa a lógica.
- Exemplos inclusos: `EMAIL_NOTIFY` e `IMPORT_DOCUMENTS` (stubs para você plugar integrações reais).

## Estrutura
```
docflow-backend-java/
  pom.xml
  src/main/java/com/adi/docflow/...
  src/main/resources/application.yml
  src/main/resources/db/migration/V1__initial.sql
```

> Data de geração: 2025-08-23


## Entidades novas
- **Organizations** (CLIENT/SUPPLIER), **Projects**, **Documents** (code, revision, format, pages)
- **Requests** (solicitações com origem/destino, propósito etc.) + associação **RequestDocument**
- **GRD** (header) + **GRD Items**

## Novos endpoints (REST)
- `POST /api/v1/orgs` (criar cliente/fornecedor – defina `orgType: CLIENT|SUPPLIER`)
- `GET /api/v1/orgs?type=CLIENT|SUPPLIER`
- `POST /api/v1/projects` | `GET /api/v1/projects`
- `POST /api/v1/documents` | `GET /api/v1/documents`
- `POST /api/v1/requests` | `GET /api/v1/requests?status=PENDING`
- `POST /api/v1/grds` (gera GRD a partir de `requestId`)
- `GET /api/v1/grds/{id}`

### Fluxo típico
1. Criar CLIENT (origin) e SUPPLIER (destination)
2. Criar PROJECT (vinculando client)
3. Criar DOCUMENT(s) vinculados ao projeto
4. `POST /requests` com `projectId`, `originId`, `destinationId` e `documentIds`
5. `POST /grds` com `requestId` (+ opcional `deliveryMethod`, `emittedBy`, `observations`)
6. Consultar GRD gerada em `/grds/{id}`
