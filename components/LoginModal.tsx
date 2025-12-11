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

  // Impedir fechar modal sem estar logado (em checkout)
  const handleClose = () => {
    onClose()
  }

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
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in overflow-y-auto py-8"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        margin: 0,
        padding: '2rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div 
        className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border-2 border-primary/40 rounded-3xl p-10 max-w-lg w-full shadow-2xl m-auto"
        style={{ 
          position: 'relative',
          zIndex: 1000000
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiUser size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-2">
            {isLogin ? 'Bem-vindo de Volta!' : 'Criar Conta'}
          </h2>
          <p className="text-text-secondary text-sm">
            {isLogin ? 'Entre para acessar sua conta' : 'Cadastre-se para começar a comprar'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold mb-2 text-text">
                Nome Completo
              </label>
              <div className="relative group">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-bg-tertiary border-2 border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="Seu nome completo"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold mb-2 text-text">
              Email
            </label>
            <div className="relative group">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-bg-tertiary border-2 border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
                placeholder="seu@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-text">
              Senha
            </label>
            <div className="relative group">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-bg-tertiary border-2 border-primary/10 focus:border-primary focus:outline-none text-text transition-all"
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            {!isLogin && (
              <p className="text-xs text-text-secondary mt-2">
                A senha deve ter no mínimo 6 caracteres
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-white font-bold py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            {isLoading 
              ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              )
              : isLogin ? 'Entrar na Conta' : 'Criar Minha Conta'
            }
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-primary/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-bg-secondary text-text-secondary">ou</span>
          </div>
        </div>

        <button
          onClick={() => {
            setIsLogin(!isLogin)
            setEmail('')
            setPassword('')
            setName('')
          }}
          className="w-full py-3 bg-bg-tertiary hover:bg-bg-tertiary/80 text-text font-semibold rounded-xl transition-all border-2 border-primary/10 hover:border-primary/30"
        >
          {isLogin 
            ? 'Criar uma nova conta' 
            : 'Já tenho uma conta'
          }
        </button>

        {isLogin && (
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-xl">
            <p className="text-xs text-text-secondary text-center">
              <strong className="text-primary">🧪 Conta de Teste:</strong><br/>
              admin@ezgames.com / admin123
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

