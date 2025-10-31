# 📊 Analisi Margine Preliminare Ordini

Sistema completo di analisi del margine preliminare degli ordini con **React + TypeScript + Vite + Tailwind CSS**.

## 🚀 Deploy su Lovable (Consigliato)

**Lovable** (https://lovable.dev) è una piattaforma che permette di deployare applicazioni React istantaneamente con hosting gratuito.

### Metodo 1: Import da GitHub

1. **Push questo codice su GitHub** (se non l'hai già fatto)

2. **Vai su Lovable**: https://lovable.dev

3. **Crea nuovo progetto**:
   - Click su "Import from GitHub"
   - Seleziona il repository `MARGINE-PRELIMINARE`
   - Seleziona la cartella `react-app/`
   - Click su "Import"

4. **Lovable farà automaticamente**:
   - ✅ Install delle dipendenze
   - ✅ Build del progetto
   - ✅ Deploy online
   - ✅ Fornisce URL pubblico

5. **La tua app sarà online in 2-3 minuti!** 🎉

### Metodo 2: Copy-Paste del codice

1. **Vai su Lovable**: https://lovable.dev
2. **Crea nuovo progetto** → "Blank React Project"
3. **Copia i file** uno per uno da questa cartella
4. **Lovable auto-deploya** ogni modifica

## 🎯 Caratteristiche

### Frontend (React + TypeScript)
- ✅ **React 18** con TypeScript
- ✅ **Vite** per build veloce
- ✅ **Tailwind CSS** per styling moderno
- ✅ **Mock Data** integrati (5 ordini di esempio)
- ✅ **Responsive Design** per mobile/tablet/desktop

### Funzionalità
- 🔍 **Filtri dinamici** (9 filtri diversi)
- 📋 **Tabella gerarchica** con expand/collapse
- 📈 **Statistiche real-time** (6 metriche)
- 🎨 **Colori intuitivi** (verde/rosso/grigio per margini)
- ✅ **Badges OK/KO** per validazione costi
- 💰 **Campo Commissioni** incluso nei costi

## 📦 Installazione Locale

Se vuoi eseguirlo in locale:

```bash
# Installa dipendenze
npm install

# Esegui in development
npm run dev

# Build per produzione
npm run build

# Preview della build
npm run preview
```

L'app sarà disponibile su: http://localhost:3000

## 🏗️ Struttura Progetto

```
react-app/
├── src/
│   ├── components/
│   │   ├── Filters.tsx          # Componente filtri
│   │   ├── OrdersTable.tsx      # Tabella ordini gerarchica
│   │   └── Statistics.tsx       # Pannello statistiche
│   ├── types.ts                 # TypeScript types
│   ├── mockData.ts              # Dati mock (5 ordini)
│   ├── App.tsx                  # Componente principale
│   ├── main.tsx                 # Entry point
│   └── index.css                # Tailwind + custom styles
│
├── package.json                 # Dipendenze
├── vite.config.ts              # Configurazione Vite
├── tailwind.config.js          # Configurazione Tailwind
├── tsconfig.json               # Configurazione TypeScript
└── index.html                  # HTML template
```

## 📊 Dati Mock Inclusi

Il sistema include 5 ordini di test:

| ID      | Marketplace | Cliente        | Data       | Margine   | C.Prod | C.Sped |
|---------|-------------|----------------|------------|-----------|--------|--------|
| ORD-001 | Amazon      | Mario Rossi    | 15/01/2024 | +€46.50   | ✅ OK  | ✅ OK  |
| ORD-002 | eBay        | Laura Bianchi  | 18/01/2024 | -€21.68   | ❌ KO  | ✅ OK  |
| ORD-003 | Sito Web    | Giuseppe Verdi | 20/01/2024 | €0.00     | ✅ OK  | ✅ OK  |
| ORD-004 | Amazon      | Anna Ferrari   | 22/01/2024 | +€72.00   | ✅ OK  | ✅ OK  |
| ORD-005 | eBay        | Marco Gialli   | 25/01/2024 | -€27.68   | ✅ OK  | ❌ KO  |

### Formule di Calcolo

```
Incassato = Valore Prodotto + Valore Spedizione - Sconti
Costi Totali = Costo Prodotto + Costo Spedizione + Commissioni
Margine (€) = Incassato - Costi Totali
Margine (%) = (Margine / Incassato) × 100
```

**✨ NOVITÀ**: Campo **Commissioni** aggiunto ai costi!

## 🎨 Personalizzazione

### Modificare i Dati Mock

Apri `src/mockData.ts` e modifica l'array `mockOrders`:

```typescript
export const mockOrders: Order[] = [
  {
    id: 'ORD-999',
    marketplace: 'Amazon',
    customerName: 'Il Tuo Cliente',
    orderDate: '2024-02-01',
    // ... altri campi
  }
];
```

### Modificare i Colori

Apri `src/components/OrdersTable.tsx` e modifica `getRowClass()`:

```typescript
const getRowClass = (margin: number, isShipment: boolean = false): string => {
  if (margin > 0) return isShipment ? 'bg-green-50' : 'bg-green-100';
  if (margin < 0) return isShipment ? 'bg-red-50' : 'bg-red-100';
  return isShipment ? 'bg-gray-50' : 'bg-gray-100';
};
```

### Aggiungere Nuove Colonne

1. Apri `src/types.ts` e aggiungi il campo al type `Order`
2. Apri `src/mockData.ts` e aggiungi il valore ai dati mock
3. Apri `src/components/OrdersTable.tsx` e aggiungi la colonna

## 🌐 Alternative di Deploy

### Vercel (Gratuito)

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Netlify (Gratuito)

```bash
# Installa Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

### GitHub Pages (Gratuito)

1. Modifica `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/MARGINE-PRELIMINARE/',
  plugins: [react()],
})
```

2. Aggiungi script in `package.json`:
```json
{
  "scripts": {
    "deploy": "vite build && gh-pages -d dist"
  }
}
```

3. Deploy:
```bash
npm run deploy
```

## 🔌 Integrare API Reali

Per connettere a un backend reale, crea un servizio API:

```typescript
// src/services/api.ts
const API_URL = 'https://your-api.com';

