// Sistema de Analytics - Rastreamento de eventos
// Em produção, integrar com Google Analytics 4 ou Vercel Analytics

export type EventType = 
  | 'page_view'
  | 'product_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'search'
  | 'login'
  | 'sign_up'

interface AnalyticsEvent {
  event: EventType
  timestamp: string
  data?: Record<string, any>
  userId?: string
  sessionId?: string
}

class Analytics {
  private sessionId: string
  private events: AnalyticsEvent[] = []

  constructor() {
    this.sessionId = this.getOrCreateSessionId()
  }

  private getOrCreateSessionId(): string {
    if (typeof window === 'undefined') return ''
    
    let sessionId = sessionStorage.getItem('analytics_session_id')
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('analytics_session_id', sessionId)
    }
    return sessionId
  }

  track(event: EventType, data?: Record<string, any>, userId?: string) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      timestamp: new Date().toISOString(),
      data,
      userId,
      sessionId: this.sessionId
    }

    this.events.push(analyticsEvent)
    console.log('📊 Analytics Event:', analyticsEvent)

    // Em produção, enviar para backend/Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, data)
    }
  }

  // Eventos específicos
  pageView(page: string) {
    this.track('page_view', { page, path: window.location.pathname })
  }

  productView(productId: string, productName: string, price: number) {
    this.track('product_view', {
      product_id: productId,
      product_name: productName,
      price,
      currency: 'BRL'
    })
  }

  addToCart(productId: string, productName: string, price: number, quantity: number = 1) {
    this.track('add_to_cart', {
      product_id: productId,
      product_name: productName,
      price,
      quantity,
      currency: 'BRL',
      value: price * quantity
    })
  }

  removeFromCart(productId: string, productName: string, price: number) {
    this.track('remove_from_cart', {
      product_id: productId,
      product_name: productName,
      price,
      currency: 'BRL'
    })
  }

  beginCheckout(items: Array<{id: string; name: string; price: number; quantity: number}>, total: number) {
    this.track('begin_checkout', {
      items,
      value: total,
      currency: 'BRL',
      num_items: items.length
    })
  }

  purchase(orderId: string, total: number, items: Array<{id: string; name: string; price: number; quantity: number}>, paymentMethod: string) {
    this.track('purchase', {
      transaction_id: orderId,
      value: total,
      currency: 'BRL',
      items,
      payment_method: paymentMethod,
      num_items: items.length
    })
  }

  search(searchTerm: string, resultsCount: number) {
    this.track('search', {
      search_term: searchTerm,
      results_count: resultsCount
    })
  }

  login(userId: string, method: string = 'email') {
    this.track('login', { method }, userId)
  }

  signUp(userId: string, method: string = 'email') {
    this.track('sign_up', { method }, userId)
  }

  // Obter estatísticas da sessão
  getSessionStats() {
    return {
      sessionId: this.sessionId,
      eventsCount: this.events.length,
      events: this.events,
      startTime: this.events[0]?.timestamp,
      duration: this.events.length > 0 
        ? Date.now() - new Date(this.events[0].timestamp).getTime()
        : 0
    }
  }
}

export const analytics = new Analytics()

// Hook para facilitar uso em componentes
export function useAnalytics() {
  return {
    trackPageView: (page: string) => analytics.pageView(page),
    trackProductView: (productId: string, productName: string, price: number) => 
      analytics.productView(productId, productName, price),
    trackAddToCart: (productId: string, productName: string, price: number, quantity?: number) => 
      analytics.addToCart(productId, productName, price, quantity),
    trackRemoveFromCart: (productId: string, productName: string, price: number) => 
      analytics.removeFromCart(productId, productName, price),
    trackBeginCheckout: (items: any[], total: number) => 
      analytics.beginCheckout(items, total),
    trackPurchase: (orderId: string, total: number, items: any[], paymentMethod: string) => 
      analytics.purchase(orderId, total, items, paymentMethod),
    trackSearch: (searchTerm: string, resultsCount: number) => 
      analytics.search(searchTerm, resultsCount),
    trackLogin: (userId: string, method?: string) => 
      analytics.login(userId, method),
    trackSignUp: (userId: string, method?: string) => 
      analytics.signUp(userId, method),
  }
}

