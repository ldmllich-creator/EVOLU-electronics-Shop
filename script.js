// ============================================
// EVOLU Electronics Landing Page — JavaScript
// Language Switcher, FAQ, Animations, Filters
// ============================================

// === TRANSLATIONS ===
const translations = {
    en: {
        // Nav
        nav_about: "About",
        nav_products: "Products",
        nav_care: "Care",
        nav_repair: "Service",
        nav_faq: "FAQ",
        nav_contact: "Contact",

        // Hero
        hero_badge: "Certified Medical Devices",
        hero_title1: "Healthcare for",
        hero_title2: "your family",
        hero_desc: "EVOLU electronics — accurate, reliable, and easy-to-use medical devices for daily health monitoring. Inhalers, blood pressure monitors, thermometers, and pulse oximeters.",
        hero_btn_catalog: "Product Catalog",
        hero_btn_contact: "Contact Us",
        stat_products: "Products",
        stat_cert: "Certification",
        stat_warranty: "Years Warranty",
        stat_delivery: "Delivery in Latvia",

        // About
        about_badge: "About Us",
        about_title: "Why Choose EVOLU?",
        about_subtitle: "We offer certified European-quality medical devices for daily health monitoring of your family.",
        about_1_title: "Measurement Accuracy",
        about_1_desc: "All our devices undergo strict quality control and meet European standards for medical device accuracy.",
        about_2_title: "CE Certification",
        about_2_desc: "EVOLU products are certified in accordance with European medical device directives and are safe to use.",
        about_3_title: "For the Whole Family",
        about_3_desc: "From children's car-shaped inhalers to blood pressure monitors for the elderly — we have solutions for every family member.",

        // Products
        prod_badge: "Catalog",
        prod_title: "Our Products",
        prod_subtitle: "Wide range of medical devices for home use",
        tab_all: "All",
        tab_neb: "Inhalers",
        tab_bp: "Blood Pressure",
        tab_therm: "Thermometers",
        tab_oxi: "Pulse Oximeters",
        cat_neb: "Inhaler",
        cat_bp: "Blood Pressure Monitor",
        cat_therm: "Thermometer",
        cat_oxi: "Pulse Oximeter",
        buy_link: "Buy →",
        prod_supercar: "Compressor inhaler shaped like a racing car. Perfect for kids — turns inhalation into playtime. Effective medication delivery for asthma, bronchitis, and allergies.",
        prod_nanoairpro: "Portable Mesh nebulizer with ultrasonic technology. Silent operation, USB charging, compact design for travel. Particle size less than 5μm.",
        prod_nanoairmini: "Ultra-compact Mesh nebulizer. Weighs only 90g — fits in your pocket. Built-in rechargeable battery, suitable for children and adults.",
        prod_nanoair: "Portable Mesh nebulizer for inhalation anywhere. Quiet operation, convenient one-button control, masks for children and adults included.",
        prod_universal: "Compressor nebulizer for the whole family. Reliable motor, adjustable nebulization rate, complete set of masks and nozzles included.",
        prod_intelligent: "Automatic blood pressure monitor with large clear display. Intelligent inflation technology, 2×60 memory, arrhythmia indicator and WHO blood pressure classification.",
        prod_intelligent_black: "Automatic blood pressure monitor in elegant black design. Large display, intelligent inflation technology, 2×60 memory, arrhythmia indicator.",
        prod_automatic: "Compact automatic blood pressure monitor for daily use. Simple one-button operation, large digits on display, measurement memory.",
        prod_noncontact: "Infrared non-contact thermometer. Measurement in 1 second without touching. Three modes: body, surface, room. Perfect for infants.",
        prod_soft: "Digital thermometer with flexible tip for comfortable measurement. Waterproof body, audible signal, last result memory.",
        prod_simple: "Basic digital thermometer — reliable, accurate, simple. 60-second measurement, audible signal, auto-off. Perfect choice for home first aid kit.",
        prod_oxi_name: "Pulse Oximeter",
        prod_oximeter: "Fingertip pulse oximeter for measuring blood oxygen level (SpO2) and pulse rate. OLED display, result in 8 seconds, auto-off, runs on AAA batteries.",

        // Care
        care_badge: "Care",
        care_title: "Care & Usage",
        care_subtitle: "Proper care of medical devices ensures measurement accuracy and long service life",
        care_1_title: "Inhalers & Nebulizers",
        care_1_desc: "After each use, rinse the mask, mouthpiece, and medication cup with warm water. Disinfect parts weekly. Store in a dry place. Replace filters every 3–6 months.",
        care_2_title: "Blood Pressure Monitors",
        care_2_desc: "Measure blood pressure in a calm state, sitting with back support. Cuff at heart level. Avoid coffee 30 minutes before measurement. Wipe the cuff with a soft cloth.",
        care_3_title: "Thermometers",
        care_3_desc: "Wipe digital thermometers with alcohol after use. Non-contact thermometer: hold 3–5 cm from forehead. Store in protective case, avoid drops.",
        care_4_title: "General Recommendations",
        care_4_desc: "Store devices at 10–40°C and humidity below 85%. Replace batteries on time. Do not drop devices. Do not disassemble devices yourself.",

        // Repair
        repair_badge: "Support",
        repair_title: "Service & Repair",
        repair_subtitle: "We provide full support and warranty service for all EVOLU products",
        repair_s1_title: "Contact Us",
        repair_s1_desc: "Describe the issue by phone +371 20387070 or email info@evolu.lv. We'll help determine if repair is needed.",
        repair_s2_title: "Send the Device",
        repair_s2_desc: "Package the device and send it to our service center. Include a description of the problem and purchase receipt.",
        repair_s3_title: "Diagnosis & Repair",
        repair_s3_desc: "Our specialists will diagnose and fix the issue. Warranty repairs are free of charge.",
        repair_s4_title: "Return of Repaired Device",
        repair_s4_desc: "We'll send the repaired device back to you with a service completion report.",
        repair_info_title: "Spare Parts",
        repair_info_desc: "In our store you can purchase original spare parts: masks, tubes, filters, mouthpieces, and blood pressure cuffs.",
        repair_btn: "Spare Parts",

        // FAQ
        faq_title: "Frequently Asked Questions",
        faq_subtitle: "Answers to popular questions about our products",
        faq_q1: "Which inhaler is suitable for a child?",
        faq_a1: "For children, we recommend the SUPER CAR compressor inhaler — its bright car design turns the procedure into a game. For travel, the compact NANO AIR MINI is perfect. All models come with children's masks.",
        faq_q2: "How often should a blood pressure monitor be calibrated?",
        faq_a2: "We recommend checking accuracy every 2 years. With careful use and storage, calibration lasts a long time. If readings seem inaccurate, contact us.",
        faq_q3: "Non-contact thermometer — how accurate is it?",
        faq_a3: "The NON CONTACT infrared thermometer has an accuracy of ±0.2°C, meeting medical standards. For best accuracy: aim at a clean, dry forehead from 3–5 cm, in a draft-free room.",
        faq_q4: "Is there a warranty on products?",
        faq_a4: "Yes, all EVOLU devices come with a warranty of at least 2 years. During the warranty period, we'll fix manufacturer defects free of charge. Keep your purchase receipt.",
        faq_q5: "How to arrange delivery in Latvia?",
        faq_a5: "Delivery to parcel lockers in Latvia is free for orders over €25. Place your order at evolu.lv, choose the nearest locker, and receive your package within 2–3 business days.",
        faq_q6: "What is a pulse oximeter and why do I need one?",
        faq_a6: "A pulse oximeter measures blood oxygen level (SpO2) and pulse rate. Normal SpO2 is 95–100%. It's useful for respiratory conditions, sports, mountain travel, and elderly care.",

        // Contact
        contact_badge: "Contact",
        contact_title: "Get in Touch",
        contact_subtitle: "We're happy to help you choose products or answer questions",
        contact_phone_label: "Phone",
        contact_shop_label: "Online Store",
        contact_delivery_label: "Delivery",
        contact_delivery_text: "Free to parcel lockers from €25",
        form_name: "Your Name",
        form_email: "Your Email",
        form_message: "Message",
        form_submit: "Send Message",

        // Reviews
        nav_reviews: "Reviews",
        reviews_badge: "Reviews",
        reviews_title: "What Our Customers Say",
        reviews_subtitle: "Real reviews from EVOLU electronics customers",
        reviews_count: "Based on Google reviews",
        reviews_btn: "Leave a Review on Google",
        reviews_all_btn: "All Google Reviews",
        review_months_ago: "months ago",
        review_month_ago: "month ago",
        review_weeks_ago: "weeks ago",
        review_1_text: "We bought the SUPER CAR inhaler for our son — he loves it! Inhalation is now tear-free. Excellent quality, masks and attachments included.",
        review_2_text: "NANO AIR PRO — the best portable nebulizer I've tried. Silent, compact, USB charging. I take it on every trip. Highly recommend!",
        review_3_text: "The INTELLIGENT blood pressure monitor is convenient and accurate. Large display — my mom can easily read the values. 120-measurement memory is very useful for tracking trends.",
        review_4_text: "The NON CONTACT thermometer is essential with a small child. Measures in a second, no need to wake the baby. Accuracy is excellent, verified with a doctor.",
        review_5_text: "Ordered NANO AIR MINI — the size is impressive, it really fits in a pocket. Works quietly, the child isn't scared. Free delivery to parcel locker in 2 days.",
        review_6_text: "EVOLU pulse oximeter — excellent quality at a reasonable price. Bright OLED display, stable readings. Bought it for my mom after COVID, very useful device.",

        // Footer
        footer_desc: "Medical devices for daily health monitoring of your family. Accuracy, reliability, simplicity.",
        footer_products: "Products",
        footer_spare: "Spare Parts",
        footer_info: "Information",
        footer_shipping: "Shipping",
        footer_returns: "Returns",
        footer_terms: "Terms",
        footer_privacy: "Privacy",
        footer_rights: "All rights reserved."
    },

    lv: {
        // Nav
        nav_about: "Par mums",
        nav_products: "Produkti",
        nav_care: "Kopšana",
        nav_repair: "Serviss",
        nav_faq: "FAQ",
        nav_contact: "Kontakti",

        // Hero
        hero_badge: "Sertificētas medicīnas ierīces",
        hero_title1: "Rūpes par jūsu",
        hero_title2: "ģimenes veselību",
        hero_desc: "EVOLU electronics — precīzas, uzticamas un viegli lietojamas medicīnas ierīces ikdienas veselības uzraudzībai. Inhalatori, asinsspiediena mērītāji, termometri un pulsoksimetri.",
        hero_btn_catalog: "Produktu katalogs",
        hero_btn_contact: "Sazināties ar mums",
        stat_products: "Produkti",
        stat_cert: "Sertifikācija",
        stat_warranty: "Gadu garantija",
        stat_delivery: "Piegāde Latvijā",

        // About
        about_badge: "Par mums",
        about_title: "Kāpēc izvēlēties EVOLU?",
        about_subtitle: "Mēs piedāvājam sertificētas Eiropas kvalitātes medicīnas ierīces jūsu ģimenes ikdienas veselības uzraudzībai.",
        about_1_title: "Mērījumu precizitāte",
        about_1_desc: "Visas mūsu ierīces iziet stingru kvalitātes kontroli un atbilst Eiropas medicīnas ierīču precizitātes standartiem.",
        about_2_title: "CE sertifikācija",
        about_2_desc: "EVOLU produkti ir sertificēti saskaņā ar Eiropas medicīnas ierīču direktīvām un ir droši lietošanai.",
        about_3_title: "Visai ģimenei",
        about_3_desc: "No bērnu automašīnas formas inhalatoriem līdz asinsspiediena mērītājiem vecāka gadagājuma cilvēkiem — mums ir risinājumi katram ģimenes loceklim.",

        // Products
        prod_badge: "Katalogs",
        prod_title: "Mūsu produkti",
        prod_subtitle: "Plašs medicīnas ierīču klāsts mājas lietošanai",
        tab_all: "Visi",
        tab_neb: "Inhalatori",
        tab_bp: "Tonometri",
        tab_therm: "Termometri",
        tab_oxi: "Pulsoksimetri",
        cat_neb: "Inhalators",
        cat_bp: "Asinsspiediena mērītājs",
        cat_therm: "Termometrs",
        cat_oxi: "Pulsoksimetrs",
        buy_link: "Pirkt →",
        prod_supercar: "Kompresora inhalators sacīkšu automašīnas formā. Ideāls bērniem — pārvērš inhalāciju spēlē. Efektīva zāļu izsmidzināšana astmas, bronhīta un alerģijas ārstēšanai.",
        prod_nanoairpro: "Portatīvais Mesh nebulizers ar ultraskaņas tehnoloģiju. Klusa darbība, USB uzlāde, kompakts dizains ceļojumiem. Daļiņu izmērs mazāks par 5μm.",
        prod_nanoairmini: "Īpaši kompakts Mesh nebulizers. Svars tikai 90g — ietilpst kabatā. Iebūvēts uzlādējams akumulators, piemērots bērniem un pieaugušajiem.",
        prod_nanoair: "Portatīvais Mesh nebulizers inhalācijām jebkurā vietā. Klusa darbība, ērta vienas pogas vadība, bērnu un pieaugušo maskas komplektā.",
        prod_universal: "Kompresora nebulizers visai ģimenei. Uzticams motors, regulējams izsmidzināšanas ātrums, pilns masku un uzgaļu komplekts.",
        prod_intelligent: "Automātiskais asinsspiediena mērītājs ar lielu skaidru displeju. Intelektuālās piepūšanas tehnoloģija, 2×60 atmiņa, aritmijas indikators un PVO asinsspiediena klasifikācija.",
        prod_intelligent_black: "Automātiskais asinsspiediena mērītājs elegāntā melnā dizainā. Liels displejs, intelektuālās piepūšanas tehnoloģija, 2×60 atmiņa, aritmijas indikators.",
        prod_automatic: "Kompakts automātiskais asinsspiediena mērītājs ikdienas lietošanai. Vienkārša vienas pogas vadība, lieli cipari uz displeja, mērījumu atmiņa.",
        prod_noncontact: "Infrasarkanais bezkontakta termometrs. Mērījums 1 sekundē bez pieskāriena. Trīs režīmi: ķermenis, virsma, telpa. Ideāls zīdaiņiem.",
        prod_soft: "Digitālais termometrs ar elastīgu uzgali komfortablam mērījumam. Ūdensizturīgs korpuss, skaņas signāls, pēdējā rezultāta atmiņa.",
        prod_simple: "Pamata digitālais termometrs — uzticams, precīzs, vienkāršs. 60 sekunžu mērījums, skaņas signāls, automātiska izslēgšanās. Ideāla izvēle mājas aptieciņai.",
        prod_oxi_name: "Pulsoksimetrs",
        prod_oximeter: "Pirksta pulsoksimetrs skābekļa līmeņa asinīs (SpO2) un pulsa mērīšanai. OLED displejs, rezultāts 8 sekundēs, automātiska izslēgšanās, darbojas ar AAA baterijām.",

        // Care
        care_badge: "Kopšana",
        care_title: "Kopšana un lietošana",
        care_subtitle: "Pareiza medicīnas ierīču kopšana nodrošina mērījumu precizitāti un ilgu kalpošanas laiku",
        care_1_title: "Inhalatori un nebulizeri",
        care_1_desc: "Pēc katras lietošanas noskalojiet masku, iemutni un zāļu trauku ar siltu ūdeni. Reizi nedēļā dezinficējiet detaļas. Glabājiet sausā vietā. Nomainiet filtrus ik 3–6 mēnešus.",
        care_2_title: "Asinsspiediena mērītāji",
        care_2_desc: "Mēriet asinsspiedienu mierīgā stāvoklī, sēžot ar muguras atbalstu. Aproce sirds līmenī. Nelieto kafiju 30 minūtes pirms mērījuma. Slaukiet aproci ar mīkstu drānu.",
        care_3_title: "Termometri",
        care_3_desc: "Digitālos termometrus noslaukiet ar spirtu pēc lietošanas. Bezkontakta termometrs: turiet 3–5 cm no pieres. Glabājiet aizsargapvalkā, izvairieties no triecieniem.",
        care_4_title: "Vispārīgi ieteikumi",
        care_4_desc: "Glabājiet ierīces temperatūrā 10–40°C un mitrumā zem 85%. Savlaicīgi nomainiet baterijas. Nemetiet ierīces zemē. Neizjauciet ierīces paši.",

        // Repair
        repair_badge: "Atbalsts",
        repair_title: "Serviss un remonts",
        repair_subtitle: "Mēs nodrošinām pilnu atbalstu un garantijas servisu visiem EVOLU produktiem",
        repair_s1_title: "Sazinieties ar mums",
        repair_s1_desc: "Aprakstiet problēmu pa tālruni +371 20387070 vai e-pastu info@evolu.lv. Mēs palīdzēsim noteikt, vai nepieciešams remonts.",
        repair_s2_title: "Nosūtiet ierīci",
        repair_s2_desc: "Iepakojiet ierīci un nosūtiet uz mūsu servisa centru. Pievienojiet defekta aprakstu un pirkuma čeku.",
        repair_s3_title: "Diagnostika un remonts",
        repair_s3_desc: "Mūsu speciālisti veiks diagnostiku un novērsīs defektu. Garantijas remonts — bez maksas.",
        repair_s4_title: "Saremontētās ierīces atgriešana",
        repair_s4_desc: "Mēs nosūtīsim saremontēto ierīci atpakaļ jums ar veikto darbu aktu.",
        repair_info_title: "Rezerves daļas",
        repair_info_desc: "Mūsu veikalā jūs varat iegādāties oriģinālās rezerves daļas: maskas, caurules, filtrus, iemutņus un tonometru aproci.",
        repair_btn: "Rezerves daļas",

        // FAQ
        faq_title: "Biežāk uzdotie jautājumi",
        faq_subtitle: "Atbildes uz populāriem jautājumiem par mūsu produktiem",
        faq_q1: "Kurš inhalators ir piemērots bērnam?",
        faq_a1: "Bērniem mēs iesakām kompresora inhalatoru SUPER CAR — tā spilgtais automašīnas dizains pārvērš procedūru spēlē. Ceļojumiem piemērots kompaktais NANO AIR MINI. Visiem modeļiem ir bērnu maskas.",
        faq_q2: "Cik bieži jākalibrē asinsspiediena mērītājs?",
        faq_a2: "Mēs iesakām pārbaudīt precizitāti reizi 2 gados. Rūpīgi lietojot un glabājot, kalibrēšana saglabājas ilgi. Ja rādījumi šķiet neprecīzi — sazinieties ar mums.",
        faq_q3: "Bezkontakta termometrs — cik precīzs tas ir?",
        faq_a3: "NON CONTACT infrasarkanā termometra precizitāte ir ±0,2°C, kas atbilst medicīnas standartiem. Labākai precizitātei: vērsiet uz tīru, sausu pieri no 3–5 cm, telpā bez caurvēja.",
        faq_q4: "Vai produktiem ir garantija?",
        faq_a4: "Jā, visām EVOLU ierīcēm ir vismaz 2 gadu garantija. Garantijas laikā mēs bez maksas novērsīsim ražotāja defektus. Saglabājiet pirkuma čeku.",
        faq_q5: "Kā noformēt piegādi Latvijā?",
        faq_a5: "Piegāde uz pakomātiem Latvijā ir bezmaksas pasūtījumiem virs €25. Noformējiet pasūtījumu evolu.lv, izvēlieties tuvāko pakomātu un saņemiet sūtījumu 2–3 darba dienu laikā.",
        faq_q6: "Kas ir pulsoksimetrs un kāpēc tas ir vajadzīgs?",
        faq_a6: "Pulsoksimetrs mēra skābekļa līmeni asinīs (SpO2) un pulsa frekvenci. Normāls SpO2 ir 95–100%. Tas ir noderīgs elpošanas slimību, sporta, kalnu ceļojumu un vecāka gadagājuma cilvēku aprūpes gadījumos.",

        // Contact
        contact_badge: "Kontakti",
        contact_title: "Sazinies ar mums",
        contact_subtitle: "Mēs ar prieku palīdzēsim izvēlēties produktus vai atbildēsim uz jautājumiem",
        contact_phone_label: "Tālrunis",
        contact_shop_label: "Interneta veikals",
        contact_delivery_label: "Piegāde",
        contact_delivery_text: "Bezmaksas uz pakomātiem no €25",
        form_name: "Jūsu vārds",
        form_email: "Jūsu e-pasts",
        form_message: "Ziņojums",
        form_submit: "Nosūtīt ziņojumu",

        // Reviews
        nav_reviews: "Atsauksmes",
        reviews_badge: "Atsauksmes",
        reviews_title: "Ko saka mūsu klienti",
        reviews_subtitle: "Reālas EVOLU electronics pircēju atsauksmes",
        reviews_count: "Pamatojoties uz Google atsauksmēm",
        reviews_btn: "Atstāt atsauksmi Google",
        reviews_all_btn: "Visas Google atsauksmes",
        review_months_ago: "mēnešus atpakaļ",
        review_month_ago: "mēnesi atpakaļ",
        review_weeks_ago: "nedēļas atpakaļ",
        review_1_text: "Nopirkām inhalatoru SUPER CAR dēlam — viņš ir sajūsmā! Inhalācija tagad notiek bez asarām. Lieliska kvalitāte, maskas un uzgaļi komplektā.",
        review_2_text: "NANO AIR PRO — labākais portatīvais nebulizers, ko esmu izmēģinājis. Kluss, kompakts, USB uzlāde. Ņemu līdzi ceļojumos. Iesaku!",
        review_3_text: "INTELLIGENT asinsspiediena mērītājs ir ērts un precīzs. Liels displejs — mamma viegli nolasa vērtības. 120 mērījumu atmiņa ir ļoti noderīga dinamikas izsekošanai.",
        review_4_text: "Bezkontakta termometrs NON CONTACT — neaizstājams ar mazu bērnu. Mēra sekundē, nav jāmodina mazulis. Precizitāte ir lieliska, pārbaudīta pie ārsta.",
        review_5_text: "Pasūtījām NANO AIR MINI — izmērs pārsteidz, tiešām ietilpst kabatā. Strādā klusi, bērns nebaidās. Bezmaksas piegāde uz pakomātu 2 dienās.",
        review_6_text: "EVOLU pulsoksimetrs — lieliska kvalitāte par saprātīgu cenu. Spilgts OLED displejs, stabili rādījumi. Nopirku mammai pēc COVID, ļoti noderīga lieta.",

        // Footer
        footer_desc: "Medicīnas ierīces jūsu ģimenes ikdienas veselības uzraudzībai. Precizitāte, uzticamība, vienkāršība.",
        footer_products: "Produkti",
        footer_spare: "Rezerves daļas",
        footer_info: "Informācija",
        footer_shipping: "Piegāde",
        footer_returns: "Atgriešana",
        footer_terms: "Noteikumi",
        footer_privacy: "Privātums",
        footer_rights: "Visas tiesības aizsargātas."
    },

    ru: {} // Russian is default in HTML, no translation needed
};

