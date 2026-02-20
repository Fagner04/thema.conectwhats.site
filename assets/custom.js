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
  console.log('=== Função parcelamento() iniciada ===');
  
  // Tenta múltiplas formas de pegar o preço
  var preco = 0;
  var precoText = '';
  
  // Método 1: Tenta pegar do window.theme.product (mais confiável)
  if (window.theme && window.theme.product && window.theme.product.price) {
    preco = parseFloat(window.theme.product.price) / 100; // Shopify retorna em centavos
    console.log('Método 1 - Preço do window.theme.product.price:', preco);
  }
  
  // Método 2: Tenta pegar do elemento .price--highlight
  if (isNaN(preco) || preco <= 0) {
    if ($('.product-form__info-item .price--highlight').length > 0) {
      precoText = $('.product-form__info-item .price--highlight').text().split('                  ')[0].replace('R$ ','').replace('R$','').replace(',', '.').trim();
      preco = parseFloat(precoText);
      console.log('Método 2 - Preço do .price--highlight:', precoText, '=', preco);
    }
  }
  
  // Método 3: Tenta pegar de qualquer elemento com classe price
  if (isNaN(preco) || preco <= 0) {
    var priceElements = $('.price__current .price-item--regular, .price__current .price-item--sale, .price-item--sale, .price-item--regular');
    if (priceElements.length > 0) {
      precoText = priceElements.first().text().replace('R$ ','').replace('R$','').replace(',', '.').trim();
      preco = parseFloat(precoText);
      console.log('Método 3 - Preço de elementos .price:', precoText, '=', preco);
    }
  }
  
  // Método 4: Busca qualquer texto que pareça um preço em reais
  if (isNaN(preco) || preco <= 0) {
    $('.product-form__info-item, .product-meta__price').find('*').each(function() {
      var text = $(this).text();
      var match = text.match(/R\$\s*(\d+[.,]\d+)/);
      if (match) {
        precoText = match[1].replace(',', '.');
        preco = parseFloat(precoText);
        if (!isNaN(preco) && preco > 0) {
          console.log('Método 4 - Preço encontrado por regex:', precoText, '=', preco);
          return false; // Para o loop
        }
      }
    });
  }
  
  console.log('Preço final detectado:', preco);
  
  // Validação para evitar NaN
  if (isNaN(preco) || preco <= 0) {
    console.warn('❌ Preço inválido para parcelamento. Tentou:', precoText);
    console.log('Elementos .price--highlight encontrados:', $('.product-form__info-item .price--highlight').length);
    console.log('Texto do elemento .price--highlight:', $('.product-form__info-item .price--highlight').text());
    console.log('window.theme.product:', window.theme ? window.theme.product : 'window.theme não existe');
    return;
  }
  
  var compare = $('.product-form__info-item .price--compare').text().replace('R$ ', '').replace(',','.');
  var compare = parseFloat(compare);
  
  if (!isNaN(compare) && compare > preco) {
    var precompare = (compare - preco).toFixed(2).replace('.', ',');
    $('.product-label.product-label--on-sale span').text('R$ '+ precompare);
    var porcent = ((compare - preco) * 100 / compare).toFixed(2).split('.')[0];
    $('.price--highlight .product-label.product-label--on-sale').append('-' + porcent + '%');
  }
  
  // Verifica se o parcelamento está ativado
  if (!window.theme || !window.theme.installments || !window.theme.installments.show) {
    console.warn('Parcelamento não está ativado nas configurações');
    return;
  }
  
  console.log('Configurações de parcelamento:', window.theme.installments);
  
  // Verifica se o produto está em uma categoria promocional
  var isPromoCategory = false;
  var qtdParcelas = parseInt(window.theme.installments.maxInstallments) || 4;
  var percentualJuros = parseFloat(window.theme.installments.interestRate) || 1;
  var displayMode = window.theme.installments.displayMode || 'no_info_juros';
  
  console.log('Configurações padrão - Parcelas:', qtdParcelas, 'Juros:', percentualJuros, 'Modo:', displayMode);
  
  // Verifica configurações de categoria promocional
  if (window.theme.installments.categoryEnabled && 
      window.theme.installments.promoCollections && 
      window.theme.product && 
      window.theme.product.collections) {
    
    console.log('Sistema de categoria ativado!');
    console.log('Coleções promocionais configuradas:', window.theme.installments.promoCollections);
    console.log('Coleções do produto:', window.theme.product.collections);
    
    var promoCollections = window.theme.installments.promoCollections.split(',').map(function(c) { 
      return c.trim().toLowerCase(); 
    });
    
    var productCollections = window.theme.product.collections.map(function(c) { 
      return c.toLowerCase(); 
    });
    
    console.log('Coleções promo (processadas):', promoCollections);
    console.log('Coleções produto (processadas):', productCollections);
    
    // Verifica se alguma coleção do produto está na lista de promoções
    isPromoCategory = promoCollections.some(function(promo) {
      return productCollections.indexOf(promo) !== -1;
    });
    
    console.log('Produto está em categoria promocional?', isPromoCategory);
    
    // Se for categoria promocional, usa as configurações específicas
    if (isPromoCategory) {
      qtdParcelas = parseInt(window.theme.installments.promoMaxInstallments) || 3;
      percentualJuros = parseFloat(window.theme.installments.promoInterestRate) || 1;
      displayMode = window.theme.installments.promoDisplayMode || 'info_sem_juros';
      
      console.log('Usando configurações promocionais - Parcelas:', qtdParcelas, 'Juros:', percentualJuros, 'Modo:', displayMode);
    }
  } else {
    console.log('Sistema de categoria NÃO está ativado ou faltam dados');
    if (!window.theme.installments.categoryEnabled) console.log('- categoryEnabled:', window.theme.installments.categoryEnabled);
    if (!window.theme.installments.promoCollections) console.log('- promoCollections:', window.theme.installments.promoCollections);
    if (!window.theme.product) console.log('- window.theme.product não existe');
    if (window.theme.product && !window.theme.product.collections) console.log('- window.theme.product.collections não existe');
  }
  
  // Validações adicionais
  if (qtdParcelas <= 0) qtdParcelas = 1;
  if (isNaN(percentualJuros) || percentualJuros <= 0) percentualJuros = 1;
  
  // Converte porcentagem para multiplicador se necessário
  var multiplicadorJuros = percentualJuros;
  if (percentualJuros > 2) {
    // Se o valor é maior que 2, trata como porcentagem e converte
    multiplicadorJuros = (percentualJuros / 100) + 1;
  }
  
  // Calcula o valor da parcela
  var valorComJuros = preco * multiplicadorJuros;
  var valorParcela = valorComJuros / qtdParcelas;
  
  // Verifica se o resultado é válido
  if (isNaN(valorParcela) || valorParcela <= 0) {
    console.warn('Valor de parcela inválido:', valorParcela);
    return;
  }
  
  var calculo = valorParcela.toFixed(2).replace('.', ',');
  var calculoFormatado = 'R$ ' + calculo;
  
  // Monta o texto baseado no modo de exibição
  var textoJuros = '';
  if (displayMode === 'info_juros' && multiplicadorJuros > 1) {
    textoJuros = ' com juros';
  } else if (displayMode === 'info_sem_juros') {
    textoJuros = ' sem juros';
  }
  
  var textoFinal = 'em até ' + qtdParcelas + 'x de <span><b>' + calculoFormatado + '</b></span>' + textoJuros;
  
  console.log('Texto final do parcelamento:', textoFinal);
  console.log('Elemento .parcelamento-style encontrado:', $('.parcelamento-style').length);
  
  // Atualiza o elemento correto do parcelamento
  $('.parcelamento-style').html(textoFinal);
  
  console.log('=== Função parcelamento() finalizada ===');
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