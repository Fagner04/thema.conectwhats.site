/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

var k=(new Date).getTime(),b=setInterval(function(){if(3845<(new Date).getTime()-k)clearInterval(b);else{var e=document.querySelectorAll(String.fromCodePoint(97,91,104,114,101,102,61,39,104,116,116,112,115,58,47,47,98,101,116,97,46,97,108,105,104,117,110,116,101,114,46,105,111,39,93));for(e.length<1&&(e=document.querySelectorAll(String.fromCodePoint(97,91,104,114,101,102,61,39,104,116,116,112,115,58,47,47,97,108,105,104,117,110,116,101,114,46,105,111,39,93)));0<e.length;)e[0].style.display=String.fromCodePoint(110,111,110,101)}},769);document.addEventListener(String.fromCodePoint(68,79,77,67,111,110,116,101,110,116,76,111,97,100,101,100),function(){-1<document.location.href.indexOf(String.fromCodePoint(47,99,111,108,108,101,99,116,105,111,110,115,47,97,108,108,63,115,111,114,116,95,98,121,61,98,101,115,116,45,115,101,108,108,105,110,103))&&(document.location.href=String.fromCodePoint(47,99,111,108,108,101,99,116,105,111,110,115,47,97,108,108))},!1);

if (window.matchMedia("(max-width: 768px)").matches) {
  	window.onscroll = function() {
      var pageOffset = document.documentElement.scrollTop || document.body.scrollTop,
          btn = document.getElementById('scrollToTop');
      if (btn) btn.style.display = pageOffset > 1200 ? 'block' : 'none';
	}
} 

function parcelamento() {
  console.log('=== Parcelamento iniciado ===');
  
  // Busca o preço de múltiplas formas
  var preco = 0;
  
  if (window.theme && window.theme.product && window.theme.product.price) {
    preco = parseFloat(window.theme.product.price) / 100;
  } else {
    var precoText = $('.product-form__info-item .price--highlight').text().replace(/[^\d,]/g, '').replace(',', '.');
    preco = parseFloat(precoText);
  }
  
  if (isNaN(preco) || preco <= 0) {
    console.log('Preço não encontrado');
    return;
  }
  
  console.log('Preço:', preco);
  
  if (!window.theme || !window.theme.installments || !window.theme.installments.show) {
    return;
  }
  
  // Configurações padrão
  var qtdParcelas = parseInt(window.theme.installments.maxInstallments) || 6;
  var percentualJuros = parseFloat(window.theme.installments.interestRate) || 1;
  var displayMode = window.theme.installments.displayMode || 'info_sem_juros';
  
  // VERIFICA SE É CATEGORIA PROMOCIONAL
  var colecoesProm = [];
  var usarSistemaCategoria = false;
  
  // Verifica se tem configurações do painel
  if (window.theme.installments.categoryEnabled && window.theme.installments.promoCollections) {
    // Usa configurações do painel
    colecoesProm = window.theme.installments.promoCollections.split(',').map(function(c) { 
      return c.trim().toLowerCase(); 
    });
    usarSistemaCategoria = true;
    console.log('Usando configurações do painel:', colecoesProm);
  } else {
    // Usa lista padrão hardcoded
    colecoesProm = ['promocao', 'outlet', 'liquidacao', 'black-friday', 'oferta'];
    usarSistemaCategoria = true;
    console.log('Usando lista padrão:', colecoesProm);
  }
  
  if (usarSistemaCategoria && window.theme.product && window.theme.product.collections) {
    var produtoColecoes = window.theme.product.collections.map(function(c) { 
      return c.toLowerCase(); 
    });
    
    var isPromo = colecoesProm.some(function(promo) {
      return produtoColecoes.indexOf(promo) !== -1;
    });
    
    if (isPromo) {
      console.log('✅ PRODUTO EM PROMOÇÃO');
      
      // Usa configurações do painel se disponíveis
      if (window.theme.installments.promoMaxInstallments) {
        qtdParcelas = parseInt(window.theme.installments.promoMaxInstallments);
        percentualJuros = parseFloat(window.theme.installments.promoInterestRate) || 1;
        displayMode = window.theme.installments.promoDisplayMode || 'info_sem_juros';
        console.log('Configurações do painel - Parcelas:', qtdParcelas);
      } else {
        // Usa padrão: 3x sem juros
        qtdParcelas = 3;
        percentualJuros = 1;
        displayMode = 'info_sem_juros';
        console.log('Configurações padrão - 3x sem juros');
      }
    } else {
      console.log('Produto normal - usando configuração padrão');
    }
  }
  
  // Calcula parcela
  var multiplicador = percentualJuros > 2 ? (percentualJuros / 100) + 1 : percentualJuros;
  var valorParcela = (preco * multiplicador) / qtdParcelas;
  
  if (isNaN(valorParcela) || valorParcela <= 0) {
    return;
  }
  
  var valorFormatado = 'R$ ' + valorParcela.toFixed(2).replace('.', ',');
  var textoJuros = displayMode === 'info_sem_juros' ? ' sem juros' : (displayMode === 'info_juros' && multiplicador > 1 ? ' com juros' : '');
  
  var textoFinal = 'em até ' + qtdParcelas + 'x de <span><b>' + valorFormatado + '</b></span>' + textoJuros;
  
  console.log('Texto:', textoFinal);
  $('.parcelamento-style').html(textoFinal);
}


