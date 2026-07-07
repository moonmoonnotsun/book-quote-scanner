import fs from "node:fs/promises";
import path from "node:path";

const APP_METADATA_PATH =
  "/Users/vladzinchenko/Work/rn/clarify/locales/appStoreMetadata.json";
const REFERENCE_PHRASES_PATH =
  "/Users/vladzinchenko/Work/rn/study-flashcards/locales/landing-phrases.json";
const OUTPUT_PATH =
  "/Users/vladzinchenko/Work/rn/book-quote-scanner/locales/landing-phrases.json";

const LOCALES = [
  "de",
  "fr",
  "es",
  "ru",
  "pl",
  "ja",
  "pt-BR",
  "zh-Hans",
  "ko",
  "it",
  "nl",
  "tr",
  "uk",
  "ar",
  "sv",
  "zh-Hant",
  "pt-PT",
  "vi",
  "id",
  "th",
  "cs",
  "da",
  "nb",
  "fi",
  "he",
  "ca",
  "hr",
  "el",
  "hi",
  "hu",
  "ms",
  "es-MX",
  "ro",
  "sk",
  "fr-CA",
];

const APP_STORE_COUNTRY = {
  de: "de",
  fr: "fr",
  es: "es",
  ru: "ru",
  pl: "pl",
  ja: "jp",
  "pt-BR": "br",
  "zh-Hans": "cn",
  ko: "kr",
  it: "it",
  nl: "nl",
  tr: "tr",
  uk: "ua",
  ar: "sa",
  sv: "se",
  "zh-Hant": "tw",
  "pt-PT": "pt",
  vi: "vn",
  id: "id",
  th: "th",
  cs: "cz",
  da: "dk",
  nb: "no",
  fi: "fi",
  he: "il",
  ca: "es",
  hr: "hr",
  el: "gr",
  hi: "in",
  hu: "hu",
  ms: "my",
  "es-MX": "mx",
  ro: "ro",
  sk: "sk",
  "fr-CA": "ca",
};

const OG_LOCALE = {
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  ru: "ru_RU",
  pl: "pl_PL",
  ja: "ja_JP",
  "pt-BR": "pt_BR",
  "zh-Hans": "zh_CN",
  ko: "ko_KR",
  it: "it_IT",
  nl: "nl_NL",
  tr: "tr_TR",
  uk: "uk_UA",
  ar: "ar_SA",
  sv: "sv_SE",
  "zh-Hant": "zh_TW",
  "pt-PT": "pt_PT",
  vi: "vi_VN",
  id: "id_ID",
  th: "th_TH",
  cs: "cs_CZ",
  da: "da_DK",
  nb: "nb_NO",
  fi: "fi_FI",
  he: "he_IL",
  ca: "ca_ES",
  hr: "hr_HR",
  el: "el_GR",
  hi: "hi_IN",
  hu: "hu_HU",
  ms: "ms_MY",
  "es-MX": "es_MX",
  ro: "ro_RO",
  sk: "sk_SK",
  "fr-CA": "fr_CA",
};

const HTML_LANG = {
  de: "de",
  fr: "fr",
  es: "es",
  ru: "ru",
  pl: "pl",
  ja: "ja",
  "pt-BR": "pt-BR",
  "zh-Hans": "zh-CN",
  ko: "ko",
  it: "it",
  nl: "nl",
  tr: "tr",
  uk: "uk",
  ar: "ar",
  sv: "sv",
  "zh-Hant": "zh-TW",
  "pt-PT": "pt-PT",
  vi: "vi",
  id: "id",
  th: "th",
  cs: "cs",
  da: "da",
  nb: "nb",
  fi: "fi",
  he: "he",
  ca: "ca",
  hr: "hr",
  el: "el",
  hi: "hi",
  hu: "hu",
  ms: "ms",
  "es-MX": "es-MX",
  ro: "ro",
  sk: "sk",
  "fr-CA": "fr-CA",
};

const TRANSLATE_TARGET = {
  "pt-BR": "pt",
  "pt-PT": "pt",
  "es-MX": "es",
  "fr-CA": "fr",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-TW",
  nb: "no",
};

const SOURCE_FIELDS = [
  "metaTitle",
  "metaDescription",
  "heroSlogan",
  "heroH1Before",
  "heroH1Highlight",
  "heroTagline",
  "sectionFeaturesLine1",
  "sectionFeaturesLine2",
  "sectionFeaturesSubtitle",
  "sectionScreenshotsTitle",
  "sectionScreenshotsSubtitle",
  "sectionAboutTitle",
  "sectionAboutTitleAccent",
  "sectionAboutCopy",
  "sectionAboutCopyAfter",
  "faqTitle",
  "faqTitleAccent",
  "faqSubtitle",
  "faq1Q",
  "faq1A",
  "faq1AAfter",
  "faq2Q",
  "faq2A",
  "faq3Q",
  "faq3A",
  "faq4Q",
  "faq4A",
  "faq5Q",
  "faq5A",
  "faq6Q",
  "faq6A",
  "ctaTitle",
  "ctaDescription",
  "ctaDescriptionAfter",
  "feature5Title",
  "feature5Desc",
  "feature6Title",
  "feature6Desc",
];

