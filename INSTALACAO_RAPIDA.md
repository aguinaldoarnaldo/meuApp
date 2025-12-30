# Instalação Rápida - meuApp

## Passo 1: Configurar Backend

```bash
# Navegar para a pasta do backend
cd src/backend

# Instalar dependências
npm install

# Criar arquivo .env (copiar do .env.example e ajustar)
# Editar .env com suas credenciais do PostgreSQL

# Executar o servidor
npm run dev
```

**Importante:** Certifique-se de que o PostgreSQL está rodando e o banco `meuapp_db` foi criado.

## Passo 2: Configurar Frontend

```bash
# Voltar para a raiz do projeto
cd ../..

# Instalar dependências
npm install

# Ajustar URL da API em src/services/api.js se necessário
# (Para dispositivo físico, use seu IP local)

# Executar o app
npm start
```

## Verificar Instalação

1. Backend rodando em: http://localhost:3000
2. Testar endpoint: http://localhost:3000/health
3. Frontend conectando à API corretamente

## Problemas Comuns

### Backend não conecta ao PostgreSQL
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no arquivo `.env`
- Certifique-se de que o banco `meuapp_db` existe

### Frontend não conecta ao Backend
- Verifique a URL em `src/services/api.js`
- Para Android Emulador: `http://10.0.2.2:3000/api`
- Para iOS Simulador: `http://localhost:3000/api`
- Para dispositivo físico: `http://SEU_IP:3000/api`

### Erro de módulo não encontrado
- Execute `npm install` novamente
- Delete `node_modules` e `package-lock.json` e reinstale

