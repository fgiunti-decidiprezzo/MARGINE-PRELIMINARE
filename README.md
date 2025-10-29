# Sistema di Analisi Margine Operativo Preliminare

Sistema completo per l'analisi del margine operativo lordo preliminare degli ordini, con supporto per ordini multi-spedizione, filtri avanzati e calcolo automatico dei margini.

## 🚀 Demo Live

**Prova subito l'applicazione senza installare nulla:**

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/fgiunti-decidiprezzo/MARGINE-PRELIMINARE)
[![Open in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/fgiunti-decidiprezzo/MARGINE-PRELIMINARE)

## Caratteristiche Principali

- **Analisi Margine Completa**: Visualizza ricavi, costi (incluse commissioni) e margini per ogni ordine
- **Ordini Multi-Spedizione**: Supporto per ordini con più spedizioni/tracking
- **Filtri Avanzati**: Ricerca per data, fornitore, corriere, marketplace e stato dei costi
- **Statistiche in Tempo Reale**: Riepilogo aggregato con ordini profittevoli/perdenti
- **Esportazione Dati**: Export in CSV o Excel con tutti i dettagli
- **Interfaccia Responsiva**: Design moderno e mobile-friendly
- **TypeScript**: Type-safety completa per maggiore affidabilità

## Novità: Campo Commissioni

Questa versione include il campo **Commissioni** che mancava nella versione originale:

- Commissioni marketplace (Amazon, eBay, etc.)
- Commissioni payment gateway (PayPal, Stripe, etc.)
- Fee fisse per transazione
- Visualizzazione separata nella tabella
- Inclusione nel calcolo del margine operativo

### Formula Margine

```
Margine = (Valore Prodotto + Valore Spedizione - Sconti) - (Costo Prodotto + Costo Spedizione + Commissioni)
```

## Struttura del Progetto

```
MARGINE-PRELIMINARE/
├── docs/
│   └── API.md                          # Documentazione API completa
├── src/
│   ├── components/                      # Componenti React
│   │   ├── OrderMarginAnalysis.tsx     # Componente principale
│   │   ├── OrderMarginAnalysis.css
│   │   ├── Filters.tsx                 # Filtri di ricerca
│   │   ├── Filters.css
│   │   ├── Statistics.tsx              # Statistiche aggregate
│   │   ├── Statistics.css
│   │   ├── OrderTable.tsx              # Tabella ordini
│   │   └── OrderTable.css
│   ├── hooks/                          # Custom React Hooks
│   │   ├── useOrders.ts                # Hook per caricare ordini
│   │   ├── useFilterOptions.ts         # Hook per opzioni filtri
│   │   └── useExport.ts                # Hook per esportazione
│   ├── services/
│   │   └── api.service.ts              # Client API con Axios
│   ├── types/
│   │   └── order.types.ts              # TypeScript types e interfaces
│   ├── utils/
│   │   └── calculations.ts             # Utility per calcoli e formattazione
│   ├── App.tsx                         # Componente App
│   ├── main.tsx                        # Entry point
│   ├── index.css                       # Stili globali
│   └── vite-env.d.ts                   # Type definitions Vite
├── .env.example                        # Esempio variabili ambiente
├── .gitignore
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## Requisiti

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0 (o yarn/pnpm equivalente)
- **Backend API**: Deve implementare le API documentate in `docs/API.md`

## Installazione

### 1. Clona il repository

```bash
git clone <repository-url>
cd MARGINE-PRELIMINARE
```

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Configura le variabili d'ambiente

Crea un file `.env` nella root del progetto:

```bash
cp .env.example .env
```

Modifica `.env` con i tuoi valori:

```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 4. Avvia il server di sviluppo

```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:3000`

### 5. Build per produzione

```bash
npm run build
```

I file compilati saranno nella cartella `dist/`

## Configurazione Backend

Il frontend richiede un backend che implementi le API documentate in `docs/API.md`.

### Endpoint Principali Richiesti

- `GET /api/v1/orders` - Lista ordini con filtri
- `GET /api/v1/orders/:id` - Dettaglio singolo ordine
- `GET /api/v1/orders/statistics` - Statistiche aggregate
- `GET /api/v1/filter-options` - Opzioni per i filtri
- `POST /api/v1/orders/export` - Esporta dati
- `POST /api/v1/auth/login` - Login utente

Vedi `docs/API.md` per la documentazione completa.

## Utilizzo

### Filtri di Ricerca

La maschera di controllo offre molteplici filtri:

1. **Ricerca Testuale**: Cerca per ID ordine, nome cliente o numero tracking
2. **Intervallo Date**: Filtra ordini per data (con quick-action "Mese corrente")
3. **Fornitore**: Filtra per fornitore specifico
4. **Data Evasione**: Filtra per data di evasione
5. **Logistica**: Filtra per magazzino/centro logistico
6. **Corriere**: Filtra per corriere (DHL, UPS, GLS, BRT, etc.)
7. **Costo Prodotto**: Filtra ordini con costi prodotto OK o KO
8. **Costo Spedizione**: Filtra ordini con costi spedizione OK o KO

### Statistiche

Il pannello statistiche mostra in tempo reale:

- **Ordini Totali**: Numero totale di ordini filtrati
- **In Profitto**: Numero e percentuale ordini con margine positivo
- **In Perdita**: Numero e percentuale ordini con margine negativo
- **Margine Totale**: Somma di tutti i margini (positivo/negativo)
- **Valore Ordini**: Valore totale dei ricavi

### Tabella Ordini

La tabella mostra:

- **Righe Padre** (ordini): Aggregato di tutte le spedizioni
- **Righe Figlie** (spedizioni): Dettaglio di ogni singola spedizione/tracking

**Colonne:**
- ID Ordine + Data
- Marketplace
- Cliente
- Tracking Number
- Valore Prodotto
- Valore Spedizione
- Sconti
- Totale Incassato
- Costo Prodotto (con indicatore OK/KO)
- Costo Spedizione (con indicatore OK/KO)
- **Commissioni** (nuovo campo)
- Totale Costi
- Margine (valore + percentuale)

**Interazioni:**
- Clicca sull'icona ▶/▼ per espandere/comprimere le spedizioni
- Usa i pulsanti "Espandi tutti" / "Collassa tutti" per gestire tutte le righe

### Esportazione

Esporta i dati filtrati in:

- **CSV**: Per analisi con Excel/Google Sheets
- **Excel (.xlsx)**: Con formattazione avanzata

I file esportati includono tutte le colonne e le spedizioni.

### Paginazione

Naviga tra le pagine con:
- Pulsanti "Precedente" / "Successiva"
- Indicatore pagina corrente e totale
- Numero totale ordini

## Architettura

### Pattern e Best Practices

- **Custom Hooks**: Logica riutilizzabile per API calls
- **TypeScript**: Type-safety completa
- **Separation of Concerns**: Componenti, hooks, services e utilities separati
- **Error Handling**: Gestione errori centralizzata
- **Loading States**: Feedback visivo per operazioni asincrone
- **Responsive Design**: Mobile-first con breakpoints

### API Integration

Tutte le chiamate API sono gestite tramite:

1. **api.service.ts**: Client Axios configurato con interceptors
2. **Custom Hooks**: `useOrders`, `useFilterOptions`, `useExport`
3. **Type Safety**: Ogni response è tipizzata con TypeScript

### Calcoli Margini

I calcoli sono gestiti da `utils/calculations.ts`:

```typescript
// Margine in valore
margin.value = revenue.total - costs.total

// Margine percentuale
margin.percentage = (margin.value / revenue.total) * 100
```

Dove:
- `revenue.total = productValue + shippingValue - discounts`
- `costs.total = productCost + shippingCost + commissions`

### Commissioni

Le commissioni sono calcolate come:

```typescript
commissions = (productValue × marketplaceRate) + (total × paymentGatewayRate) + fixedFee
```

Esempio:
- Amazon: 15% sul valore prodotto
- PayPal: 2.9% + €0.30 sul totale
- **Commissione totale** = inclusa nel campo "Commissioni"

## Scripts Disponibili

```bash
# Sviluppo
npm run dev          # Avvia dev server

# Build
npm run build        # Build per produzione
npm run preview      # Preview build locale

# Linting
npm run lint         # ESLint check
```

## Tecnologie Utilizzate

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool e dev server
- **Axios**: HTTP client
- **CSS Modules**: Styling isolato
- **ESLint**: Linting

## Browser Supportati

- Chrome/Edge: ultime 2 versioni
- Firefox: ultime 2 versioni
- Safari: ultime 2 versioni
- Mobile browsers: iOS Safari, Chrome Android

## Troubleshooting

### L'applicazione non si connette all'API

1. Verifica che il backend sia in esecuzione
2. Controlla `VITE_API_BASE_URL` in `.env`
3. Verifica CORS sul backend
4. Controlla la console del browser per errori

### Errore 401 Unauthorized

1. Verifica di aver effettuato il login
2. Controlla che il token JWT sia valido
3. Il token potrebbe essere scaduto - effettua nuovamente il login

### I dati non vengono caricati

1. Verifica che il backend restituisca dati nel formato corretto (vedi `docs/API.md`)
2. Controlla la console per errori di validazione TypeScript
3. Verifica i filtri applicati

### Build fallisce

1. Cancella `node_modules` e reinstalla: `rm -rf node_modules && npm install`
2. Verifica la versione di Node.js: `node --version`
3. Cancella la cache: `rm -rf dist .vite`

## Contribuire

Per contribuire al progetto:

1. Fork del repository
2. Crea un branch per la tua feature: `git checkout -b feature/nome-feature`
3. Commit delle modifiche: `git commit -m 'Add: descrizione'`
4. Push al branch: `git push origin feature/nome-feature`
5. Apri una Pull Request

## Roadmap Future

- [ ] Grafici e dashboard
- [ ] Filtri salvati
- [ ] Confronto periodi
- [ ] Alert automatici per ordini in perdita
- [ ] Multi-lingua
- [ ] Dark mode
- [ ] PDF export
- [ ] API per aggiornamento costi

## Licenza

[Inserire licenza]

## Contatti

Per domande o supporto:
- Email: [inserire email]
- Issues: [inserire URL issues GitHub]

---

**Versione**: 1.0.0
**Data Release**: 2025-01-29
**Autore**: [Inserire autore]
