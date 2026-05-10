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
      image: "https://images.pexels.com/photos/3724443/pexels-photo-3724443.jpeg?auto=compress&cs=tinysrgb&w=900",
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
      image: "https://images.pexels.com/photos/5419336/pexels-photo-5419336.jpeg?auto=compress&cs=tinysrgb&w=900",
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
      image: "https://images.pexels.com/photos/3892469/pexels-photo-3892469.jpeg?auto=compress&cs=tinysrgb&w=900",
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
      image: "https://images.pexels.com/photos/4686818/pexels-photo-4686818.jpeg?auto=compress&cs=tinysrgb&w=900",
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
      name: "Waffle + Türk Kahvesi",
      desc: "Bir kova waffle yanında Türk kahvesi. Tatlının yanına geleneksel bir dokunuş — kampanya fiyatıyla.",
      price: "220 TL",
      tags: ["Fırsat", "İkili"],
      emoji: "🎁",
      image: "https://images.pexels.com/photos/5555534/pexels-photo-5555534.jpeg?auto=compress&cs=tinysrgb&w=900",
      ingredients: [
        { icon: "🧇", name: "Bardak Waffle (1 adet)" },
        { icon: "☕", name: "Türk Kahvesi (1 adet)" }
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
      image: "https://images.pexels.com/photos/28919130/pexels-photo-28919130.jpeg?auto=compress&cs=tinysrgb&w=900",
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
