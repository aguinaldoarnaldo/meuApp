# Sistema Anti-Fraude - Seguro de Saúde

## Visão Geral

Este sistema foi desenvolvido para prevenir fraudes no setor de seguro de saúde através de um sistema de QR Codes temporários e rastreamento completo de uso do cartão.

## Como Funciona

### 1. Geração de QR Code

Quando o usuário precisa usar o cartão em uma clínica ou farmácia parceira:

1. O usuário abre o app e clica no ícone de QR Code no cartão
2. O sistema gera um QR Code único com:
   - Token criptográfico seguro
   - Validade de 15 minutos
   - Tipo de uso (consulta, medicamento, exame)
   - Dados do usuário e apólice

### 2. Uso do QR Code

Quando a clínica/farmácia escaneia o QR Code:

1. O sistema valida em tempo real:
   - ✅ QR Code existe e não foi usado
   - ✅ QR Code não expirou
   - ✅ Cartão do usuário está válido
   - ✅ Clínica é parceira autorizada

2. Se válido:
   - Marca QR Code como usado
   - Cria registro de auditoria
   - Registra procedimento no histórico
   - Confirma uso

3. Se inválido:
   - Rejeita uso
   - Registra motivo da rejeição
   - Alerta sobre possível fraude

### 3. Medidas de Segurança

#### QR Code com Expiração
- **15 minutos** de validade
- Não pode ser usado após expirar
- Previne uso posterior

#### Uso Único
- Cada QR Code só pode ser usado **uma vez**
- Após uso, não pode ser reutilizado
- Previne cópias e compartilhamento

#### Validação de Cartão
- Verifica validade antes de gerar
- Verifica validade ao usar
- Previne uso de cartões expirados

#### Auditoria Completa
- Registra todas as operações
- Mantém histórico permanente
- Permite investigação de fraudes

## Estrutura do Banco de Dados

### Tabelas Principais

1. **users** - Usuários/Assegurados
2. **clinicas** - Clínicas e farmácias parceiras
3. **qr_code_sessions** - Sessões de QR Code (controle)
4. **registros_uso** - Auditoria completa de uso
5. **procedimentos** - Histórico de procedimentos
6. **notifications** - Notificações do sistema

## Funcionalidades Implementadas

### Backend

✅ Geração de QR Code seguro
✅ Validação em tempo real
✅ Sistema de expiração
✅ Uso único por QR Code
✅ Registro completo de auditoria
✅ Validação de cartão
✅ Rastreamento de clínicas parceiras

### Frontend

✅ Modal de QR Code com contador
✅ Geração ao clicar no ícone
✅ Visualização do código
✅ Cancelamento de QR Code
✅ Histórico de uso
✅ Integração com HomeScreen

## API Endpoints

### QR Code
- `POST /api/qrcode/generate` - Gerar novo QR Code
- `POST /api/qrcode/validate` - Validar QR Code (clínica)
- `POST /api/qrcode/invalidate` - Cancelar QR Code
- `GET /api/qrcode/history` - Histórico de QR Codes

### Clínicas
- `GET /api/clinicas` - Listar clínicas parceiras
- `GET /api/clinicas/:id` - Detalhes de clínica
- `POST /api/clinicas` - Criar clínica (admin)

### Auditoria
- `GET /api/auditoria/usuario` - Auditoria do usuário
- `GET /api/auditoria/suspeitos` - Registros suspeitos (admin)

## Prevenção de Tipos de Fraude

### 1. Uso Não Autorizado
**Problema:** Alguém usa o cartão sem autorização
**Solução:** QR Code único com expiração, validação em tempo real

### 2. Compartilhamento de Cartão
**Problema:** Múltiplas pessoas usam o mesmo cartão
**Solução:** QR Code de uso único, rastreamento de uso

### 3. Uso de Cartão Expirado
**Problema:** Tentativa de usar cartão após expiração
**Solução:** Validação de validade antes e durante uso

### 4. Cópia/Reutilização
**Problema:** Screenshot ou foto do QR Code reutilizado
**Solução:** Expiração de 15 minutos, uso único

### 5. Uso em Locais Não Autorizados
**Problema:** Uso em clínicas não parceiras
**Solução:** Validação de clínica parceira autorizada

## Como Usar

### Para Usuários

1. **Gerar QR Code:**
   - Abra o app
   - Vá para a tela principal (Home)
   - Clique no ícone de QR Code no cartão
   - O código aparece em modal
   - Apresente à clínica/farmácia

2. **Cancelar QR Code:**
   - Se não for usar, clique em "Cancelar QR Code"
   - O código será invalidado

### Para Clínicas/Farmácias

1. **Instalar App de Validação** (a ser desenvolvido)
2. Escanear QR Code do paciente
3. Sistema valida automaticamente
4. Confirma ou rejeita uso

### Para Administradores

1. **Monitorar Uso:**
   - Acessar API de auditoria
   - Verificar registros suspeitos
   - Analisar padrões anormais

2. **Gerenciar Parceiros:**
   - Cadastrar novas clínicas
   - Ativar/desativar parceiros
   - Verificar código parceiro

## Próximos Passos

- [ ] App para clínicas validar QR Codes
- [ ] Dashboard administrativo
- [ ] Alertas automáticos de fraude
- [ ] Análise de padrões suspeitos
- [ ] Relatórios de uso

## Tecnologias

- **Backend:** Node.js, Express, PostgreSQL
- **Frontend:** React Native, Expo
- **Segurança:** JWT, bcrypt, tokens criptográficos
- **QR Code:** react-native-qrcode-svg

