/* =====================================================
   HERA WAFFLE — INTERACTIVE LOGIC
   =====================================================
   - Renders menu cards by category
   - Handles category tab switching with stagger animation
   - Opens / closes the detail modal
   - Image error fallback (gradient + dish name)
   - Supports dual-format pricing for waffles (Bardak / Kova)
   ===================================================== */

(function () {
  "use strict";

  /* ---------- WAFFLE FORMATS (shared by all waffles) ---------- */
  const WAFFLE_FORMATS = [
    { name: "Bardak (2 tane)", price: "200 TL" },
    { name: "Kova",            price: "150 TL" }
  ];

  /* ---------- MENU DATA ---------- */
  const MENU = [
    /* ============ WAFFLE ============ */
    {
      id: "w-yin-yang",
      category: "waffle",
      name: "Yin-Yang",
      desc: "Beyaz çikolata ve bitter çikolatanın zıtlıkların buluştuğu uyumu. İki farklı tonun mükemmel dengesi.",
      formats: WAFFLE_FORMATS,
      tags: ["Beyaz Çikolata", "Bitter"],
      emoji: "🧇",
      image: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🤍", name: "Beyaz Çikolata" },
        { icon: "🍫", name: "Bitter Çikolata" }
      ]
    },
    {
      id: "w-klasik",
      category: "waffle",
      name: "Klasik",
      desc: "Beyaz çikolata ve sütlü çikolatanın klasik buluşması. Dengeli, doyurucu ve her zaman favori.",
      formats: WAFFLE_FORMATS,
      tags: ["Beyaz Çikolata", "Sütlü"],
      emoji: "🧇",
      image: "https://images.unsplash.com/photo-1647210391533-5fe30109e94a?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🤍", name: "Beyaz Çikolata" },
        { icon: "🍫", name: "Sütlü Çikolata" }
      ]
    },
    {
      id: "w-esmerim",
      category: "waffle",
      name: "Esmerim",
      desc: "Sütlü çikolatanın yumuşaklığı ve karamelin tatlı yoğunluğu. Adı kadar sıcak bir lezzet.",
      formats: WAFFLE_FORMATS,
      tags: ["Sütlü", "Karamel"],
      emoji: "🍯",
      image: "https://images.unsplash.com/photo-1441633980922-d18ca151ee64?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🍫", name: "Sütlü Çikolata" },
        { icon: "🍯", name: "Karamel" }
      ]
    },
    {
      id: "w-afrodit",
      category: "waffle",
      name: "Afrodit",
      desc: "Beyaz çikolata ve frambuazın tutkulu birleşimi. Aşk tanrıçasından ilham alan zarif bir tatlı.",
      formats: WAFFLE_FORMATS,
      tags: ["Beyaz Çikolata", "Frambuaz"],
      emoji: "🫐",
      image: "https://images.unsplash.com/photo-1576615278693-f8e095e37e01?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🤍", name: "Beyaz Çikolata" },
        { icon: "🫐", name: "Frambuaz" }
      ]
    },
    {
      id: "w-prenses",
      category: "waffle",
      name: "Prenses",
      desc: "Beyaz çikolata ve taze çileğin masal gibi uyumu. Zarif ve hafif, her ısırıkta romantizm.",
      formats: WAFFLE_FORMATS,
      tags: ["Beyaz Çikolata", "Çilek"],
      emoji: "🍓",
      image: "https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🤍", name: "Beyaz Çikolata" },
        { icon: "🍓", name: "Çilek" }
      ]
    },
    {
      id: "w-karam",
      category: "waffle",
      name: "Karam",
      desc: "Sütlü çikolatanın tatlılığı ve bitter çikolatanın karakteri. Güçlü ve dengeli bir seçim.",
      formats: WAFFLE_FORMATS,
      tags: ["Sütlü", "Bitter"],
      emoji: "🍫",
      image: "https://images.unsplash.com/photo-1562513872-634b8fae6dbe?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🍫", name: "Sütlü Çikolata" },
        { icon: "🍫", name: "Bitter Çikolata" }
      ]
    },
    {
      id: "w-poseidon",
      category: "waffle",
      name: "Poseidon",
      desc: "Beyaz çikolata ve ferahlatıcı bubble aroması. Denizler tanrısının serin esintisi gibi farklı.",
      formats: WAFFLE_FORMATS,
      tags: ["Beyaz Çikolata", "Bubble"],
      emoji: "🫧",
      image: "https://images.unsplash.com/photo-1641463495236-ff3a7269c76d?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🤍", name: "Beyaz Çikolata" },
        { icon: "🫧", name: "Bubble" }
      ]
    },
    {
      id: "w-lotus",
      category: "waffle",
      name: "Lotus",
      desc: "Beyaz çikolata ve karamelize Lotus krema. Karamel sevenlerin vazgeçilmezi.",
      formats: WAFFLE_FORMATS,
      tags: ["Beyaz Çikolata", "Karamel"],
      emoji: "🍪",
      image: "https://images.unsplash.com/photo-1647209933551-eb2e758e1b98?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🤍", name: "Beyaz Çikolata" },
        { icon: "🍯", name: "Lotus Karamel" },
        { icon: "🍪", name: "Lotus Bisküvi" }
      ]
    },
    {
      id: "w-marjinal",
      category: "waffle",
      name: "Marjinal",
      desc: "Bubble ve frambuazın sıra dışı buluşması. Cesur damaklara özel, alışılmışın dışında bir deneyim.",
      formats: WAFFLE_FORMATS,
      tags: ["Bubble", "Frambuaz"],
      emoji: "🫧",
      image: "https://images.unsplash.com/photo-1558584724-0e4d32ca55a4?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🫧", name: "Bubble" },
        { icon: "🫐", name: "Frambuaz" }
      ]
    },

    /* ============ KAHVE (hepsi 70 TL) ============ */
    {
      id: "k-espresso",
      category: "kahve",
      name: "Espresso",
      desc: "Yoğun, konsantre ve aromatik tek shot İtalyan kahvesi. Gerçek kahve tutkunları için.",
      price: "70 TL",
      tags: ["Yoğun", "Klasik"],
      emoji: "☕",
      image: "https://images.pexels.com/photos/26626461/pexels-photo-26626461.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Espresso (30ml)" }
      ]
    },
    {
      id: "k-americano",
      category: "kahve",
      name: "Americano",
      desc: "Espresso üzerine sıcak su eklenerek hazırlanır. Sade ve doyurucu, gün boyu içilebilir.",
      price: "70 TL",
      tags: ["Sade", "Hafif"],
      emoji: "☕",
      image: "https://images.unsplash.com/photo-1497636577773-f1231844b336?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "☕", name: "Espresso" },
        { icon: "💧", name: "Sıcak Su" }
      ]
    },
    {
      id: "k-latte",
      category: "kahve",
      name: "Latte",
      desc: "Bir shot espresso üzerine ipek dokulu buharlanmış süt ve hafif köpük. Yumuşak ve dengeli.",
      price: "70 TL",
      tags: ["Sütlü", "Yumuşak"],
      emoji: "🥛",
      image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "☕", name: "Espresso" },
        { icon: "🥛", name: "Buharlı Süt" },
        { icon: "☁️", name: "Köpük" }
      ]
    },
    {
      id: "k-latte-macchiato",
      category: "kahve",
      name: "Latte Macchiato",
      desc: "Önce buharlı süt, üzerine bir shot espresso bırakılır. Katmanlı görünümü ve zarif lezzeti ile.",
      price: "70 TL",
      tags: ["Katmanlı", "Sütlü"],
      emoji: "🥛",
      image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🥛", name: "Buharlı Süt" },
        { icon: "☕", name: "Espresso" },
        { icon: "☁️", name: "Köpük" }
      ]
    },
    {
      id: "k-cappuccino",
      category: "kahve",
      name: "Cappuccino",
      desc: "Eşit oranlarda espresso, buharlı süt ve kalın süt köpüğü. İtalyan kahve geleneğinin klasiği.",
      price: "70 TL",
      tags: ["Klasik", "Köpüklü"],
      emoji: "☕",
      image: "https://images.pexels.com/photos/2396220/pexels-photo-2396220.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Espresso" },
        { icon: "🥛", name: "Süt" },
        { icon: "☁️", name: "Köpük" }
      ]
    },
    {
      id: "k-flat-white",
      category: "kahve",
      name: "Flat White",
      desc: "Çift shot espresso üzerine ipek dokulu mikro köpüklü süt. Yoğun aroma ve kremsi doku.",
      price: "70 TL",
      tags: ["Yoğun", "Mikro Köpük"],
      emoji: "☕",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "☕", name: "Çift Espresso" },
        { icon: "🥛", name: "Mikro Köpük" }
      ]
    },
    {
      id: "k-cortado",
      category: "kahve",
      name: "Cortado",
      desc: "Espresso ile eşit oranda buharlı sütün dengeli buluşması. Yumuşak ama karakterli.",
      price: "70 TL",
      tags: ["Dengeli", "Sütlü"],
      emoji: "☕",
      image: "https://images.pexels.com/photos/4860407/pexels-photo-4860407.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Espresso" },
        { icon: "🥛", name: "Buharlı Süt" }
      ]
    },
    {
      id: "k-espresso-macchiato",
      category: "kahve",
      name: "Espresso Macchiato",
      desc: "Yoğun espresso üzerine bir damla süt köpüğü. Espresso'yu yumuşatan zarif bir dokunuş.",
      price: "70 TL",
      tags: ["Yoğun", "Hafif Köpük"],
      emoji: "☕",
      image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "☕", name: "Espresso" },
        { icon: "☁️", name: "Köpük (1 kaşık)" }
      ]
    },
    {
      id: "k-ristretto-bianco",
      category: "kahve",
      name: "Ristretto Bianco",
      desc: "Kısa çekim ristretto shot üzerine ipek dokulu süt. Daha yoğun ve karakterli flat white versiyonu.",
      price: "70 TL",
      tags: ["Ristretto", "Yoğun"],
      emoji: "☕",
      image: "https://images.pexels.com/photos/11160146/pexels-photo-11160146.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Ristretto" },
        { icon: "🥛", name: "Buharlı Süt" }
      ]
    },
    {
      id: "k-turk-kahvesi",
      category: "kahve",
      name: "Türk Kahvesi",
      desc: "Geleneksel cezvede pişirilen, köpüğüyle servis edilen klasik Türk kahvesi. Sade, orta veya şekerli tercih edilebilir.",
      price: "70 TL",
      tags: ["Geleneksel", "Klasik"],
      emoji: "☕",
      image: "https://images.pexels.com/photos/9981613/pexels-photo-9981613.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Türk Kahvesi" },
        { icon: "💧", name: "Su" },
        { icon: "🍬", name: "Şeker (opsiyonel)" }
      ]
    },
    {
      id: "k-dibek-kahvesi",
      category: "kahve",
      name: "Dibek Kahvesi",
      desc: "Taş dibekte dövülerek hazırlanan, kakao ve baharatlarla zenginleştirilmiş yoğun aromalı geleneksel kahve.",
      price: "70 TL",
      tags: ["Geleneksel", "Yoğun"],
      emoji: "☕",
      image: "https://images.pexels.com/photos/36535219/pexels-photo-36535219.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Dibek Kahvesi" },
        { icon: "🍫", name: "Kakao" },
        { icon: "✨", name: "Baharat Karışımı" }
      ]
    },
    {
      id: "k-menengic-kahvesi",
      category: "kahve",
      name: "Menengiç Kahvesi",
      desc: "Menengiç çekirdeği ve sütle hazırlanan, doğal kafeinsiz Güneydoğu Anadolu özel kahvesi. Fındıksı ve kremsi.",
      price: "70 TL",
      tags: ["Yöresel", "Kafeinsiz"],
      emoji: "🌰",
      image: "https://images.pexels.com/photos/9981720/pexels-photo-9981720.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🌰", name: "Menengiç" },
        { icon: "🥛", name: "Süt" }
      ]
    },
    {
      id: "k-osmanli-kahvesi",
      category: "kahve",
      name: "Osmanlı Kahvesi",
      desc: "Damla sakızı, kakule ve özel baharatlarla zenginleştirilmiş saray usulü Türk kahvesi. Tarihten gelen zarif lezzet.",
      price: "70 TL",
      tags: ["Saray Usulü", "Baharatlı"],
      emoji: "☕",
      image: "https://images.pexels.com/photos/36823333/pexels-photo-36823333.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Türk Kahvesi" },
        { icon: "✨", name: "Damla Sakızı" },
        { icon: "🌱", name: "Kakule" }
      ]
    },
    {
      id: "k-mocha",
      category: "kahve",
      name: "Mocha",
      desc: "Espresso, sütlü çikolata sosu ve buharlı sütün buluşması. Çikolata sevenler için kremsi kahve klasiği.",
      price: "70 TL",
      tags: ["Çikolata", "Tatlı"],
      emoji: "🍫",
      image: "https://images.pexels.com/photos/11512983/pexels-photo-11512983.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Espresso" },
        { icon: "🍫", name: "Çikolata Sosu" },
        { icon: "🥛", name: "Buharlı Süt" }
      ]
    },
    {
      id: "k-cold-brew",
      category: "kahve",
      name: "Cold Brew",
      desc: "12 saat boyunca soğuk infüzyon yöntemiyle demlenmiş, yumuşak ve düşük asitli buzlu kahve. Yoğun ama nazik.",
      price: "70 TL",
      tags: ["Soğuk İnfüzyon", "Yumuşak"],
      emoji: "🧊",
      image: "https://images.pexels.com/photos/2775860/pexels-photo-2775860.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Soğuk İnfüzyon Kahve" },
        { icon: "🧊", name: "Buz" }
      ]
    },

    /* ============ SOĞUK İÇECEKLER ============ */
    /* --- Spesyal (100 TL) --- */
    {
      id: "s-cool-lime",
      category: "soguk",
      name: "Cool Lime",
      desc: "Misket limonu, nane yaprakları ve ferahlatıcı bir dokunuşla hazırlanan imza içeceğimiz.",
      price: "100 TL",
      tags: ["Spesyal", "Ferahlatıcı"],
      emoji: "🟢",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🟢", name: "Misket Limonu" },
        { icon: "🌿", name: "Nane" },
        { icon: "🧊", name: "Buz" }
      ]
    },
    {
      id: "s-berry-hibiscus",
      category: "soguk",
      name: "Berry Hibiscus",
      desc: "Hibiscus çiçeği ve karışık orman meyveleri ile hazırlanan rengarenk, antioksidan dolu içecek.",
      price: "100 TL",
      tags: ["Spesyal", "Meyveli"],
      emoji: "🌺",
      image: "https://images.pexels.com/photos/17379797/pexels-photo-17379797.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🌺", name: "Hibiscus" },
        { icon: "🫐", name: "Orman Meyveleri" },
        { icon: "🧊", name: "Buz" }
      ]
    },
    {
      id: "s-kuzu-kulagi",
      category: "soguk",
      name: "Kuzu Kulağı",
      desc: "Kuzu kulağı bitkisinden hazırlanan, ferahlatıcı ve geleneksel bir Anadolu içeceği.",
      price: "100 TL",
      tags: ["Spesyal", "Doğal"],
      emoji: "🌿",
      image: "https://images.pexels.com/photos/4315984/pexels-photo-4315984.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🌿", name: "Kuzu Kulağı" },
        { icon: "🍋", name: "Limon" },
        { icon: "🧊", name: "Buz" }
      ]
    },
    /* --- Soğuk içecekler (70 TL) --- */
    {
      id: "s-cilek-kakao-smoothie",
      category: "soguk",
      name: "Çilek/Kakao Smoothie",
      desc: "Taze çilek ve kakaonun kremsi smoothie buluşması. Tatlı ve doyurucu.",
      price: "70 TL",
      tags: ["Smoothie", "Çilek"],
      emoji: "🥤",
      image: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🍓", name: "Çilek" },
        { icon: "🍫", name: "Kakao" },
        { icon: "🥛", name: "Süt" }
      ]
    },
    {
      id: "s-cilek-milkshake",
      category: "soguk",
      name: "Çilekli Milkshake",
      desc: "Taze çilek, vanilyalı dondurma ve süt ile hazırlanan klasik milkshake. Üzerinde kremşanti.",
      price: "70 TL",
      tags: ["Milkshake", "Çilek"],
      emoji: "🍓",
      image: "https://images.pexels.com/photos/10066814/pexels-photo-10066814.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🍓", name: "Çilek" },
        { icon: "🍦", name: "Dondurma" },
        { icon: "🥛", name: "Süt" }
      ]
    },
    {
      id: "s-muz-milkshake",
      category: "soguk",
      name: "Muzlu Milkshake",
      desc: "Olgun muz, vanilyalı dondurma ve süt karışımı. Doyurucu ve kremsi.",
      price: "70 TL",
      tags: ["Milkshake", "Muz"],
      emoji: "🍌",
      image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🍌", name: "Muz" },
        { icon: "🍦", name: "Vanilya" },
        { icon: "🥛", name: "Süt" }
      ]
    },
    {
      id: "s-cikolata-frappe",
      category: "soguk",
      name: "Çikolatalı Frappe",
      desc: "Buzlu kahve, çikolata sosu ve süt bir araya gelerek krema gibi yoğun bir tat oluşturur.",
      price: "70 TL",
      tags: ["Frappe", "Çikolata"],
      emoji: "☕",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "☕", name: "Kahve" },
        { icon: "🍫", name: "Çikolata" },
        { icon: "🧊", name: "Buz" },
        { icon: "🥛", name: "Süt" }
      ]
    },
    {
      id: "s-soguk-kahve",
      category: "soguk",
      name: "Soğuk Kahve",
      desc: "Buzlu süt üzerine taze çekilmiş espresso shot. Sıcak günlerde enerji veren klasik.",
      price: "70 TL",
      tags: ["Kahve", "Buzlu"],
      emoji: "🧊",
      image: "https://images.pexels.com/photos/14761085/pexels-photo-14761085.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "☕", name: "Espresso" },
        { icon: "🥛", name: "Süt" },
        { icon: "🧊", name: "Buz" }
      ]
    },
    /* --- Soda / hafif içecekler (40 TL) --- */
    {
      id: "s-limonata",
      category: "soguk",
      name: "Limonata",
      desc: "Taze sıkılmış limon, nane yaprakları ve doğal şeker ile hazırlanan ev yapımı limonata.",
      price: "40 TL",
      tags: ["Doğal", "Klasik"],
      emoji: "🍋",
      image: "https://images.pexels.com/photos/2960894/pexels-photo-2960894.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🍋", name: "Taze Limon" },
        { icon: "🌿", name: "Nane" },
        { icon: "🧊", name: "Buz" }
      ]
    },
    {
      id: "s-cilek-limonata",
      category: "soguk",
      name: "Çilekli Limonata",
      desc: "Taze çilek püresi ile zenginleştirilmiş klasik ev yapımı limonatamız. Hem ferah hem meyveli.",
      price: "40 TL",
      tags: ["Çilek", "Ferahlatıcı"],
      emoji: "🍓",
      image: "https://images.pexels.com/photos/102736/pexels-photo-102736.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🍓", name: "Çilek" },
        { icon: "🍋", name: "Limon" },
        { icon: "🌿", name: "Nane" }
      ]
    },
    {
      id: "s-soda",
      category: "soguk",
      name: "Maden Sodası",
      desc: "Soğuk maden sodası, isteğe göre limon veya nane ile servis edilir.",
      price: "40 TL",
      tags: ["Maden"],
      emoji: "💧",
      image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "💧", name: "Maden Suyu" },
        { icon: "🍋", name: "Limon (opsiyonel)" }
      ]
    },
    {
      id: "s-gazli",
      category: "soguk",
      name: "Gazlı İçecek",
      desc: "Kola, Fanta veya Sprite seçenekleri. Soğuk olarak servis edilir.",
      price: "40 TL",
      tags: ["Klasik"],
      emoji: "🥤",
      image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "🥤", name: "Gazlı İçecek" },
        { icon: "🧊", name: "Buz" }
      ]
    },
    /* --- Su (20 TL) --- */
    {
      id: "s-su",
      category: "soguk",
      name: "Su",
      desc: "Soğuk içme suyu, 0,5 lt şişe.",
      price: "20 TL",
      tags: ["Su"],
      emoji: "💧",
      image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=900&q=80&auto=format&fit=crop",
      ingredients: [
        { icon: "💧", name: "İçme Suyu" }
      ]
    },

    /* ============ ÇAY (hepsi 20 TL) ============ */
    {
      id: "c-siyah-cay",
      category: "cay",
      name: "Siyah Çay",
      desc: "Demlikten taze süzülmüş, koyu ve aromatik geleneksel Türk çayı. İnce belli bardakta servis edilir.",
      price: "20 TL",
      tags: ["Geleneksel", "Sıcak"],
      emoji: "🍵",
      image: "https://images.pexels.com/photos/6975972/pexels-photo-6975972.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🍃", name: "Siyah Çay" },
        { icon: "💧", name: "Sıcak Su" }
      ]
    },
    {
      id: "c-yesil-cay",
      category: "cay",
      name: "Yeşil Çay",
      desc: "Hafif ve antioksidan dolu yeşil çay. Sade veya yasemin aromalı tercih edilebilir.",
      price: "20 TL",
      tags: ["Sağlıklı", "Hafif"],
      emoji: "🍃",
      image: "https://images.pexels.com/photos/8474187/pexels-photo-8474187.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🍵", name: "Yeşil Çay" },
        { icon: "💧", name: "Sıcak Su" }
      ]
    },
    {
      id: "c-oralet",
      category: "cay",
      name: "Oralet",
      desc: "Sıcak içildiğinde içinizi ısıtan, çeşit çeşit aromalı oralet. Elma, limon, kuşburnu seçenekleri.",
      price: "20 TL",
      tags: ["Aromalı", "Sıcak"],
      emoji: "🍎",
      image: "https://images.pexels.com/photos/8678927/pexels-photo-8678927.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🍎", name: "Elma" },
        { icon: "🍋", name: "Limon" },
        { icon: "🌹", name: "Kuşburnu" }
      ]
    },

    /* ============ KRUVASAN (Yakında) ============ */
    {
      id: "kr-cilek",
      category: "kruvasan",
      name: "Çilekli Kruvasan",
      desc: "Tereyağlı katmanlı kruvasan, taze çilek ve kremşanti ile süslenmiş. Hafif, yumuşak, romantik bir lezzet.",
      price: "Yakında",
      tags: ["Çilek", "Kremşanti"],
      emoji: "🥐",
      comingSoon: true,
      image: "https://images.pexels.com/photos/30380508/pexels-photo-30380508.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🥐", name: "Kruvasan" },
        { icon: "🍓", name: "Çilek" },
        { icon: "🍦", name: "Kremşanti" }
      ]
    },
    {
      id: "kr-orman-meyveli",
      category: "kruvasan",
      name: "Orman Meyveli Kruvasan",
      desc: "Çıtır kruvasan, böğürtlen, frambuaz ve yaban mersini kreması ile dolu. Meyveli ve yoğun.",
      price: "Yakında",
      tags: ["Orman Meyveli", "Kremalı"],
      emoji: "🥐",
      comingSoon: true,
      image: "https://images.pexels.com/photos/10560686/pexels-photo-10560686.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🥐", name: "Kruvasan" },
        { icon: "🫐", name: "Orman Meyveleri" },
        { icon: "🍦", name: "Vanilyalı Krema" }
      ]
    },
    {
      id: "kr-cikolatali",
      category: "kruvasan",
      name: "Çikolatalı Kruvasan",
      desc: "Sıcacık tereyağlı kruvasan, yoğun sütlü çikolata ve kremşanti dolgu. Klasik favori.",
      price: "Yakında",
      tags: ["Çikolata", "Kremşanti"],
      emoji: "🥐",
      comingSoon: true,
      image: "https://images.pexels.com/photos/20819705/pexels-photo-20819705.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🥐", name: "Kruvasan" },
        { icon: "🍫", name: "Sütlü Çikolata" },
        { icon: "🍦", name: "Kremşanti" }
      ]
    },
    {
      id: "kr-muz-cikolata",
      category: "kruvasan",
      name: "Muzlu Çikolatalı Kruvasan",
      desc: "Olgun muz dilimleri, bitter çikolata sosu ve kremşanti ile zenginleştirilmiş kruvasan.",
      price: "Yakında",
      tags: ["Muz", "Çikolata"],
      emoji: "🥐",
      comingSoon: true,
      image: "https://images.pexels.com/photos/20819720/pexels-photo-20819720.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🥐", name: "Kruvasan" },
        { icon: "🍌", name: "Muz" },
        { icon: "🍫", name: "Bitter Çikolata" },
        { icon: "🍦", name: "Kremşanti" }
      ]
    },

    /* ============ KAMPANYA ============ */
    {
      id: "kmp-waffle-kahve",
      category: "kampanya",
      name: "Waffle + Kahve",
      desc: "Bir kova waffle yanında kahve. Tatlının yanına aromalı bir dokunuş — kampanya fiyatıyla.",
      price: "220 TL",
      tags: ["Fırsat", "İkili"],
      emoji: "🎁",
      image: "https://images.pexels.com/photos/4686818/pexels-photo-4686818.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🧇", name: "Bardak Waffle (1 adet)" },
        { icon: "☕", name: "Kahve (1 adet)" }
      ]
    },
    {
      id: "kmp-waffle-limonata",
      category: "kampanya",
      name: "Waffle + Limonata",
      desc: "Sıcacık waffle yanında ev yapımı limonata. Yaz günlerine özel tatlı + ferah ikilisi.",
      price: "230 TL",
      tags: ["Fırsat", "İkili"],
      emoji: "🎁",
      image: "data:image/jpeg;base64,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",
      ingredients: [
        { icon: "🧇", name: "Bardak Waffle (1 adet)" },
        { icon: "🍋", name: "Limonata (1 bardak)" }
      ]
    },
    {
      id: "kmp-2-waffle",
      category: "kampanya",
      name: "2 Kişilik Waffle Menü",
      desc: "İki bardak waffle + iki içecek (kahve, çay veya limonata) tercihinizle. Birlikte daha tatlı.",
      price: "380 TL",
      tags: ["Fırsat", "Çiftler İçin"],
      emoji: "💞",
      image: "https://images.pexels.com/photos/27008492/pexels-photo-27008492.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🧇", name: "Bardak Waffle (2 adet)" },
        { icon: "🥤", name: "İçecek seçimi (2 adet)" }
      ]
    }
  ];

  /* ---------- DOM ---------- */
  const grid = document.getElementById("menuGrid");
  const tabs = document.querySelectorAll(".cat-tab");
  const modal = document.getElementById("itemModal");
  const modalImage = document.getElementById("modalImage");
  const modalImageFallback = document.getElementById("modalImageFallback");
  const modalPrice = document.getElementById("modalPrice");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalIngredients = document.getElementById("modalIngredients");
  const yearEl = document.getElementById("year");

  /* ---------- HELPERS ---------- */
  const categoryLabel = {
    waffle: "Waffle",
    kahve: "Kahve",
    soguk: "Soğuk İçecek",
    cay: "Çay"
  };

  function escapeHTML(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
  }

  // Render the price chip — single price or dual-format
  function priceChipHTML(item) {
    if (item.formats && item.formats.length) {
      const nums = item.formats
        .map((f) => f.price.replace(/\s*TL\s*/i, "").trim())
        .join(" / ");
      return `
        <span class="card-price two-line">
          <span class="price-main">${escapeHTML(nums)} TL</span>
          <span class="price-sub">Bardak / Kova</span>
        </span>`;
    }
    return `<span class="card-price">${escapeHTML(item.price)}</span>`;
  }

  /* ---------- RENDER MENU ---------- */
  function renderMenu(category) {
    const items = MENU.filter((it) => it.category === category);
    grid.innerHTML = "";

    items.forEach((item, i) => {
      const card = document.createElement("article");
      card.className = "menu-card";
      card.style.animationDelay = `${0.06 * i}s`;
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${item.name} detaylarını gör`);

      const tagsHTML = item.tags
        .map((t) => `<span class="card-tag">${escapeHTML(t)}</span>`)
        .join("");

      const comingSoonBadge = item.comingSoon
        ? `<div class="coming-soon-overlay" aria-hidden="true"><span class="coming-soon-text">YAKINDA</span></div>`
        : "";

      card.innerHTML = `
        <div class="card-image${item.comingSoon ? " is-coming-soon" : ""}">
          <div class="card-image-fallback">
            <span class="fb-name">${escapeHTML(item.name)}</span>
            <span class="fb-tag">Hera Waffle</span>
          </div>
          <img src="${item.image}" alt="${escapeHTML(item.name)}" loading="lazy" />
          ${comingSoonBadge}
          ${priceChipHTML(item)}
        </div>
        <div class="card-body">
          <h3 class="card-title">${escapeHTML(item.name)}</h3>
          <p class="card-desc">${escapeHTML(item.desc)}</p>
          <div class="card-tags">${tagsHTML}</div>
          <div class="card-cta-row">
            <span>Detayları Gör</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"
                 stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </div>
        </div>
      `;

      const open = () => openModal(item);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });

      // Show fallback only if the image actually fails to load
      const cardImageEl = card.querySelector(".card-image");
      const imgEl = card.querySelector(".card-image img");
      imgEl.addEventListener("error", () => {
        imgEl.style.display = "none";
        cardImageEl.classList.add("image-failed");
      });

      grid.appendChild(card);
    });
  }

  /* ---------- TABS ---------- */
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("is-active")) return;

      tabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      renderMenu(tab.dataset.category);
    });
  });

  /* ---------- EMOJI RAIN (waffle malzemelerine göre yağmur efekti) ---------- */
  (function injectEmojiRainStyles() {
    if (document.getElementById("emoji-rain-styles")) return;
    const style = document.createElement("style");
    style.id = "emoji-rain-styles";
    style.textContent = `
      .emoji-rain-layer {
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 99999;
        overflow: hidden;
      }
      .emoji-rain-layer span {
        position: absolute;
        top: -10vh;
        will-change: transform, opacity;
        animation-name: emojiFall;
        animation-timing-function: cubic-bezier(.4,.05,.7,1);
        animation-fill-mode: forwards;
        filter: drop-shadow(0 4px 6px rgba(107, 24, 32, 0.25));
      }
      @keyframes emojiFall {
        0%   { transform: translate3d(0, 0, 0) rotate(0deg);                    opacity: 0; }
        8%   { opacity: 1; }
        100% { transform: translate3d(var(--drift), 115vh, 0) rotate(var(--rot)); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  })();

  function rainEmojis(emojis, count) {
    if (!emojis || !emojis.length) return;
    const COUNT = count || 45;
    const layer = document.createElement("div");
    layer.className = "emoji-rain-layer";
    document.body.appendChild(layer);

    for (let i = 0; i < COUNT; i++) {
      const s = document.createElement("span");
      // Rastgele bir emoji seç → her malzeme dengeli karışır
      s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const left   = Math.random() * 100;            // vw
      const size   = 18 + Math.random() * 28;        // px
      const dur    = 2.6 + Math.random() * 2.6;      // s
      const delay  = Math.random() * 1.4;            // s
      const rot    = ((Math.random() * 720) - 360) | 0;
      const drift  = ((Math.random() * 120) - 60) | 0;
      s.style.left = left + "vw";
      s.style.fontSize = size + "px";
      s.style.animationDuration = dur + "s";
      s.style.animationDelay = delay + "s";
      s.style.setProperty("--drift", drift + "px");
      s.style.setProperty("--rot", rot + "deg");
      layer.appendChild(s);
    }

    // cleanup after the longest possible animation finishes
    setTimeout(() => layer.remove(), 7000);
  }

  /* ---------- MODAL ---------- */
  function openModal(item) {
    modalEyebrow.textContent = categoryLabel[item.category] || "";
    modalTitle.textContent = item.name;
    modalDesc.textContent = item.desc;

    // Price chip on image — main number(s)
    if (item.formats && item.formats.length) {
      const nums = item.formats
        .map((f) => f.price.replace(/\s*TL\s*/i, "").trim())
        .join(" / ");
      modalPrice.textContent = `${nums} TL`;
    } else {
      modalPrice.textContent = item.price;
    }

    // Image with fallback — show fallback only if image fails
    const modalImageWrap = modalImage.parentElement;
    modalImageWrap.classList.remove("image-failed");
    modalImage.src = "";
    modalImage.style.display = "";
    modalImage.alt = item.name;
    modalImage.onerror = () => {
      modalImage.style.display = "none";
      modalImageWrap.classList.add("image-failed");
    };
    modalImage.src = item.image;

    modalImageFallback.innerHTML = `
      <span class="fb-name">${escapeHTML(item.name)}</span>
      <span class="fb-tag">Hera Waffle</span>`;

    // Build modal sections: format chips (if any) + ingredients
    let html = "";

    if (item.formats && item.formats.length) {
      const formatsHTML = item.formats
        .map(
          (f) => `
            <div class="format-chip">
              <span class="format-chip-name">${escapeHTML(f.name)}</span>
              <span class="format-chip-price">${escapeHTML(f.price)}</span>
            </div>`
        )
        .join("");
      html +=
        `<div class="modal-formats" style="width:100%;margin-bottom:1rem;">${formatsHTML}</div>`;
    }

    html += item.ingredients
      .map(
        (ing) => `
          <span class="ingredient-chip">
            <span class="ing-icon" aria-hidden="true">${ing.icon}</span>
            <span>${escapeHTML(ing.name)}</span>
          </span>`
      )
      .join("");

    modalIngredients.innerHTML = html;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Waffle kategorisi → kendi malzeme emojilerini yağdır 🧇
    if (item.category === "waffle" && item.ingredients && item.ingredients.length) {
      const emojis = item.ingredients.map((ing) => ing.icon).filter(Boolean);
      rainEmojis(emojis);
    }
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ---------- INIT ---------- */
  renderMenu("waffle");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