export const fetchOrders = async (filters: OrderFilters): Promise<Order[]> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters)
  });
  return response.json();
};
```

Poi in `App.tsx`:

```typescript
import { fetchOrders } from './services/api';

// Sostituisci mockOrders con:
useEffect(() => {
  fetchOrders(filters).then(setFilteredOrders);
}, [filters]);
```

## 📱 Responsive Design

L'applicazione è completamente responsive:

- **Desktop** (>1200px): Layout completo con pannello statistiche a destra
- **Tablet** (768px-1200px): Layout adattato con colonne ridotte
- **Mobile** (<768px): Layout a colonna singola con scroll orizzontale per tabella

## 🐛 Troubleshooting

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"
Modifica `vite.config.ts`:
```typescript
server: { port: 3001 }
```

### Build fallisce
```bash
npm run build -- --debug
```

### Lovable non importa il progetto
- Verifica che il repository sia pubblico
- Assicurati che `package.json` sia nella root della cartella
- Prova a importare manualmente i file

## 📚 Documentazione

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Lovable**: https://lovable.dev/docs

## ✨ Vantaggi di questa Soluzione

✅ **React moderno** - Hooks, TypeScript, performance ottimali
✅ **Vite** - Build ultra-veloce (10x più veloce di CRA)
✅ **Tailwind CSS** - Styling utility-first, nessun CSS custom
✅ **Mock Data** - Test immediato senza backend
✅ **Lovable Ready** - Deploy in 2 minuti con hosting gratuito
✅ **Responsive** - Funziona su tutti i dispositivi
✅ **Type-Safe** - TypeScript previene errori a runtime
✅ **Modular** - Componenti riutilizzabili e manutenibili

## 🎉 Quick Start per Lovable

1. **Push su GitHub**:
   ```bash
   git add react-app/
   git commit -m "Add React app for Lovable"
   git push
   ```

2. **Vai su Lovable**: https://lovable.dev

3. **Import da GitHub** → Seleziona repo → Seleziona `react-app/`

4. **Attendi 2-3 minuti** ☕

5. **App online!** 🎉 Lovable ti darà un URL tipo: `https://your-app.lovable.app`

---

**Pronto per il deploy? Vai su Lovable e metti online la tua app in 2 minuti! 🚀**
