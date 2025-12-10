const fs = require('fs')
const path = require('path')

const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
}

class PaymentLogger {
  constructor() {
    this.logsDir = path.join(__dirname, '../logs')
    this.logsFile = path.join(this.logsDir, 'payments.log')
    
    // Criar diretório de logs se não existir
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir, { recursive: true })
    }
  }

  log(message, data = null, color = 'cyan') {
    const timestamp = new Date().toISOString()
    const dateFormatted = new Date().toLocaleString('pt-BR')
    const logEntry = {
      timestamp,
      message,
      data: data || {}
    }

    const logLine = `[${timestamp}] ${message}${data ? ` | Data: ${JSON.stringify(data)}` : ''}\n`
    
    console.log('\n' + '='.repeat(80))
    console.log(`${COLORS[color]}${COLORS.bright}${message}${COLORS.reset}`)
    console.log(`${COLORS.yellow}⏰ ${dateFormatted}${COLORS.reset}`)
    if (data) {
      console.log(`${COLORS.blue}📊 Dados:${COLORS.reset}`)
      Object.entries(data).forEach(([key, value]) => {
        console.log(`   ${COLORS.cyan}${key}:${COLORS.reset} ${value}`)
      })
    }
    console.log('='.repeat(80) + '\n')
    
    try {
      fs.appendFileSync(this.logsFile, logLine)
    } catch (error) {
      console.error('Erro ao escrever log:', error)
    }
  }

  logPixCreated(orderId, amount, items) {
    this.log('🔄 PIX CRIADO - Aguardando Pagamento', {
      'ID do Pedido': orderId,
      'Valor Total': `R$ ${amount.toFixed(2).replace('.', ',')}`,
      'Quantidade de Itens': items.length,
      'Produtos': items.map(i => i.name).join(', ')
    }, 'blue')
  }

  logPixPaid(orderId, paymentId, amount, items = [], customerInfo = {}) {
    const productsNames = items.map(i => `${i.name} (${i.quantity}x)`).join(', ')
    
    this.log('✅ PIX APROVADO - PAGAMENTO CONFIRMADO', {
      '🆔 ID do Pedido': orderId,
      '💳 ID do Pagamento Mercado Pago': paymentId,
      '👤 Cliente': customerInfo.name || 'Cliente Ez Games',
      '📧 Email': customerInfo.email || 'N/A',
      '💰 Valor Total Pago': `R$ ${amount.toFixed(2).replace('.', ',')}`,
      '🎮 Produtos Comprados': productsNames || 'N/A',
      '📦 Quantidade de Itens': items.length,
      '✅ Status': 'APROVADO E CONFIRMADO',
      '🚀 Próxima Ação': 'Enviar jogos para o cliente via Discord'
    }, 'green')
    
    console.log(`\n${COLORS.bright}${COLORS.green}🎉 VENDA REALIZADA COM SUCESSO! 🎉${COLORS.reset}\n`)
  }

  logPixPending(orderId) {
    this.log('⏳ PIX PENDENTE', {
      'ID do Pedido': orderId,
      'Status': 'Aguardando pagamento do cliente'
    }, 'yellow')
  }

  logPixCancelled(orderId) {
    this.log('❌ PIX CANCELADO', {
      'ID do Pedido': orderId,
      'Status': 'Cancelado pelo cliente'
    }, 'red')
  }

  logCardPayment(orderId, amount, status) {
    this.log('💳 PAGAMENTO CARTÃO PROCESSADO', {
      'ID do Pedido': orderId,
      'Valor': `R$ ${amount.toFixed(2).replace('.', ',')}`,
      'Status': status.toUpperCase()
    }, status === 'approved' ? 'green' : 'yellow')
  }

  logError(message, error) {
    this.log(`🚨 ERRO: ${message}`, {
      'Erro': error.message || error,
      'Stack': error.stack
    }, 'red')
  }

  logWebhook(source, data) {
    this.log(`📡 WEBHOOK RECEBIDO - ${source}`, {
      'Fonte': source,
      'Dados': JSON.stringify(data, null, 2)
    }, 'magenta')
  }

  // Ler últimos logs
  getRecentLogs(lines = 50) {
    try {
      if (!fs.existsSync(this.logsFile)) {
        return []
      }

      const content = fs.readFileSync(this.logsFile, 'utf-8')
      const allLines = content.split('\n').filter(line => line.trim())
      return allLines.slice(-lines)
    } catch (error) {
      console.error('Erro ao ler logs:', error)
      return []
    }
  }
}

module.exports = new PaymentLogger()



