'use client'

import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiDollarSign, FiShoppingBag, FiUsers, FiTrendingUp, FiPackage, FiCreditCard, FiTag } from 'react-icons/fi'

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalVendas: 0,
    totalPedidos: 0,
    totalClientes: 0,
    taxaConversao: 0,
    vendasHoje: 0,
    pedidosPendentes: 0
  })

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/')
      return
    }

    // Simular carregamento de estatísticas
    setStats({
      totalVendas: 15420.50,
      totalPedidos: 247,
      totalClientes: 189,
      taxaConversao: 68.5,
      vendasHoje: 1250.00,
      pedidosPendentes: 3
    })
  }, [isAuthenticated, user, router])

  if (!user || user.role !== 'admin') {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold gradient-text">Painel Administrativo</h1>
          <p className="text-text-secondary mt-2">Bem-vindo, {user.name}</p>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
              <FiDollarSign size={24} className="text-accent" />
            </div>
            <span className="text-xs text-accent font-semibold">+12.5%</span>
          </div>
          <h3 className="text-text-secondary text-sm mb-1">Vendas Totais</h3>
          <p className="text-3xl font-bold text-text">R$ {stats.totalVendas.toFixed(2)}</p>
          <p className="text-xs text-text-secondary mt-2">Hoje: R$ {stats.vendasHoje.toFixed(2)}</p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
              <FiShoppingBag size={24} className="text-primary" />
            </div>
            <span className="text-xs text-primary font-semibold">{stats.pedidosPendentes} pendentes</span>
          </div>
          <h3 className="text-text-secondary text-sm mb-1">Total de Pedidos</h3>
          <p className="text-3xl font-bold text-text">{stats.totalPedidos}</p>
          <p className="text-xs text-text-secondary mt-2">Última semana: 45 pedidos</p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <FiUsers size={24} className="text-blue-500" />
            </div>
            <span className="text-xs text-blue-500 font-semibold">+8 hoje</span>
          </div>
          <h3 className="text-text-secondary text-sm mb-1">Total de Clientes</h3>
          <p className="text-3xl font-bold text-text">{stats.totalClientes}</p>
          <p className="text-xs text-text-secondary mt-2">Novos esta semana: 23</p>
        </div>

        <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <FiTrendingUp size={24} className="text-yellow-500" />
            </div>
            <span className="text-xs text-yellow-500 font-semibold">Excelente</span>
          </div>
          <h3 className="text-text-secondary text-sm mb-1">Taxa de Conversão</h3>
          <p className="text-3xl font-bold text-text">{stats.taxaConversao}%</p>
          <p className="text-xs text-text-secondary mt-2">Meta: 65%</p>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10">
          <h2 className="text-xl font-bold mb-6 text-text flex items-center space-x-2">
            <FiPackage className="text-primary" />
            <span>Ações Rápidas</span>
          </h2>

          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-bg-tertiary hover:bg-primary/20 transition-all text-left border border-primary/10">
              <FiShoppingBag className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-text">Gerenciar Pedidos</p>
                <p className="text-xs text-text-secondary">{stats.pedidosPendentes} pedidos pendentes</p>
              </div>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-bg-tertiary hover:bg-primary/20 transition-all text-left border border-primary/10">
              <FiPackage className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-text">Gerenciar Produtos</p>
                <p className="text-xs text-text-secondary">Adicionar ou editar jogos</p>
              </div>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-bg-tertiary hover:bg-primary/20 transition-all text-left border border-primary/10">
              <FiTag className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-text">Gerenciar Cupons</p>
                <p className="text-xs text-text-secondary">Criar ou desativar cupons</p>
              </div>
            </button>

            <button className="w-full flex items-center space-x-3 p-4 rounded-lg bg-bg-tertiary hover:bg-primary/20 transition-all text-left border border-primary/10">
              <FiUsers className="text-primary" size={20} />
              <div>
                <p className="font-semibold text-text">Gerenciar Usuários</p>
                <p className="text-xs text-text-secondary">{stats.totalClientes} usuários cadastrados</p>
              </div>
            </button>
          </div>
        </div>

        {/* Vendas Recentes */}
        <div className="bg-bg-secondary rounded-xl p-6 border border-primary/10">
          <h2 className="text-xl font-bold mb-6 text-text flex items-center space-x-2">
            <FiCreditCard className="text-primary" />
            <span>Vendas Recentes</span>
          </h2>

          <div className="space-y-3">
            {[
              { id: 'ORD_001', valor: 60.00, metodo: 'pix', status: 'approved' },
              { id: 'ORD_002', valor: 30.00, metodo: 'card', status: 'approved' },
              { id: 'ORD_003', valor: 45.00, metodo: 'pix', status: 'pending' },
              { id: 'ORD_004', valor: 120.00, metodo: 'card', status: 'approved' },
            ].map((venda, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 rounded-lg bg-bg-tertiary border border-primary/5"
              >
                <div>
                  <p className="font-semibold text-text">#{venda.id}</p>
                  <p className="text-xs text-text-secondary mt-1">
                    {venda.metodo === 'pix' ? '💚 PIX' : '💳 Cartão'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text">R$ {venda.valor.toFixed(2)}</p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    venda.status === 'approved' 
                      ? 'bg-accent/20 text-accent' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {venda.status === 'approved' ? '✅ Aprovado' : '⏳ Pendente'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-all">
            Ver Todos os Pedidos
          </button>
        </div>
      </div>

      {/* Gráficos e Estatísticas Detalhadas */}
      <div className="mt-8 bg-bg-secondary rounded-xl p-6 border border-primary/10">
        <h2 className="text-xl font-bold mb-6 text-text">📊 Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-text-secondary mb-2">Ticket Médio</p>
            <p className="text-3xl font-bold text-primary">R$ {(stats.totalVendas / stats.totalPedidos).toFixed(2)}</p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary mb-2">Jogos Mais Vendidos</p>
            <p className="text-xl font-bold text-text">SoulsLike Complete</p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary mb-2">Método Preferido</p>
            <p className="text-xl font-bold text-accent">PIX (72%)</p>
          </div>
        </div>
      </div>
    </div>
  )
}

