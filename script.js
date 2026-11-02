/* =====================================================
   DRESSMATE AI — CORE JAVASCRIPT ENGINE (EXPANDED COLLECTIONS)
   Includes:
   1. Multi-Look Category Database (Party, College, Streetwear, Ethnic, etc.)
   2. Smart Category & Keyword Search Engine
   3. AI Fashion Chat (Demo Mode + API Hook)
   4. Drop Your Outfit (File Validation, Preview & AI Analysis)
   5. Outfit Recommendations Generator
   6. Mix & Match Engine
   7. Saved Looks & LocalStorage
   ===================================================== */

const CONFIG = {
  USE_REAL_BACKEND: true,
  BACKEND_URL: "http://127.0.0.1:5000/generate-outfit",
  ANALYZE_URL: "http://127.0.0.1:5000/analyze",
  IMAGE_SEARCH_URL: "http://127.0.0.1:5000/search-images"
};

/* =====================================================
   EXPANDED OUTFIT DATABASE (Multiple Looks per Category)
   ===================================================== */
const outfitDatabase = [
  // ================= 1. PARTY WEAR COLLECTION =================
  {
    id: "party-1",
    title: "Classic Little Black Party Dress & Stilettos",
    category: "party",
    type: "Party & Night Out",
    colors: ["black", "gold"],
    clothing: ["dress", "party wear", "heels", "little black dress"],
    image: "https://images.unsplash.com/photo-1712144927876-50d4b1d310b3?auto=format&fit=crop&w=800&q=85",
    desc: "A timeless black cocktail dress styled with strappy stiletto heels, delicate gold statement hoops, and an evening clutch.",
    tags: ["party", "party wear", "black", "dress", "chic", "night out", "club"],
    photographer: "Unsplash Fashion",
    sourceUrl: "https://unsplash.com/photos/little-black-dress"
  },
  {
    id: "party-2",
    title: "Trendy Pink Metallic Sequin Party Fit",
    category: "party",
    type: "Party & Glam",
    colors: ["pink", "magenta", "shimmer"],
    clothing: ["top", "skirt", "party wear", "glam"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=85",
    desc: "High-energy vibrant party outfit featuring reflective metallics, statement silhouette, and nude platform heels.",
    tags: ["party", "party wear", "pink", "trendy", "night out", "glam", "club wear"],
    photographer: "Dom Hill",
    sourceUrl: "https://unsplash.com/photos/0W45St253w8"
  },
  {
    id: "party-3",
    title: "Emerald Satin Slip Dress & Block Heels",
    category: "party",
    type: "Party & Date Night",
    colors: ["green", "emerald", "gold"],
    clothing: ["dress", "slip dress", "party wear"],
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85",
    desc: "Luxe emerald green cowl-neck satin slip dress paired with delicate gold chains and comfortable metallic block heels.",
    tags: ["party", "party wear", "green", "satin", "date", "dress", "night out"],
    photographer: "Tamara Bellis",
    sourceUrl: "https://unsplash.com/photos/64YrpkigaAE"
  },
  {
    id: "party-4",
    title: "Baddie Corset Top & Faux-Leather Trousers",
    category: "party",
    type: "Party & Baddie Street",
    colors: ["black"],
    clothing: ["top", "corset", "leather pants", "party wear"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=85",
    desc: "Fitted structured corset bodice styled with high-waist black faux-leather pants, pointed ankle boots, and mini shoulder bag.",
    tags: ["party", "party wear", "black", "baddie", "corset", "night out", "club"],
    photographer: "Averie Woodard",
    sourceUrl: "https://unsplash.com/photos/4nulm-JUYFo"
  },
  {
    id: "party-5",
    title: "Deep Wine Red Velvet Cocktail Dress",
    category: "party",
    type: "Party & Evening",
    colors: ["maroon", "red", "wine"],
    clothing: ["dress", "cocktail dress", "party wear"],
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=85",
    desc: "Sophisticated wine-red cocktail ensemble paired with crystal teardrop earrings, soft Hollywood waves, and clutch.",
    tags: ["party", "party wear", "maroon", "red", "dress", "cocktail", "night out"],
    photographer: "Laura Chouette",
    sourceUrl: "https://unsplash.com/photos/bZ_VpM5hF80"
  },

  // ================= 2. COLLEGE WEAR COLLECTION =================
  {
    id: "college-1",
    title: "Maroon Knit Top with Classic Blue Denim",
    category: "college",
    type: "College & Casual Chic",
    colors: ["maroon", "burgundy", "blue"],
    clothing: ["top", "jeans", "denim", "sneakers"],
    image: "https://bsidesjeans.com/cdn/shop/files/W501-JANE-15852.jpg?v=1756072834",
    desc: "Rich maroon/red knit top styled effortlessly with classic high-waisted blue jeans, white retro sneakers, and minimal accessories.",
    tags: ["maroon top", "blue jeans", "maroon", "blue", "college", "college outfit", "casual", "denim"],
    photographer: "Unsplash Fashion",
    sourceUrl: "https://unsplash.com/photos/red-top-jeans"
  },
  {
    id: "college-2",
    title: "White Oversized Shirt & Vintage Blue Denim",
    category: "college",
    type: "College Minimal",
    colors: ["white", "blue"],
    clothing: ["shirt", "jeans", "tote bag", "sneakers"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
    desc: "Crisp white button-down shirt tucked into straight vintage blue denim, canvas tote bag, and campus sneakers.",
    tags: ["college", "college outfit", "white", "blue jeans", "oversized", "campus", "casual"],
    photographer: "Freestocks",
    sourceUrl: "https://unsplash.com/photos/VFzCoXxnb44"
  },
  {
    id: "college-3",
    title: "Baby Blue Knit Top with Tailored Black Trousers",
    category: "college",
    type: "Smart Casual & College",
    colors: ["baby blue", "blue", "black"],
    clothing: ["top", "pants", "trousers", "loafers"],
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=85",
    desc: "Pastel baby blue knit top paired with high-waist black pleated pants, minimal loafers, and a structured black bag.",
    tags: ["baby blue top", "black pants", "baby blue", "black", "trousers", "college", "college outfit", "minimal"],
    photographer: "Tamara Bellis",
    sourceUrl: "https://unsplash.com/photos/64YrpkigaAE"
  },
  {
    id: "college-4",
    title: "Graphic Boxy Tee with Relaxed Denim & Backpack",
    category: "college",
    type: "College Everyday",
    colors: ["grey", "blue", "black"],
    clothing: ["t-shirt", "jeans", "backpack"],
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=85",
    desc: "Everyday lecture-ready relaxed denim with boxy vintage tee, sporty sneakers, and durable waterproof laptop backpack.",
    tags: ["college", "college outfit", "casual", "jeans", "campus", "everyday"],
    photographer: "Averie Woodard",
    sourceUrl: "https://unsplash.com/photos/4nulm-JUYFo"
  },

  // ================= 3. STREETWEAR COLLECTION =================
  {
    id: "street-1",
    title: "Black Crop Top with Light Blue Baggy Jeans",
    category: "streetwear",
    type: "Streetwear & Baddie",
    colors: ["black", "blue"],
    clothing: ["top", "baggy jeans", "crop top", "jeans"],
    image: "https://cdn.shopify.com/s/files/1/0072/5467/1433/files/influencers-01.png?v=1629104079",
    desc: "Fitted ribbed black top paired with wide-leg relaxed baggy denim, platform sneakers, and layered silver chains.",
    tags: ["black top", "baggy jeans", "streetwear", "baddie", "black", "casual", "jeans"],
    photographer: "Averie Woodard",
    sourceUrl: "https://unsplash.com/photos/4nulm-JUYFo"
  },
  {
    id: "street-2",
    title: "Urban Utility Cargo Trousers & Fitted Ribbed Top",
    category: "streetwear",
    type: "Casual Streetwear",
    colors: ["black", "green", "olive"],
    clothing: ["cargo", "top", "sneakers"],
    image: "https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=800&q=85",
    desc: "Loose-fit military green and black utility cargo trousers, ribbed baby tee, bucket hat, and chunky skate sneakers.",
    tags: ["streetwear", "casual streetwear", "cargo", "black", "trendy", "sneakers"],
    photographer: "Tyler Nix",
    sourceUrl: "https://unsplash.com/photos/X2n03Z1tN8s"
  },
  {
    id: "street-3",
    title: "Oversized Neutral Hoodie & Baggy Trousers",
    category: "streetwear",
    type: "Chill Streetwear",
    colors: ["beige", "brown", "black"],
    clothing: ["hoodie", "pants", "sneakers"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85",
    desc: "Cozy fleece oversized brown hoodie with wide-leg utility trousers and retro skate sneakers.",
    tags: ["streetwear", "hoodie", "oversized", "casual", "baggy"],
    photographer: "Laura Chouette",
    sourceUrl: "https://unsplash.com/photos/bZ_VpM5hF80"
  },

  // ================= 4. TRADITIONAL & ETHNIC =================
  {
    id: "trad-1",
    title: "Festive Silk Saree with Statement Jhumkas",
    category: "traditional",
    type: "Wedding & Festive",
    colors: ["pink", "gold", "traditional"],
    clothing: ["saree", "ethnic", "jhumka"],
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
    desc: "Graceful festive saree draped to perfection, paired with handcrafted jhumkas, delicate bindi, and traditional embroidered sandals.",
    tags: ["saree", "traditional", "wedding", "festive", "ethnic", "jewellery"],
    photographer: "Dollar Gill",
    sourceUrl: "https://unsplash.com/photos/0iGqHj_k3c8"
  },
  {
    id: "trad-2",
    title: "Pastel Organza Saree & Sleeveless Blouse",
    category: "traditional",
    type: "Festive Elegance",
    colors: ["beige", "cream", "pastel"],
    clothing: ["saree", "ethnic"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85",
    desc: "Lightweight pastel organza saree with delicate floral embroidery, pearl choker, and minimal ethnic clutch.",
    tags: ["saree", "traditional", "ethnic", "wedding", "pastel"],
    photographer: "Laura Chouette",
    sourceUrl: "https://unsplash.com/photos/bZ_VpM5hF80"
  },
  {
  id: "trad-3",
  title: "Lavender Kurti with White Straight Pants",
  category: "traditional",
  type: "Modern Ethnic & College",
  colors: ["lavender", "purple", "white"],
  clothing: ["kurti", "straight pants", "pants", "ethnic"],
  image: "https://assets.myntassets.com/h_200%2Cw_200%2Cc_fill%2Cg_auto/h_1440%2Cq_75%2Cw_1080/v1/assets/images/2024/SEPTEMBER/15/jcmB5RuN_e052a4ddcdab42afb27aaa92b49fc373.jpg",
  desc: "Elegant lavender kurti paired with crisp white straight pants and simple ethnic footwear for a fresh everyday look.",
  tags: ["lavender kurti", "purple kurti", "white pants", "straight pants", "ethnic", "traditional", "college"],
  photographer: "Unsplash",
  sourceUrl: "https://unsplash.com/"
},

  // ================= 5. CASUAL & EVERYDAY =================
  {
    id: "cas-1",
    title: "Effortless White Cotton Tee & High-Waist Denim",
    category: "casual",
    type: "Everyday Casual",
    colors: ["white", "blue"],
    clothing: ["top", "jeans"],
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
    desc: "Clean white fitted cotton t-shirt paired with classic vintage blue jeans, sunglasses, and leather slides.",
    tags: ["casual", "white", "blue jeans", "everyday", "minimal"],
    photographer: "Freestocks",
    sourceUrl: "https://unsplash.com/photos/VFzCoXxnb44"
  },
  {
    id: "cas-2",
    title: "Floral Sundress with Flat Strap Sandals",
    category: "casual",
    type: "Casual Summer",
    colors: ["pink", "pastel", "floral"],
    clothing: ["dress", "sundress"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=85",
    desc: "Breathable airy floral sundress with woven straw bag, flat sandals, and oversized sunglasses for daytime outings.",
    tags: ["casual", "summer", "dress", "pink", "vacation"],
    photographer: "Laura Chouette",
    sourceUrl: "https://unsplash.com/photos/bZ_VpM5hF80"
  },

  // ================= 6. OFFICE & FORMAL =================
  {
    id: "off-1",
    title: "Beige Tailored Blazer & Neutral Pleated Trousers",
    category: "office",
    type: "Office & Formal",
    colors: ["beige", "cream", "neutral"],
    clothing: ["blazer", "trousers", "formal"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=85",
    desc: "Minimalist structured beige blazer over cream top with tailored trousers and loafers for presentations and office.",
    tags: ["office", "formal", "beige", "classy", "minimal", "blazer"],
    photographer: "Brooke Cagle",
    sourceUrl: "https://unsplash.com/photos/uhz_36-82tE"
  },
  {
  id: "cas-3",
  title: "White Oversized Shirt with Black Wide-Leg Jeans",
  category: "casual",
  type: "Minimal Casual & Street Style",
  colors: ["white", "black"],
  clothing: ["oversized shirt", "shirt", "jeans", "wide-leg jeans", "sneakers"],
  image: "https://likemagazine.com.br/midias/2024/03/Inspiracao-de-calca-jeans-para-2024.jpg",
  desc: "Relaxed white button-down shirt tucked into black wide-leg jeans, styled with sneakers and a black handbag.",
  tags: ["white shirt", "oversized shirt", "black jeans", "wide-leg jeans", "casual", "street style"],
  photographer: "Like Magazine",
  sourceUrl: "https://likemagazine.com.br/moda/calca-jeans-preta-como-usar-a-peca-no-inverno-de-2024-em-9-looks/"
},
{
  id: "cas-4",
  title: "White Top with Beige Tailored Trousers",
  category: "casual",
  type: "Minimal Chic",
  colors: ["white", "beige"],
  clothing: ["top", "trousers", "pants"],
  image: "https://img.tatacliq.com/images/i20/437Wx649H/MP000000023903273_437Wx649H_202409300242444.jpeg",
  desc: "A clean white top paired with beige tailored trousers for a polished everyday outfit.",
  tags: ["white top", "beige trousers", "beige pants", "casual", "minimal", "chic"],
  photographer: "Unsplash",
  sourceUrl: "https://unsplash.com/"
},
{
  id: "cas-5",
  title: "Black Fitted Top with White Wide-Leg Jeans",
  category: "casual",
  type: "Modern Casual",
  colors: ["black", "white"],
  clothing: ["top", "jeans", "wide-leg jeans"],
  image: "https://cdn.hudsonbootcutjean.com/cdn/2374/2025/11/19/main-HUDSON-Womens-Jodie-High-Rise-Loose-Fit-Wide-Leg-JeanClassic-White-1074476-9523.jpg",
  desc: "A fitted black top styled with white wide-leg denim for a simple modern casual look.",
  tags: ["black top", "white jeans", "wide-leg jeans", "casual", "minimal"],
  photographer: "Unsplash",
  sourceUrl: "https://unsplash.com/"
},
{
  id: "cas-6",
  title: "White Top with Classic Blue Denim Jeans",
  category: "casual",
  type: "Everyday Denim",
  colors: ["white", "blue"],
  clothing: ["crop top", "top", "fitted top", "oversized top", "white top",],
  image: "https://images.pexels.com/photos/8414003/pexels-photo-8414003.jpeg?auto=compress&dpr=1&h=750&w=1260",
  desc: "A simple white top paired with classic blue denim jeans for a relaxed everyday outfit.",
  tags: ["white top", "blue jeans", "denim", "casual", "everyday"],
  photographer: "Unsplash",
  sourceUrl: "https://unsplash.com/"
},
];

/* =====================================================
   INTELLECTUAL CATEGORY & RELEVANCE SEARCH ENGINE
   ===================================================== */
const CATEGORY_SYNONYMS = {
  party: ["party", "party wear", "partywear", "club", "night out", "evening", "cocktail", "pub", "event", "glam"],
  college: ["college", "college wear", "campus", "university", "daily", "lecture", "student"],
  streetwear: ["streetwear", "street", "baggy", "cargo", "hoodie", "oversized", "baddie", "sneakers"],
  traditional: ["traditional", "saree", "ethnic", "wedding", "festive", "kurti", "lehenga", "desi"],
  casual: ["casual", "daily", "simple", "everyday", "summer", "relaxed", "denim"],
  office: ["office", "formal", "work", "presentation", "blazer", "internship"]
};
function computeSearchRelevance(look, rawQuery) {
  const query = rawQuery.toLowerCase().trim();
  if (!query) return 1;

  const title = (look.title || "").toLowerCase();
  const desc = (look.desc || "").toLowerCase();
  const type = (look.type || "").toLowerCase();
  const colors = (look.colors || []).join(" ").toLowerCase();
  const clothing = (look.clothing || []).join(" ").toLowerCase();
  const tags = (look.tags || []).join(" ").toLowerCase();
  const category = (look.category || "").toLowerCase();

  const fullText = `${title} ${desc} ${type} ${colors} ${clothing} ${tags} ${category}`;

  const normalize = text => text
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const text = normalize(fullText);
  const q = normalize(query);
  const colorGroups = [
  ["baby blue", "light blue", "sky blue"],
  ["dark blue", "navy"],
  ["blue"],
  ["maroon", "burgundy", "wine"],
  ["black"],
  ["white"],
  ["pink"],
  ["green", "emerald"],
  ["beige"],
  ["gold"],
  ["red"],
  ["brown"],
  ["purple"],
  ["yellow"]
];
 
  const requestedColors = colorGroups.filter(group =>
    group.some(color => new RegExp(`\\b${color}\\b`).test(q))
  );

  for (const group of requestedColors) {
    if (!group.some(color =>
      new RegExp(`\\b${color}\\b`).test(normalize(`${colors} ${title} ${tags} ${desc}`))
    )) return 0;
  }

  const clothingTerms = [
    "crop top", "fitted top", "oversized top", "white top",
    "black top", "maroon top", "top", "shirt",
    "baggy jeans", "wide leg jeans", "blue jeans", "jeans",
    "trousers", "pants", "skirt", "dress", "saree",
    "kurti", "hoodie", "jacket", "shorts", "sneakers"
  ];

  const requestedClothes = clothingTerms.filter(term =>
    new RegExp(`\\b${term}\\b`).test(q)
  );

  for (const item of requestedClothes) {
    if (!new RegExp(`\\b${item}\\b`).test(text)) {
      if (item === "top" && /\b(top|shirt|crop top)\b/.test(text)) continue;
      return 0;
    }
  }

  const isParty = /party|club|night out/.test(q);
  const isTraditional = /saree|traditional|wedding|ethnic/.test(q);
  const isCollege = /college|campus/.test(q);

  if (isParty && category !== "party") return 0;
  if (isTraditional && !["traditional", "wedding"].includes(category)) return 0;
  if (isCollege && category !== "college") return 0;

  let score = 100;

  if (title.includes(q)) score += 600;
  if (tags.includes(q)) score += 500;

  const tokens = q.split(/\s+/).filter(word =>
    word.length > 2 &&
    !["with", "and", "the", "for", "outfit", "wear", "clothes"].includes(word)
  );

  tokens.forEach(token => {
    if (text.includes(token)) score += 150;
  });

  return score;
}
function quick(query) {
  const input = document.getElementById("searchInput");

  if (!input) return;

  input.value = query;
  searchLooks();
}
function searchLooks(event) {
  if (event) event.preventDefault();

  const query = document.getElementById("searchInput").value.trim();
  const meta = document.getElementById("searchMeta");

  if (!query) {
    renderLooks(outfitDatabase);
    meta.innerHTML = `Showing all ${outfitDatabase.length} curated fashion looks.`;
    return;
  }

  const matches = outfitDatabase
    .map(look => ({
      look,
      score: computeSearchRelevance(look, query)
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.look);

  renderLooks(matches);

  meta.innerHTML = matches.length
    ? `Found ${matches.length} matching outfit ideas for "${escapeHTML(query)}".`
    : `No exact matches found. Try "college outfit", "party wear", or "saree".`;
}
function createLookCard(look) {
  const saved = isLookSaved(look.id);

  return `
    <article class="look card" id="card-${escapeHTML(look.id)}">
      <div class="look-img">
        <img
          src="${escapeHTML(look.image)}"
          alt="${escapeHTML(look.title)}"
          loading="lazy"
        >
      </div>

      <div class="look-body">
        <h3>${escapeHTML(look.title)}</h3>
        <p>${escapeHTML(look.desc)}</p>

        <div class="card-footer">
          <a
            class="source-link"
            href="${escapeHTML(look.sourceUrl)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            📷 ${escapeHTML(look.photographer)}
          </a>

          <button
            class="save ${saved ? "saved-active" : ""}"
            type="button"
            onclick="toggleSaveLook('${escapeHTML(look.id)}')"
          >
            ${saved ? "♥ Saved" : "♡ Save Look"}
          </button>
        </div>
      </div>
    </article>
  `;
}
function renderLooks(list, containerId = "results") {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!list.length) {
    container.innerHTML = `
      <div class="empty-card">
        <h3>No matching outfits found</h3>
        <p style="color:var(--mute); margin:8px 0 16px;">
       Try searching for popular combinations:
          <strong>"party wear"</strong>, <strong>"college outfit"</strong>, <strong>"maroon top with blue jeans"</strong>, or <strong>"saree"</strong>.
        </p>
        <button class="btn alt" type="button" onclick="resetSearch()">
          View All Outfits
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(createLookCard).join("");
}
function resetSearch() {
  const input = document.getElementById("searchInput");
  const meta = document.getElementById("searchMeta");

  if (input) input.value = "";

  renderLooks(outfitDatabase);

  if (meta) {
    meta.textContent = `Showing all ${outfitDatabase.length} curated fashion looks.`;
  }
}
/* =====================================================
   AI FASHION CHAT
   ===================================================== */
const demoChatResponses = [
  {
    keywords: ["party", "night out", "club"],
    reply: `✨ <strong>Party Wear Styling Blueprint:</strong><br><br>
    • <strong>Classic Cocktail:</strong> Little black dress paired with strappy metallic heels and gold statement hoops.<br>
    • <strong>Baddie / Club:</strong> Structured corset bodice, high-waist faux-leather trousers, and pointed ankle boots.<br>
    • <strong>Glam Chic:</strong> Emerald green satin cowl slip dress or deep wine velvet with an evening clutch.<br>
    • <strong>Pro Tip:</strong> Pick 1 focal point (a bold lip, statement back, or metallic shine) to look effortlessly expensive!`
  },
  {
    keywords: ["maroon", "blue jeans", "maroon top"],
    reply: `🍷 <strong>Maroon Top with Blue Jeans Styling Advice:</strong><br><br>
    • <strong>Jeans:</strong> Pair with light-wash or mid-wash blue wide-leg or straight-fit jeans for the best contrast.<br>
    • <strong>Footwear:</strong> Crisp white sneakers for college, or nude/tan block heel mules for date night.<br>
    • <strong>Accessories:</strong> Warm gold hoops, layered pendant necklace, and a tan leather shoulder bag.<br>
    • <strong>Layering tip:</strong> Add a cropped beige cardigan or light denim jacket if it's breezy!`
  },
  {
    keywords: ["black top", "baggy jeans"],
    reply: `🖤 <strong>Black Top with Baggy Jeans Styling Advice:</strong><br><br>
    • <strong>Silhouette rule:</strong> Since the bottom is baggy, wear a fitted or cropped black top (ribbed baby tee or halter) to balance proportions.<br>
    • <strong>Footwear:</strong> Chunky platform sneakers (white or black-and-white) or chunky combat boots.<br>
    • <strong>Accessories:</strong> Silver chunky chain, rectangular 90s sunglasses, and a black nylon shoulder bag.<br>
    • <strong>Vibe:</strong> Effortless streetwear / baddie aesthetic.`
  },
  {
    keywords: ["baby blue", "black pants"],
    reply: `🩵 <strong>Baby Blue Top with Black Pants Styling Advice:</strong><br><br>
    • <strong>Contrast:</strong> The soft pastel blue softens dark black pants beautifully.<br>
    • <strong>Bottoms:</strong> High-waisted black wide-leg trousers or black cargo pants.<br>
    • <strong>Shoes:</strong> Clean white leather sneakers or sleek pointed black loafers.<br>
    • <strong>Accessories:</strong> Dainty silver jewellery and a structured cream or black baguette bag.`
  },
  {
    keywords: ["college", "campus", "daily outfit"],
    reply: `🎒 <strong>College Outfit Blueprint:</strong><br><br>
    • <strong>Top:</strong> Oversized boyfriend shirt (unbuttoned over a white tank) or a graphic boxy tee.<br>
    • <strong>Bottom:</strong> Comfy relaxed-fit denim or cargo trousers with functional pockets.<br>
    • <strong>Shoes:</strong> Comfortable all-day sneakers (white sneakers, converse, or trainers).<br>
    • <strong>Bags:</strong> Canvas tote bag or sleek waterproof backpack with a stainless water bottle sleeve.`
  },
  {
    keywords: ["white", "colour", "color"],
    reply: `🤍 <strong>Colours that pair stunningly with White:</strong><br><br>
    • <strong>Earthy & Rich:</strong> Mocha brown, warm camel, maroon, and olive green create an expensive look.<br>
    • <strong>Classic & High-Contrast:</strong> Jet black or navy blue for sharp contrast.<br>
    • <strong>Pastel & Soft:</strong> Baby blue, lilac, sage green, and peach for romantic daytime vibes.<br>
    • <strong>Denim:</strong> Classic medium vintage blue denim is white's best partner!`
  },
  {
    keywords: ["wedding", "saree", "ethnic", "festive"],
    reply: `🪷 <strong>Festive & Traditional Styling Guide:</strong><br><br>
    • <strong>Outfits:</strong> Organza saree in pastel hues, jewel-toned silk, or an embroidered anarkali kurti set.<br>
    • <strong>Jewellery:</strong> Kundan or oxidized silver jhumkas with matching bangles.<br>
    • <strong>Footwear:</strong> Embroidered juttis or metallic block heels.`
  }
];

function suggest(text) {
  const input = document.getElementById("chatInput");
  input.value = text;
  sendChat(new Event("submit"));
}

async function sendChat(event) {
  event.preventDefault();
  const input = document.getElementById("chatInput");
  const log = document.getElementById("chatLog");
  const message = input.value.trim();

  if (!message) return;

  const userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.innerHTML = escapeHTML(message);
  log.appendChild(userDiv);
  input.value = "";
  log.scrollTop = log.scrollHeight;

  const typingDiv = document.createElement("div");
  typingDiv.className = "message ai";
  typingDiv.innerHTML = `<span class="spinner" style="vertical-align:middle; width:14px; height:14px; margin-right:6px;"></span> DressMate AI is styling your answer...`;
  log.appendChild(typingDiv);
  log.scrollTop = log.scrollHeight;

  setTimeout(async () => {
    let replyContent = getIntelligentDemoReply(message);
    typingDiv.innerHTML = `
      <div class="msg-sender">DressMate AI <span class="badge-demo">Demo AI Response</span></div>
      <div>${replyContent}</div>
    `;
    log.scrollTop = log.scrollHeight;
  }, 400);
}

function getIntelligentDemoReply(query) {
  const q = query.toLowerCase();
  for (const item of demoChatResponses) {
    if (item.keywords.some(kw => q.includes(kw))) {
      return item.reply;
    }
  }

  return `✨ <strong>Style Recommendation for: "${escapeHTML(query)}"</strong><br><br>
  • <strong>Balance the silhouette:</strong> If you're wearing an oversized piece on top, opt for structured or tapered bottoms; if bottoms are loose, pick a fitted top.<br>
  • <strong>Rule of Three:</strong> Stick to at most 3 core colours in one outfit to keep it looking polished and deliberate.<br>
  • <strong>Accessories:</strong> Complete the look with clean sneakers or loafers and delicate layered jewellery.<br>
  <small style="color:var(--mute); display:block; margin-top:8px;">(Tip: Try asking specific questions like "party outfit ideas", "maroon top with blue jeans", or "college outfit ideas"!)</small>`;
}

/* =====================================================
   DROP YOUR OUTFIT (UPLOAD & ANALYSIS)
   ===================================================== */
let currentUploadedFile = null;
const fileInput = document.getElementById("outfitFileInput");
const dropZone = document.getElementById("dropZone");

fileInput?.addEventListener("change", function () {
  if (this.files && this.files[0]) handleSelectedFile(this.files[0]);
});

if (dropZone) {
  ["dragenter", "dragover"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.add("dragover");
    });
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
    });
  });

  dropZone.addEventListener("drop", (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSelectedFile(e.dataTransfer.files[0]);
    }
  });
}

function handleSelectedFile(file) {
  const errorBox = document.getElementById("uploadError");
  errorBox.style.display = "none";
  errorBox.textContent = "";

  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!validTypes.includes(file.type)) {
    showUploadError("⚠️ Unsupported file format. Please upload a JPG, PNG, or WEBP photo.");
    return;
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    showUploadError("⚠️ File size too large. Please select an image under 5 MB.");
    return;
  }

  currentUploadedFile = file;

  const previewImg = document.getElementById("previewImage");
  const placeholder = document.getElementById("uploadPlaceholder");
  const previewWrapper = document.getElementById("previewWrapper");
  const fileInfo = document.getElementById("fileInfo");

  previewImg.src = URL.createObjectURL(file);
  placeholder.style.display = "none";
  previewWrapper.style.display = "flex";

  const sizeKb = Math.round(file.size / 1024);
  fileInfo.innerHTML = `<strong>${escapeHTML(file.name)}</strong>${sizeKb} KB · Ready for AI styling analysis`;
  document.getElementById("analysisResult").innerHTML = "";
}

function showUploadError(msg) {
  const errorBox = document.getElementById("uploadError");
  errorBox.textContent = msg;
  errorBox.style.display = "block";
}

function resetUpload() {
  currentUploadedFile = null;
  fileInput.value = "";
  document.getElementById("uploadPlaceholder").style.display = "block";
  document.getElementById("previewWrapper").style.display = "none";
  document.getElementById("analysisResult").innerHTML = "";
  document.getElementById("uploadError").style.display = "none";
}

async function analyzeOutfit() {
  if (!currentUploadedFile) {
    showUploadError("Please choose an outfit image first.");
    return;
  }

  const analysisContainer = document.getElementById("analysisResult");
  const analyseBtn = document.getElementById("analyseBtn");

  analyseBtn.disabled = true;
  analyseBtn.innerHTML = "✦ Analysing Outfit...";

  analysisContainer.innerHTML = `
    <div class="analysis-card" style="text-align:center;padding:30px;">
      <span class="spinner"></span>
      <h3>AI Fashion Stylist is analysing your look...</h3>
      <p>Please wait.</p>
    </div>
  `;

  try {
    const formData = new FormData();
    formData.append("outfit", currentUploadedFile);

    const response = await fetch(CONFIG.ANALYZE_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("ANALYSIS RESPONSE:", data);
    if (!response.ok || !data.success) {
      throw new Error(data.error || "Analysis failed.");
    }

 const sections = data.analysis
  .split(/\n(?=\s*\d+[\.\)]\s*)/)
  .map(item => item.replace(/^\s*\d+[\.\)]\s*/, "").trim())
  .filter(Boolean)
  .slice(0, 4);

const titles = [
  "Style & Colours",
  "Suitable Occasions",
  "Footwear & Accessories",
  "Styling Tip"
];

analysisContainer.innerHTML = `
  <div class="analysis-card">
    <h3>✦ AI Outfit Analysis</h3>
    <div class="analysis-grid">
      ${sections.map((section, index) => `
        <div class="analysis-item">
          <span>0${index + 1}</span>
          <h4>${titles[index]}</h4>
          <p>${escapeHTML(section)}</p>
        </div>
      `).join("")}
    </div>
  </div>
`;
  } catch (error) {
    analysisContainer.innerHTML = `
      <div class="analysis-card">
        <h3>✦ AI Outfit Analysis</h3>
        <p>AI service is temporarily unavailable.</p>
        <p>Your outfit image was uploaded successfully.</p>
        <p>Please try again shortly.</p>
      </div>
    `;
  } finally {
    analyseBtn.disabled = false;
    analyseBtn.innerHTML = "✦ Re-Analyse Outfit";
  }
}

