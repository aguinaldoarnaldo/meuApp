# Sistema Anti-Fraude - Segurança no Uso de Cartões

Este documento descreve as medidas de segurança implementadas no sistema para prevenir fraudes no setor de seguro de saúde.

## Funcionalidades de Segurança

### 1. QR Codes com Expiração
- Cada QR Code gerado tem validade de **15 minutos**
- Após expirar, o código não pode mais ser usado
- O sistema valida a expiração em cada tentativa de uso

### 2. Uso Único
- Cada QR Code pode ser usado **apenas uma vez**
- Após ser usado, o código é marcado como utilizado e não pode ser reutilizado
- Tentativas de reutilização são registradas e podem ser investigadas

### 3. Validação de Cartão
- Antes de gerar um QR Code, o sistema verifica se o cartão está válido
- QR Codes não podem ser gerados para cartões expirados
- Validação também ocorre quando o QR Code é utilizado

### 4. Registro Completo de Auditoria
- Todas as operações são registradas na tabela `registros_uso`
- Cada uso inclui:
  - Data e hora exata
  - Tipo de uso (consulta, medicamento, exame)
  - Clínica/farmácia que processou
  - Status da transação
  - Dados geográficos (se disponíveis)

### 5. Rastreamento de Sessões
- Cada QR Code tem uma sessão única (`qr_code_sessions`)
- Registra quando foi criado, usado, invalidado ou expirado
- Permite rastrear tentativas de uso inválidas

### 6. Validação em Tempo Real
- Quando uma clínica/farmácia escaneia o QR Code, o sistema:
  1. Verifica se o código existe
  2. Verifica se não expirou
  3. Verifica se não foi usado
  4. Verifica se não foi invalidado
  5. Verifica se o cartão do usuário está válido
  6. Marca como usado e cria registro de auditoria

## Tabelas de Segurança

### `qr_code_sessions`
Armazena todas as sessões de QR Code:
- Token único e criptograficamente seguro
- Data de expiração
- Status (usado, invalidado, expirado)
- Informações de quando e onde foi usado

### `registros_uso`
Auditoria completa de todos os usos:
- Histórico completo de transações
- Status de cada transação (confirmado, rejeitado, suspeito)
- Dados geográficos para rastreamento
- Permite identificar padrões suspeitos

### `clinicas`
Cadastro de parceiros autorizados:
- Apenas clínicas/farmácias cadastradas podem processar QR Codes
- Código único de parceiro
- Status ativo/inativo

## Fluxo de Uso Seguro

1. **Usuário gera QR Code no app**
   - Sistema valida cartão ativo
   - Gera token único
   - Cria sessão com expiração de 15 minutos

2. **Clínica escaneia QR Code**
   - Sistema valida token em tempo real
   - Verifica todas as condições de segurança
   - Processa uso ou rejeita com motivo

3. **Registro Automático**
   - Cria registro de auditoria
   - Cria procedimento no histórico
   - Marca sessão como usada

## Prevenção de Fraudes

### Tipos de Fraudes Prevenidos

1. **Reutilização de QR Code**
   - Prevenido por uso único

2. **Uso de QR Code Expirado**
   - Prevenido por validação de expiração

3. **Uso de Cartão Expirado**
   - Prevenido por validação de validade do cartão

4. **Uso Não Autorizado**
   - Prevenido por validação de clínica parceira

5. **Alteração/Manipulação de QR Code**
   - Prevenido por token criptográfico único

## Investigação de Fraudes

O sistema permite identificar padrões suspeitos através de:

- Consultas na tabela `registros_uso` com status 'suspeito'
- Análise de padrões de uso (horários, locais, frequência)
- Rastreamento de tentativas de uso inválidas
- Auditoria completa de todas as transações

## Recomendações de Uso

1. **Para Usuários:**
   - Gere QR Code apenas quando for usar
   - Não compartilhe screenshots do QR Code
   - Cancele QR Codes não utilizados

2. **Para Clínicas/Farmácias:**
   - Valide QR Code imediatamente após escanear
   - Não aceite QR Codes expirados ou de fonte não confiável
   - Reporte comportamentos suspeitos

3. **Para Administradores:**
   - Monitore registros suspeitos regularmente
   - Analise padrões de uso anormais
   - Mantenha cadastro de parceiros atualizado