// === LANGUAGE SWITCHER ===
let currentLang = 'ru';

function switchLanguage(lang) {
    currentLang = lang;

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;

    if (lang === 'ru') {
        // Reset to default HTML content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            if (el.dataset.originalHtml) {
                el.innerHTML = el.dataset.originalHtml;
            }
        });
        return;
    }

    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
            // Save original Russian HTML (with SVG icons) on first switch
            if (!el.dataset.originalHtml) {
                el.dataset.originalHtml = el.innerHTML;
            }
            // Preserve child SVG icons — only replace text content
            const svgChild = el.querySelector('svg');
            if (svgChild) {
                const svgHtml = svgChild.outerHTML;
                el.innerHTML = svgHtml + ' ' + t[key];
            } else {
                el.textContent = t[key];
            }
        }
    });
}

// Initialize language buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => switchLanguage(btn.dataset.lang));
});

// Save original Russian HTML (preserves SVG icons inside elements)
document.querySelectorAll('[data-i18n]').forEach(el => {
    el.dataset.originalHtml = el.innerHTML;
});

// === HEADER SCROLL ===
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// === MOBILE MENU ===
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navLinks.classList.toggle('mobile-open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navLinks.classList.remove('mobile-open');
    });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        const wasActive = item.classList.contains('active');

        // Close all
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        // Open clicked (if it wasn't active)
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// === PRODUCT FILTER ===
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter products
        document.querySelectorAll('.product-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.style.display = '';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// === SCROLL REVEAL ANIMATIONS ===
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// === CONTACT FORM → Google Sheets ===
const contactForm = document.getElementById('contactForm');
const CONTACT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwcr4pxud7g0CM9MRU6mULQvkvWDWNDYENjx8a5oJG6xh_S-9fe9bE3Mu6itzIHpgfZ/exec';

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalHTML = submitBtn.innerHTML;
    const loadingTexts = { ru: '⏳ Отправка...', en: '⏳ Sending...', lv: '⏳ Sūta...' };
    submitBtn.textContent = loadingTexts[currentLang] || loadingTexts.ru;
    submitBtn.disabled = true;

    const formData = {
        action: 'contact',
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim(),
        lang: currentLang,
        timestamp: new Date().toISOString(),
        source: 'landing_contact_form'
    };

    try {
        await fetch(CONTACT_SHEET_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify(formData),
            mode: 'no-cors'
        });

        // Show success toast
        showToast('success', currentLang);
        contactForm.reset();
    } catch (err) {
        console.error('Contact form error:', err);
        showToast('error', currentLang);
    }

    submitBtn.innerHTML = originalHTML;
    submitBtn.disabled = false;
});