function renderAnalysisCard(realBackendText) {
  const container = document.getElementById("analysisResult");
  container.innerHTML = `
    <div class="analysis-card">
      <div class="analysis-header">
        <div>
          <div class="eyebrow">✦ OUTFIT EVALUATION COMPLETE</div>
          <h3>Style Analysis &amp; Recommendations</h3>
        </div>
        <span class="analysis-badge">⚡ Demo AI Analysis Result</span>
      </div>

      <div class="analysis-grid">
        <div class="analysis-section">
          <h4>👗 1. Outfit Feedback &amp; Vibe</h4>
          <p>
            • <strong>Identified Style:</strong> Relaxed Campus / Modern Casual Chic.<br>
            • <strong>Silhouette Balance:</strong> The proportions offer high comfort with an approachable, youthful daily appeal. Good vertical alignment.
          </p>
        </div>

        <div class="analysis-section">
          <h4>🎨 2. Colour Harmony &amp; Pairing</h4>
          <p>
            • <strong>Tonal Harmony:</strong> Neutral &amp; denim foundation detected.<br>
            • <strong>Complementary Accents:</strong> Introduce warm camel, deep maroon, or olive accents to elevate the visual depth without clashing.
          </p>
        </div>

        <div class="analysis-section">
          <h4>✨ 3. Styling Improvements</h4>
          <p>
            • <strong>Waistline definition:</strong> Try a subtle French tuck (front tuck) to lengthen your leg silhouette.<br>
            • <strong>Layering upgrade:</strong> Add an unbuttoned lightweight linen overshirt or a cropped denim jacket for extra texture.
          </p>
        </div>

        <div class="analysis-section">
          <h4>👟 4. Accessories &amp; Footwear</h4>
          <p>
            • <strong>Footwear:</strong> Clean white low-top sneakers or chunky neutral loafers.<br>
            • <strong>Bag:</strong> Structured shoulder baguette bag or clean canvas tote.<br>
            • <strong>Jewellery:</strong> Minimal stacked gold/silver rings and 20mm hoop earrings.
          </p>
        </div>
      </div>

      <div class="analysis-backend-note">
        <strong>College Project Note:</strong> This evaluation demonstrates the planned computer-vision feedback format. When connected to a real Python/Gemini backend (via <code>CONFIG.USE_REAL_BACKEND</code>), actual live multi-modal image model outputs will render here automatically.
      </div>
    </div>
  `;
}

