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
import { TrendingUp } from 'lucide-react'

// Nell'array MODULES, aggiungere:
{
  slug: 'margine-preliminare',
  name: 'Margine Preliminare',
  category: 'ordini',
  path: '/margine-preliminare',
  icon: TrendingUp,
  description: 'Analisi margine operativo lordo preliminare ordini.',
  color: {
    gradient: 'from-emerald-500 to-emerald-700',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    hoverBorder: 'hover:border-emerald-400',
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

Trovare l'UUID di Gaetano Simonetti nella tabella `users`:
```sql
SELECT id, email, name FROM users WHERE name ILIKE '%gaetano%simonetti%';
```

Poi assegnare il permesso **full** (unico utente che può modificare):
```sql
INSERT INTO app_permissions (user_id, app_slug, level)
VALUES ('UUID_DI_GAETANO', 'margine-preliminare', 'full');
```

Per tutti gli altri utenti che devono **solo visualizzare**:
```sql
INSERT INTO app_permissions (user_id, app_slug, level)
VALUES ('UUID_UTENTE', 'margine-preliminare', 'readonly');
```

Oppure, per dare readonly a tutti gli utenti in un colpo solo:
```sql
INSERT INTO app_permissions (user_id, app_slug, level)
SELECT id, 'margine-preliminare', 'readonly'
FROM users
WHERE id != 'UUID_DI_GAETANO';
```

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
- Il servizio Supabase importa da `../../../lib/supabase` (client condiviso oneh-solutions)