function getMetadataName(metadata, locale) {
  if (metadata[locale]?.name) {
    return metadata[locale].name;
  }
  const fallbackMap = {
    "pt-BR": "pt-BR",
    "pt-PT": "pt-PT",
    "es-MX": "es-MX",
    "fr-CA": "fr-CA",
    "zh-Hans": "zh-Hans",
    "zh-Hant": "zh-Hant",
  };
  const fallbackKey = fallbackMap[locale];
  if (fallbackKey && metadata[fallbackKey]?.name) {
    return metadata[fallbackKey].name;
  }
  if (metadata.en?.name) {
    return metadata.en.name;
  }
  if (metadata["en-US"]?.name) {
    return metadata["en-US"].name;
  }
  return "Book Quote Scanner";
}

function buildEnglishTemplates(appName) {
  return {
    metaTitle: `${appName} - Book Quote Scanner OCR App for iPhone`,
    metaDescription:
      `${appName} lets you OCR-scan pages, save book quotes, and reread favourites on iPhone. Build your personal quote library with word definitions and AI help.`,
    heroSlogan: `${appName} for iPhone`,
    heroH1Before: "Scan, save and read your favourite ",
    heroH1Highlight: "book quotes",
    heroTagline:
      "lets you scan any page and save book quotes. Snap a photo, pick your favourites, and keep them in one library.",
    sectionFeaturesLine1: "Your personal quote library,",
    sectionFeaturesLine2: "built from every page you read",
    sectionFeaturesSubtitle:
      "Everything you need to scan, save, and read book quotes again - from OCR scanning to word definitions and AI help.",
    sectionScreenshotsTitle: "See it in action",
    sectionScreenshotsSubtitle:
      "Simple screens for scanning, saving, and reading book quotes",
    sectionAboutTitle: "What is a ",
    sectionAboutTitleAccent: "book quote scanner app",
    sectionAboutCopy:
      "A book quote scanner app captures text from printed pages so you can save quotes in one place. ",
    sectionAboutCopyAfter:
      " for iPhone - OCR scanning, quote library, word definitions, and AI vocabulary help.",
    faqTitle: "Book quote scanner ",
    faqTitleAccent: "FAQ",
    faqSubtitle: "Common questions about our book quote scanner app for iPhone",
    faq1Q: "What is a book quote scanner app?",
    faq1A:
      "A book quote scanner app captures text from printed pages and saves your quotes. ",
    faq1AAfter:
      " uses your iPhone camera and OCR to build your personal quote library.",
    faq2Q: "Is this app free?",
    faq2A:
      "Yes - free download on the App Store. Premium features are optional in-app purchases.",
    faq3Q: "How does quote scanning work?",
    faq3A:
      "Point your camera at a page, select the quote you want, and save it with OCR text recognition.",
    faq4Q: "Can I organise quotes by book?",
    faq4A:
      "Yes. Group saved quotes by book, theme, or author so your collection stays easy to browse.",
    faq5Q: "Are word definitions included?",
    faq5A:
      "Yes. Tap any word while reading quotes to get instant definitions and build your vocabulary.",
    faq6Q: "Is there AI vocabulary help?",
    faq6A:
      "Yes. Ask AI about words while collecting quotes so you can understand and remember more.",
    ctaTitle: "Download the book quote scanner app",
    ctaDescription: "Download ",
    ctaDescriptionAfter:
      " on iPhone - scan pages, save favourite quotes, and read them anytime.",
    feature5Title: "AI Vocabulary Chat",
    feature5Desc:
      "Ask AI about words while collecting quotes. Learn meanings faster and keep reading flow.",
    feature6Title: "Favourites Library",
    feature6Desc:
      "Save your best quotes and read them anytime. Keep every favourite quote in one place.",
  };
}