/* =====================================================
   RECOMMENDATIONS (GENERATOR)
   ===================================================== */
const recommendationDatabase = {
  college: {
    title: "Campus Smart Streetwear",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
    top: "Fitted ribbed crop top or oversized vintage tee",
    bottom: "Light-wash wide-leg denim jeans",
    shoes: "White retro court sneakers",
    accessories: "Canvas everyday tote, dainty chain necklace, smartwatch",
    tip: "Keep it easy to walk in all day while looking intentional and stylish."
  },
  casual: {
    title: "Effortless Everyday Minimal",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85",
    top: "Crisp neutral button-down shirt (relaxed fit)",
    bottom: "Straight-fit trousers or classic blue denim",
    shoes: "Flat slides or minimalist white sneakers",
    accessories: "Leather crossbody bag and oval sunglasses",
    tip: "Monochrome tones make casual clothing instantly look more high-end."
  },
  party: {
    title: "Night-Out Chic Statement",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=85",
    top: "Sleek cowl-neck satin cami or fitted black bodice",
    bottom: "High-waist faux-leather pants or pleated slip skirt",
    shoes: "Strappy block heels or pointed ankle boots",
    accessories: "Rhinestone mini clutch, statement drop earrings, bold lip",
    tip: "A single metallic or satin sheen catches evening lighting beautifully."
  },
  wedding: {
    title: "Festive Elegance & Traditional Glow",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85",
    top: "Handcrafted embroidered blouse",
    bottom: "Flowing silk/organza saree or embellished lehenga",
    shoes: "Embroidered juttis or metallic wedge sandals",
    accessories: "Kundan jhumkas, glass bangles, hair gajra, and potli pouch",
    tip: "Balance heavy jewellery with lightweight flowing fabrics for easy movement."
  },
  office: {
    title: "Polished Professional Silhouette",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85",
    top: "Tailored collared shirt in cream or sky blue",
    bottom: "Pleated high-rise cigarette trousers",
    shoes: "Pointed-toe flat mules or block heels",
    accessories: "Structured laptop briefcase, slim leather belt, minimalist watch",
    tip: "Structured shoulder seams give an instantly authoritative, sharp presence."
  }
};


