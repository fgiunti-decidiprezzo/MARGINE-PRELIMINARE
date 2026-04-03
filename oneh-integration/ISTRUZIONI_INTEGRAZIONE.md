# Integrazione Margine Preliminare in oneh-solutions

## Passaggi

### 1. Copiare i file

Copiare le cartelle nella root di oneh-solutions:

```
oneh-integration/src/modules/margine-preliminare/  →  src/modules/margine-preliminare/
oneh-integration/migrations/015_margine_preliminare.sql  →  migrations/015_margine_preliminare.sql
oneh-integration/api/margine-preliminare/  →  api/margine-preliminare/
```

### 2. Registrare nel Module Registry

Aprire `src/config/modules.js` e aggiungere:

```js
// In cima, aggiungere l'import dell'icona:
import { Calculator } from 'lucide-react'

// Nell'array MODULES, aggiungere:
{
  slug: 'margine-preliminare',
  name: 'Controllo Marginalità Vendite',
  category: 'admin',
  path: '/margine-preliminare',
  icon: Calculator,
  description: 'Analisi margine operativo lordo preliminare ordini.',
  color: {
    gradient: 'from-cyan-500 to-cyan-700',
    bg: 'bg-cyan-50',
    text: 'text-cyan-700',
    border: 'border-cyan-200',
    hoverBorder: 'hover:border-cyan-400',
  },
  component: () => import('../modules/margine-preliminare/MarginePreliminareApp'),
},
```

### 3. Eseguire la migration SQL

Aprire Supabase SQL Editor ed eseguire il contenuto di:
```
migrations/015_margine_preliminare.sql
```

### 4. Configurare i permessi

I permessi sono inclusi nella migration SQL (eseguita automaticamente):
- **Gaetano Simonetti** (`f8dffb65-9ae8-43a4-9139-d5466ceb0dc9`) → `full`
- **Tutti gli altri** → `readonly`

### 5. Deploy

```bash
git add .
git commit -m "feat: add margine-preliminare app module"
git push origin main
```

Il deploy su Vercel partirà automaticamente.

## Struttura file creati

```
src/modules/margine-preliminare/
├── MarginePreliminareApp.jsx       # Componente principale (entry point)
├── components/
│   ├── Filters.jsx                 # Filtri ricerca (date, fornitore, corriere, etc.)
│   ├── Statistics.jsx              # Statistiche aggregate (profitto/perdita)
│   └── OrderTable.jsx              # Tabella gerarchica ordini → spedizioni
├── hooks/
│   ├── useOrders.js                # Hook fetch ordini + paginazione
│   ├── useFilterOptions.js         # Hook opzioni filtri
│   └── useExport.js                # Hook esportazione CSV/Excel
└── services/
    ├── supabase.js                 # Query Supabase (mp_orders, mp_shipments)
    └── calculations.js             # Utility formattazione valuta/date/margini

api/margine-preliminare/
└── export.js                       # Serverless function esportazione CSV

migrations/
└── 015_margine_preliminare.sql     # Schema DB + seed data + permessi
```

## Note tecniche

- Le tabelle DB hanno prefisso `mp_` per evitare conflitti con tabelle esistenti
- Il componente usa `useAuth()` e `usePermissions()` dal sistema auth oneh-solutions
- Permessi: `canEdit` controlla se mostrare i pulsanti export (solo per level `full`)
- I dati usano nomi colonna snake_case (standard Supabase), NON camelCase
- Il servizio Supabase crea il client localmente (pattern `occasioni/lib/supabase.js`)