async function translateText(text, locale) {
  const target = TRANSLATE_TARGET[locale] ?? locale;
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.searchParams.set("client", "gtx");
  url.searchParams.set("sl", "en");
  url.searchParams.set("tl", target);
  url.searchParams.set("dt", "t");
  url.searchParams.set("q", text);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Translation request failed (${response.status}) for locale ${locale}`
    );
  }
  const data = await response.json();
  return data[0].map((chunk) => chunk[0]).join("");
}

async function translateBatch(texts, locale) {
  return Promise.all(texts.map((text) => translateText(text, locale)));
}

function lowerFirstIfLatin(text) {
  if (!text || typeof text !== "string") {
    return text;
  }
  const first = text[0];
  if (/[A-Z]/.test(first)) {
    return first.toLowerCase() + text.slice(1);
  }
  return text;
}

function truncateAtWord(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim();
}

function normalizeLengths(item, appName) {
  if (item.metaTitle.length < 50) {
    item.metaTitle = `${item.metaTitle} iPhone`;
  }
  item.metaTitle = truncateAtWord(item.metaTitle, 65);
  if (item.metaDescription.length < 140) {
    item.metaDescription = `${item.metaDescription} ${appName}.`;
  }
  item.metaDescription = truncateAtWord(item.metaDescription, 160);
  return item;
}

async function main() {
  const [metadataRaw, referenceRaw] = await Promise.all([
    fs.readFile(APP_METADATA_PATH, "utf8"),
    fs.readFile(REFERENCE_PHRASES_PATH, "utf8"),
  ]);

  const metadata = JSON.parse(metadataRaw);
  const reference = JSON.parse(referenceRaw);
  const output = {};

  for (const locale of LOCALES) {
    const appName = getMetadataName(metadata, locale);
    const englishTemplates = buildEnglishTemplates(appName);
    const englishValues = SOURCE_FIELDS.map((field) => englishTemplates[field]);
    const translatedValues = await translateBatch(englishValues, locale);

    const translated = {};
    for (let i = 0; i < SOURCE_FIELDS.length; i += 1) {
      translated[SOURCE_FIELDS[i]] = translatedValues[i];
    }

    translated.heroTagline = lowerFirstIfLatin(translated.heroTagline);
    translated.sectionAboutCopy = translated.sectionAboutCopy.trimEnd() + " ";
    translated.ctaDescription = translated.ctaDescription.trimEnd() + " ";

    const fromReference = reference[locale] ?? {};
    const item = {
      htmlLang: HTML_LANG[locale],
      ogLocale: OG_LOCALE[locale],
      appStoreCountry: APP_STORE_COUNTRY[locale],
      metaTitle: translated.metaTitle,
      metaDescription: translated.metaDescription,
      heroSlogan: translated.heroSlogan,
      heroH1Before: translated.heroH1Before,
      heroH1Highlight: translated.heroH1Highlight,
      heroH1After: "",
      heroTagline: translated.heroTagline,
      sectionFeaturesLine1: translated.sectionFeaturesLine1,
      sectionFeaturesLine2: translated.sectionFeaturesLine2,
      sectionFeaturesSubtitle: translated.sectionFeaturesSubtitle,
      sectionScreenshotsTitle:
        translated.sectionScreenshotsTitle ??
        fromReference.sectionScreenshotsTitle ??
        "See it in action",
      sectionScreenshotsSubtitle:
        translated.sectionScreenshotsSubtitle ??
        fromReference.sectionScreenshotsSubtitle ??
        "Simple screens for scanning, saving, and reading book quotes",
      sectionAboutTitle: translated.sectionAboutTitle,
      sectionAboutTitleAccent: translated.sectionAboutTitleAccent,
      sectionAboutTitleEnd: "?",
      sectionAboutCopy: translated.sectionAboutCopy,
      sectionAboutCopyAfter: translated.sectionAboutCopyAfter,
      faqTitle: translated.faqTitle,
      faqTitleAccent: translated.faqTitleAccent || "FAQ",
      faqSubtitle: translated.faqSubtitle,
      faq1Q: translated.faq1Q,
      faq1A: translated.faq1A,
      faq1AAfter: translated.faq1AAfter,
      faq2Q: translated.faq2Q,
      faq2A: translated.faq2A,
      faq3Q: translated.faq3Q,
      faq3A: translated.faq3A,
      faq4Q: translated.faq4Q,
      faq4A: translated.faq4A,
      faq5Q: translated.faq5Q,
      faq5A: translated.faq5A,
      faq6Q: translated.faq6Q,
      faq6A: translated.faq6A,
      ctaTitle: translated.ctaTitle,
      ctaDescription: translated.ctaDescription,
      ctaDescriptionAfter: translated.ctaDescriptionAfter,
      downloadAppStore:
        fromReference.downloadAppStore ?? "Download on the App Store",
      free: fromReference.free ?? "Free",
      privacy: fromReference.privacy ?? "Privacy",
      terms: fromReference.terms ?? "Terms",
      support: fromReference.support ?? "Support",
      contact: fromReference.contact ?? "Contact",
      langSwitcherLabel: fromReference.langSwitcherLabel ?? "Language",
      feature5Title: translated.feature5Title,
      feature5Desc: translated.feature5Desc,
      feature6Title: translated.feature6Title,
      feature6Desc: translated.feature6Desc,
    };

    if (locale === "ar" || locale === "he") {
      item.htmlDir = "rtl";
    }

    output[locale] = normalizeLengths(item, appName);
  }

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Generated ${OUTPUT_PATH}`);
  console.log(`Locales: ${Object.keys(output).length}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