async function generateRecommendations(event) {
  event.preventDefault();

  const resultContainer = document.getElementById("generatedResult");

  const occasion = document.getElementById("genOccasion").value;
  const colour = document.getElementById("genColour").value;
  const clothingType = document.getElementById("genClothingType").value;
  const style = document.getElementById("genStyle").value;
  const budget = document.getElementById("genBudget").value;

  resultContainer.innerHTML = `
    <div class="empty-state-card">
      <h3>✨ Creating your outfit...</h3>
      <p>Gemini is styling your look and finding matching photos.</p>
    </div>
  `;

  try {
    const response = await fetch("http://127.0.0.1:5000/generate-outfit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        occasion,
        colour,
        clothing_type: clothingType,
        style,
        budget
      })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Could not generate outfit");
    }

    const outfit = data.outfit;
    const images = data.images || [];

    const imageCards = images.length
      ? images.map((item, index) => `
          <div class="analysis-item">
            <img
            src="${item.image}"
              alt="${escapeHTML(item.tags || "Matching outfit")}"
              style="width:100%;height:220px;object-fit:cover;border-radius:12px;"
            >
            <p>Matching photo ${index + 1}</p>
            <a href="${item.source}" target="_blank" rel="noopener">
              View photo source
            </a>
          </div>
        `).join("")
      : `<p>No matching photos found. Try another selection.</p>`;

    resultContainer.innerHTML = `
      <div class="generated-look">
        <div class="generated-details">
          <div class="eyebrow">✦ GEMINI AI LOOKBOOK</div>
          <h3>${escapeHTML(outfit.title)}</h3>

          <p><strong>Occasion:</strong> ${escapeHTML(occasion)}</p>
          <p><strong>Colour:</strong> ${escapeHTML(colour)}</p>
          <p><strong>Clothing Type:</strong> ${escapeHTML(clothingType)}</p>
          <p><strong>Style:</strong> ${escapeHTML(style)}</p>

          <div class="generated-item">
            <strong>👚 Top:</strong> ${escapeHTML(outfit.top)}
          </div>
          <div class="generated-item">
            <strong>👖 Bottom:</strong> ${escapeHTML(outfit.bottom)}
          </div>
          <div class="generated-item">
            <strong>👟 Footwear:</strong> ${escapeHTML(outfit.shoes)}
          </div>
          <div class="generated-item">
            <strong>✨ Accessories:</strong> ${escapeHTML(outfit.accessories)}
          </div>
          <div class="generated-item">
            <strong>💡 Stylist Tip:</strong> ${escapeHTML(outfit.tip)}
          </div>
        </div>

                <div class="generated-images">
          <h3>Matching Outfit Photos</h3>
          <div class="analysis-grid">
            ${imageCards}
          </div>
        </div>
      </div>
    `;
  }catch (error) {
  console.error("OUTFIT GENERATION ERROR:", error);

  const query = `${occasion} ${colour} ${clothingType} ${style}`;

  const matches = outfitDatabase
    .map(look => ({
      look,
      score: computeSearchRelevance(look, query)
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.look);

  if (matches.length > 0) {
    resultContainer.innerHTML = matches.map(look => `
      <div class="generated-look">
        <h3>${escapeHTML(look.title)}</h3>
        <img
          src="${escapeHTML(look.image)}"
          alt="${escapeHTML(look.title)}"
          style="width:100%;max-width:400px;border-radius:12px;"
        >
        <p>${escapeHTML(look.desc)}</p>
      </div>
    `).join("");
    return;
  }

  resultContainer.innerHTML = `
    <div class="generated-look">
      <h3>Unable to generate outfit</h3>
      <p>Please try another selection.</p>
    </div>
  `;
}
}
  

/* =====================================================
   MIX & MATCH SYSTEM
   ===================================================== */
const mixCombinations = {
  "maroon top": {
    heading: "Styling a Maroon Top",
    look1: { title: "Campus Casual", desc: "Wide-leg blue denim, white platform sneakers, and a tan shoulder bag." },
    look2: { title: "Chic Evening", desc: "Black faux-leather skirt or tailored black trousers, gold hoops, and nude block heels." },
    look3: { title: "Work & Presentation", desc: "Beige high-waist trousers, structured tote bag, and pointed loafers." }
  },
  "black cargo pants": {
    heading: "Styling Black Cargo Pants",
    look1: { title: "Baddie Streetwear", desc: "Fitted baby blue or white cropped baby tee, chunky sneakers, and silver chains." },
    look2: { title: "Minimal Chill", desc: "Oversized grey hoodie, baseball cap, and skate trainers." },
    look3: { title: "Going Out", desc: "Black lace bodysuit, chunky lug-sole boots, and an edgy baguette bag." }
  },
  "blue baggy jeans": {
    heading: "Styling Blue Baggy Jeans",
    look1: { title: "French Minimal", desc: "Fitted white ribbed tank top, brown thin leather belt, and vintage loafers." },
    look2: { title: "Street Cool", desc: "Boxy graphic tee tucked in front, retro sneakers, and canvas tote." },
    look3: { title: "Smart Casual", desc: "Tailored blazer over a black crop top with pointed heels." }
  },
  "baby blue top": {
    heading: "Styling a Baby Blue Top",
    look1: { title: "Sharp Contrast", desc: "High-waist black pleated trousers, silver delicate rings, and white sneakers." },
    look2: { title: "Soft Pastel", desc: "Cream or beige linen wide-leg pants with brown woven bag." },
    look3: { title: "Double Denim", desc: "White denim skirt with comfortable tan slides." }
  },
  "white oversized shirt": {
    heading: "Styling a White Oversized Shirt",
    look1: { title: "Unbuttoned Layer", desc: "Worn open over a black fitted inner with blue straight jeans and sneakers." },
    look2: { title: "Half-Tuck Chic", desc: "Front half-tucked into black tailored pants with a delicate wristwatch." },
    look3: { title: "Beach / Summer", desc: "Rolled up sleeves over bike shorts or linen shorts with flat sandals." }
  },
  "beige saree": {
    heading: "Styling a Beige Saree",
    look1: { title: "Jewel Contrast", desc: "Pair with an emerald green or deep maroon velvet blouse and gold jhumkas." },
    look2: { title: "Monochrome Modern", desc: "Pair with a tone-on-tone ivory sleeveless blouse and delicate pearl studs." },
    look3: { title: "Boho Fusion", desc: "Oxidized silver tribal jewellery, black bindi, and open loose beach waves." }
  }
};

function mix(item) {
  const result = document.getElementById("mixResult");
  const combo = mixCombinations[item];
  if (!combo) return;

  result.innerHTML = `
    <div class="mix-card">
      <div class="eyebrow">✦ 1 PIECE · 3 DISTINCT VIBES</div>
      <h3>${escapeHTML(combo.heading)}</h3>
      <p style="color:var(--mute)">Discover 3 versatile ways to rotate this piece throughout the week:</p>
      <div class="mix-card-grid">
        <div class="mix-pill">
          <strong>Look 1 · ${escapeHTML(combo.look1.title)}</strong>
          <span>${escapeHTML(combo.look1.desc)}</span>
        </div>
        <div class="mix-pill">
          <strong>Look 2 · ${escapeHTML(combo.look2.title)}</strong>
          <span>${escapeHTML(combo.look2.desc)}</span>
        </div>
        <div class="mix-pill">
          <strong>Look 3 · ${escapeHTML(combo.look3.title)}</strong>
          <span>${escapeHTML(combo.look3.desc)}</span>
        </div>
      </div>
    </div>
  `;
}

/* =====================================================
   SAVED LOOKS
   ===================================================== */
function getSavedLookIds() {
  try {
    return JSON.parse(localStorage.getItem("dressmate_saved_looks") || "[]");
  } catch (e) {
    return [];
  }
}

function isLookSaved(lookId) {
  return getSavedLookIds().includes(lookId);
}

function toggleSaveLook(lookId) {
  let saved = getSavedLookIds();
  if (saved.includes(lookId)) {
    saved = saved.filter(id => id !== lookId);
  } else {
    saved.push(lookId);
  }
  localStorage.setItem("dressmate_saved_looks", JSON.stringify(saved));
  updateSavedBadge();
  renderSavedSection();

  const cardBtn = document.querySelector(`#card-${lookId} .save`);
  if (cardBtn) {
    const active = saved.includes(lookId);
    cardBtn.className = `save ${active ? 'saved-active' : ''}`;
    cardBtn.textContent = active ? '♥ Saved' : '♡ Save Look';
  }
}

function updateSavedBadge() {
  const count = getSavedLookIds().length;
  const badge = document.getElementById("savedCount");
  if (badge) badge.textContent = count;
}

function renderSavedSection() {
  const container = document.getElementById("savedGrid");
  if (!container) return;

  const savedIds = getSavedLookIds();
  const savedLooks = outfitDatabase.filter(l => savedIds.includes(l.id));

  if (!savedLooks.length) {
    container.innerHTML = `
      <div class="empty-card">
        <h3>No saved looks yet</h3>
        <p style="color:var(--mute); margin:8px 0 16px;">
          Click the "♡ Save Look" button on any outfit in the Search or Trending section to build your personal wishlist!
        </p>
        <button class="btn" type="button" onclick="go('explore')">
          Explore Outfits
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = savedLooks.map(createLookCard).join("");
}

function renderTrendingSection() {
  renderLooks(outfitDatabase.slice(0, 4), "trendingGrid");
}

function go(id) {
  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("burger")?.addEventListener("click", () => {
  document.getElementById("links")?.classList.toggle("show");
});

document.querySelectorAll(".links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("links")?.classList.remove("show");
  });
});

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHTML(str) {
  if (!str) return "";
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  renderLooks(outfitDatabase, "results");
  renderTrendingSection();
  renderSavedSection();
  updateSavedBadge();
  mix("maroon top");
});