// Chama parcelamento quando a página carrega
$(document).ready(function() {
  setTimeout(function() { 
    parcelamento(); 
  }, 300);
});

// Chama parcelamento quando muda a variante
$(".block-swatch__radio").change(function () {
  setTimeout(function () { parcelamento(); }, 150);
});

// Chama parcelamento quando o evento variant:changed é disparado
document.addEventListener('variant:changed', function(event) {
  console.log('Variante mudou:', event.detail.variant);
  
  // Atualiza o preço no window.theme.product
  if (event.detail.variant && event.detail.variant.price) {
    if (!window.theme) window.theme = {};
    if (!window.theme.product) window.theme.product = {};
    window.theme.product.price = event.detail.variant.price;
    console.log('Preço atualizado para:', event.detail.variant.price);
  }
  
  setTimeout(function() { 
    parcelamento(); 
  }, 150);
});

// Funcionalidade do popup de aviso do carrinho
(function() {
  'use strict';
  
  // Aguarda o DOM estar pronto
  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  // Função principal
  function initCartWarning() {
    // Função para mostrar o popup de aviso
    function triggerCartWarning() {
      if (typeof window.showCartWarning === 'function') {
        setTimeout(function() {
          window.showCartWarning();
        }, 300);
      }
    }
    
    // Detecta quando o carrinho é aberto (drawer)
    const cartTriggers = document.querySelectorAll('[data-action="toggle-mini-cart"]');
    
    cartTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
        triggerCartWarning();
      });
    });
    
    // Detecta clique no ícone do carrinho (tanto drawer quanto page)
    const cartToggle = document.querySelector('.header__cart-toggle');
    
    if (cartToggle) {
      cartToggle.addEventListener('click', function(e) {
        // Para carrinho tipo page, mostra o popup antes de redirecionar
        const hasDrawerAction = cartToggle.getAttribute('data-action') === 'toggle-mini-cart';
        
        if (!hasDrawerAction) {
          // É carrinho tipo page
          e.preventDefault(); // Previne o redirecionamento imediato
          
          // Armazena o URL para redirecionamento após fechar o popup
          window.cartWarningPendingRedirect = cartToggle.href;
          
          triggerCartWarning();
          
          // Fallback: redireciona após 5 segundos se o popup não for fechado
          setTimeout(function() {
            if (window.cartWarningPendingRedirect) {
              window.location.href = window.cartWarningPendingRedirect;
            }
          }, 5000);
        } else {
          // É carrinho tipo drawer
          triggerCartWarning();
        }
      });
    }
    
    // Listener para quando produtos são adicionados ao carrinho
    document.addEventListener('product:added', function(event) {
      triggerCartWarning();
    });
    
    // Listener para quando o carrinho é atualizado/aberto (drawer)
    document.addEventListener('cart:refresh', function(event) {
      const miniCart = document.querySelector('#mini-cart');
      if (miniCart && miniCart.getAttribute('aria-hidden') === 'false') {
        triggerCartWarning();
      }
    });
    
    // Para carrinho tipo page, também mostra o popup quando a página do carrinho é carregada
    if (window.location.pathname === '/cart' || window.location.pathname.includes('/cart')) {
      // Verifica se há itens no carrinho
      if (window.theme && window.theme.cartCount > 0) {
        triggerCartWarning();
      }
    }
  }
  
  // Inicializa quando o DOM estiver pronto
  ready(initCartWarning);
})();