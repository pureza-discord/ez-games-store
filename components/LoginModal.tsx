'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth'
import { useToastStore } from '@/store/toastStore'
import { FiX, FiMail, FiLock, FiUser } from 'react-icons/fi'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { login, register } = useAuth()
  const addToast = useToastStore(state => state.addToast)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = isLogin 
        ? await login(email, password)
        : await register(email, password, name)

      if (result.success) {
        addToast(result.message, 'success')
        onClose()
        setEmail('')
        setPassword('')
        setName('')
      } else {
        addToast(result.message, 'error')
      }
    } catch (error) {
      addToast('Erro ao processar requisição', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-bg-secondary border-2 border-primary/30 rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-in shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-text">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <FiX size={24} className="text-text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-text">
                Nome Completo
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text"
                  placeholder="Seu nome"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 text-text">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-text">
              Senha
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg-tertiary border border-primary/10 focus:border-primary focus:outline-none text-text"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading 
              ? 'Processando...' 
              : isLogin ? 'Entrar' : 'Criar Conta'
            }
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-primary hover:text-primary-hover transition-colors"
          >
            {isLogin 
              ? 'Não tem conta? Cadastre-se' 
              : 'Já tem conta? Faça login'
            }
          </button>
        </div>

        {isLogin && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/10 rounded-lg">
            <p className="text-xs text-text-secondary">
              <strong className="text-primary">Teste:</strong> admin@ezgames.com / admin123
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