function showToast(type, lang) {
    const messages = {
        success: {
            ru: '✅ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
            en: '✅ Thank you! Your message has been sent. We will contact you shortly.',
            lv: '✅ Paldies! Jūsu ziņojums ir nosūtīts. Mēs sazināsimies ar jums drīzumā.'
        },
        error: {
            ru: '❌ Ошибка отправки. Пожалуйста, свяжитесь с нами по email: info@evolu.lv',
            en: '❌ Sending failed. Please contact us at: info@evolu.lv',
            lv: '❌ Sūtīšanas kļūda. Lūdzu, sazinieties ar mums: info@evolu.lv'
        }
    };

    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed; top: 20px; left: 50%; transform: translateX(-50%) translateY(-100px);
        background: ${type === 'success' ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #dc2626, #ef4444)'};
        color: white; padding: 16px 32px; border-radius: 12px;
        font-size: 0.95rem; font-weight: 500; z-index: 10000;
        box-shadow: 0 8px 30px rgba(0,0,0,0.2); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: 'Inter', sans-serif; max-width: 90vw; text-align: center;
    `;
    toast.textContent = messages[type][lang] || messages[type].ru;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// === ANIMATE HERO STATS NUMBERS ===
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate the first stat (11+ products)
const statNumbers = document.querySelectorAll('.hero-stat-number');
if (statNumbers.length > 0) {
    animateValue(statNumbers[0], 0, 11, 1500);
}

// === PRODUCT VIDEO HOVER-TO-PLAY ===
document.querySelectorAll('.product-image.has-video').forEach(container => {
    const video = container.querySelector('.product-video');
    const card = container.closest('.product-card');
    if (!video || !card) return;

    // Desktop: hover to play
    card.addEventListener('mouseenter', () => {
        video.currentTime = 0;
        video.play().catch(() => {});
    });
    card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
    });

    // Mobile: tap to toggle
    container.addEventListener('click', (e) => {
        if (window.innerWidth > 768) return;
        e.preventDefault();
        if (video.paused) {
            video.currentTime = 0;
            video.play().catch(() => {});
            container.classList.add('playing');
        } else {
            video.pause();
            container.classList.remove('playing');
        }
    });
});

// === HERO VIDEO AUTO-ROTATION ===
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
    const heroSources = [
        'Video/nano_air_pro.mp4',
        'Video/intelligent.mp4',
        'Video/non_contact.mp4',
        'Video/pulse_oximeter.mp4',
        'Video/automatic_tonometer.mp4',
        'Video/nano_air.mp4'
    ];
    let heroIndex = 0;

    heroVideo.addEventListener('ended', () => {
        heroIndex = (heroIndex + 1) % heroSources.length;
        heroVideo.src = heroSources[heroIndex];
        heroVideo.play().catch(() => {});
    });
}

// === REVIEWS CAROUSEL DRAG-TO-SCROLL ===
const reviewsTrack = document.getElementById('reviewsTrack');
if (reviewsTrack) {
    let isDown = false;
    let startX;
    let scrollLeft;

    reviewsTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        reviewsTrack.style.scrollSnapType = 'none';
        startX = e.pageX - reviewsTrack.offsetLeft;
        scrollLeft = reviewsTrack.scrollLeft;
    });

    reviewsTrack.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsTrack.style.scrollSnapType = 'x mandatory';
    });

    reviewsTrack.addEventListener('mouseup', () => {
        isDown = false;
        reviewsTrack.style.scrollSnapType = 'x mandatory';
    });

    reviewsTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewsTrack.offsetLeft;
        const walk = (x - startX) * 1.5;
        reviewsTrack.scrollLeft = scrollLeft - walk;
    });
}

console.log('🏥 EVOLU Electronics Landing Page loaded successfully!');
