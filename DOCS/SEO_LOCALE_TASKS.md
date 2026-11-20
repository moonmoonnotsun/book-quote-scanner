# Scan Quotes locale tasks

Do not run `scripts/generate-landing-phrases.mjs` until the generator changes below are in. It pastes a localized App Store name into an English sentence, translates that sentence again with `sl=en`, then cuts the title at 65 characters and the description at 160. That is why Korean says "you can read books", Portuguese says shipments, and Arabic, Czech, Spanish, and Chinese say price quotes. CJK has no spaces, so `truncateAtWord` cuts mid-phrase.

Edit `locales/landing-phrases.json` by hand for the strings below. The generator would overwrite them.

## Do once, in `scripts/generate-landing-phrases.mjs`

1. In `buildEnglishTemplates`, stop interpolating `appName` before translation. Use a token `{APP}` and substitute the store name after `translateText` returns.
2. Delete the branch in `normalizeLengths` that appends ` iPhone` when `metaTitle.length < 50`.
3. Change `truncateAtWord` so a string with no space is returned whole. Do not cut at 65 when there is no word boundary.
4. Raise the description cut, or drop it. A cut at 160 produced `citaç`, `para i`, `عروض ال`, and `pressupos`.
5. Escape `"` inside `metaDescription` when the HTML attribute is written. Arabic now has `content="يتيح لك "ماسح…`, so Google sees only `يتيح لك`.

## Titles and the wrong noun

`Book Quote Scanner` stays in every title as the English name. The local half must mean literary book quotes.

| Locale | Write this `metaTitle` | Also replace |
|---|---|---|
| en | `Book Quote Scanner \| Scan and Save Book Quotes` | none |
| de | `Buchzitat-Scanner \| Book Quote Scanner` | drop the repeated name. Meaning is already right. |
| ru | `Сканер цитат из книг \| Book Quote Scanner` | add `OCR` only in `metaDescription` if it is missing |
| da | `Bogcitatskanner \| Book Quote Scanner` | drop the bolted `OCR App til iPhone` from the title |
| nb | `Boksitat-skanner \| Book Quote Scanner` | now `Bok sitat skanner`, three loose words |
| fi | `Kirjalainausskanneri \| Book Quote Scanner` | drop the bolted English template from the title |
| hu | `Könyvidézet-szkenner \| Book Quote Scanner` | now three words: `Könyv idézet szkenner` |
| ro | `Scanner de citate din cărți \| Book Quote Scanner` | now `Scanner citate cărți` |
| uk | `Сканер цитат із книг \| Book Quote Scanner` | in `metaDescription`, `перечитувати улюблені книги` → `перечитувати улюблені цитати` |
| pl | `Skaner cytatów z książek \| Book Quote Scanner` | title currently says the name twice and ends mid-phrase |
| it | `Scanner di citazioni da libri \| Book Quote Scanner` | now cut at `per` |
| tr | `Kitap Alıntı Tarayıcı \| Book Quote Scanner` | now cut at `U` |
| id | `Pemindai Kutipan Buku \| Book Quote Scanner` | now cut at `untuk` |
| ms | `Pengimbas Petikan Buku \| Book Quote Scanner` | now cut at `iPh` |
| fr | `Scan de citations de livres \| Book Quote Scanner` | now cut at `iPh` |
| fr-CA | `Numériseur de citations de livres \| Book Quote Scanner` | must not be the same title as fr |
| el | `Σαρωτής αποφθεγμάτων \| Book Quote Scanner` | now cut at `iPho` |
| hr | `Skener citata iz knjiga \| Book Quote Scanner` | `Skeniranje` is a gerund. Use `Skener`. |
| sk | `Skenovač citátov z kníh \| Book Quote Scanner` | now cut at `iP`. Do not copy Czech. |
| vi | `Máy quét trích dẫn sách \| Book Quote Scanner` | drop the bolted English template |
| he | `סורק ציטוטי ספרים \| Book Quote Scanner` | meaning is already right |
| ja | `書籍引用スキャナー \| Book Quote Scanner` | drop the second `iPhone`. In the description, `ブック参照` → `書籍の引用` |
| ar | `ماسح اقتباسات الكتب \| Book Quote Scanner` | `ترجمات` → `اقتباسات`. `عروض الأسعار` → `الاقتباسات` in `faq4Q`, `faq1A`, and the description. Escape the quotes. |
| pt-BR | `Scanner de citações de livros \| Book Quote Scanner` | `remessas` → `citações`. Description must not end at `citaç`. |
| pt-PT | `Digitalizador de citações de livros \| Book Quote Scanner` | same `remessas` fix, and it must not be a copy of pt-BR. Use `citações`, not `você` / `aplicativo` / `Baixe`. |
| zh-Hans | `书籍摘录扫描器 \| Book Quote Scanner` | `报价` → `摘录`. `个人报价库` → `个人摘录库`. Hero `选择您最喜欢的照片` → `选择您最喜欢的摘录`. One `iPhone` only, in the description. |
| zh-Hant | `書籍摘錄掃描器 \| Book Quote Scanner` | `報價` → `摘錄`. `個人報價庫` → `個人摘錄庫`. |
| ko | `책 인용 스캐너 \| Book Quote Scanner` | delete the title `책을 읽을 수 있어요`. Hero `마음에 드는 사진을` → `마음에 드는 인용문을`. |
| cs | `Skenovač citátů z knih \| Book Quote Scanner` | `cenových nabídek` → `citátů z knih`. `knihovnu nabídek` → `knihovnu citátů`. |
| es | `Escáner de citas de libros \| Book Quote Scanner` | `biblioteca de cotizaciones` → `biblioteca de citas`. Title must not end at `pa`. |
| es-MX | `Escáner de citas de libros \| Book Quote Scanner` | same `cotizaciones` → `citas`. Change `metaDescription` so it is not byte-for-byte the Spain description. Use `en México`. |
| ca | `Escàner de cites de llibres \| Book Quote Scanner` | `biblioteca de pressupostos` → `biblioteca de cites`. Must not end at `pressupos`. |
| nl | `Boekcitaatscanner \| Book Quote Scanner` | `offertebibliotheek` → `citatenbibliotheek` |
| sv | `Bokcitat-skanner \| Book Quote Scanner` | `offertbibliotek` → `citatbibliotek` |
| th | `สแกนเนอร์คำคมจากหนังสือ \| Book Quote Scanner` | title must not be `รวบรวมเนื้อหาจากหนังสือ`. `ราคาหนังสือ` → `คำคมจากหนังสือ`. |
| hi | `बुक कोट स्कैनर \| Book Quote Scanner` | `वर्गीकरण` → `स्कैनर`. `कैटलॉग` → `संग्रह`. |

After the edit, search the JSON for `remessas`, `cotizacion`, `pressupost`, `offerte`, `offertbibliotek`, `报价`, `報價`, `عروض الأسعار`, `ترجمات الكتب`, `ราคา`, and `책을 읽을`. None of those should remain in a title or description.
