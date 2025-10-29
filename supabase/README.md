# 🗄️ Setup Database Supabase

Guida completa per configurare il database Supabase e testare i filtri con dati reali.

## 📋 Prerequisiti

1. **Account Supabase** - Crea gratuitamente su https://supabase.com
2. **Progetto Supabase** - Crea un nuovo progetto

## 🚀 Setup Rapido (5 minuti)

### **Passo 1: Crea il Progetto Supabase**

1. Vai su https://supabase.com
2. Click su **"New project"**
3. Scegli un nome (es. "order-margin-analysis")
4. Scegli una password per il database
5. Scegli la region più vicina (es. Europe West)
6. Click su **"Create new project"**
7. **Aspetta 2 minuti** per il provisioning

### **Passo 2: Esegui lo Schema SQL**

1. Nel dashboard Supabase, vai su **SQL Editor** (icona </> nel menu laterale)
2. Click su **"New query"**
3. Copia e incolla il contenuto del file `schema.sql`
4. Click su **"Run"** (o premi Ctrl+Enter)
5. ✅ Vedrai: "Success. No rows returned"

### **Passo 3: Inserisci i Dati di Esempio**

1. Sempre nel **SQL Editor**, click su **"New query"**
2. Copia e incolla il contenuto del file `seed.sql`
3. Click su **"Run"**
4. ✅ Vedrai: "Success. 5 rows affected"

### **Passo 4: Verifica i Dati**

1. Vai su **Table Editor** (icona tabella nel menu)
2. Seleziona la tabella `orders`
3. Dovresti vedere **5 ordini**:
   - ORD-001: Amazon, +€46.50
   - ORD-002: eBay, -€21.68
   - ORD-003: Sito Web, €0.00
   - ORD-004: Amazon, +€72.00
   - ORD-005: eBay, -€27.68

### **Passo 5: Ottieni le Credenziali**

1. Vai su **Settings** (⚙️) → **API**
2. Copia queste 2 informazioni:

**Project URL:**
```
https://xxxxxxxxxxxxx.supabase.co
```

**anon public (API Key):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Passo 6: Configura l'App**

Crea/modifica il file `.env` nella root del progetto:

```env
# Modalità dati: 'mock' | 'supabase' | 'api'
VITE_DATA_SOURCE=supabase

# Credenziali Supabase
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Sostituisci** `xxxxxxxxxxxxx` con i tuoi valori copiati al Passo 5!

### **Passo 7: Avvia l'App**

```bash
# Installa dipendenze (se non fatto)
npm install

# Avvia dev server
npm run dev
```

Apri http://localhost:3000/ e vedrai:
- ✅ **5 ordini dal database Supabase**
- ✅ **Filtri funzionanti** (prova marketplace, corriere, etc.)
- ✅ **Statistiche in tempo reale**
- ✅ **Ricerca funzionante** (cerca "Mario")

---

## 🎯 Test dei Filtri

Ora puoi testare tutti i filtri con dati reali:

### **1. Filtro Marketplace**
- Seleziona "Amazon" → Vedrai ORD-001 e ORD-004
- Seleziona "eBay" → Vedrai ORD-002 e ORD-005
- Seleziona "Sito Web" → Vedrai ORD-003

### **2. Filtro Corriere**
- Seleziona "DHL" → Vedrai ORD-001
- Seleziona "UPS" → Vedrai ORD-002
- Seleziona "BRT" → Vedrai ORD-004

### **3. Filtro Costi**
- Costo Prodotto "KO" → Vedrai ORD-002
- Costo Spedizione "KO" → Vedrai ORD-002 e ORD-005
- Costo Prodotto "OK" → Vedrai ORD-001, ORD-003, ORD-004, ORD-005

### **4. Ricerca Testuale**
- Cerca "Mario" → Vedrai ORD-001
- Cerca "ORD-004" → Vedrai ORD-004
- Cerca "Gialli" → Vedrai ORD-005

### **5. Filtro Date**
- Data Da: 2025-01-17 → Vedrai ORD-003, ORD-004, ORD-005
- Data A: 2025-01-16 → Vedrai ORD-001, ORD-002

---

## 📊 Struttura Database

### **Tabella: orders**
| Campo | Tipo | Descrizione |
|-------|------|-------------|
| id | TEXT | ID univoco ordine |
| marketplace | TEXT | Amazon, eBay, Sito Web |
| customer_name | TEXT | Nome cliente |
| order_date | TIMESTAMPTZ | Data ordine |
| fulfillment_date | TIMESTAMPTZ | Data evasione |
| supplier | TEXT | Fornitore |
| warehouse | TEXT | Magazzino |
| courier | TEXT | Corriere |
| product_value | DECIMAL | Valore prodotti |
| shipping_value | DECIMAL | Valore spedizione |
| discounts | DECIMAL | Sconti |
| revenue_total | DECIMAL | Totale incassato |
| product_cost | DECIMAL | Costo prodotti |
| shipping_cost | DECIMAL | Costo spedizione |
| **commissions** | DECIMAL | **Commissioni** ✨ |
| costs_total | DECIMAL | Totale costi |
| margin_value | DECIMAL | Margine in € |
| margin_percentage | DECIMAL | Margine in % |
| has_valid_product_costs | BOOLEAN | Costi prodotto validi |
| has_valid_shipping_costs | BOOLEAN | Costi spedizione validi |

### **Tabella: shipments**
Stessa struttura di `orders` ma con:
- `order_id` (riferimento a orders)
- `tracking_number`
- `quantity`

---

## 🔧 Configurazioni Avanzate

### **Cambiare Modalità Dati**

Nel file `.env`:

```env
# Mock data (dati hardcoded)
VITE_DATA_SOURCE=mock

# Supabase (database cloud)
VITE_DATA_SOURCE=supabase

# API custom (tuo backend)
VITE_DATA_SOURCE=api
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### **Aggiungere Nuovi Ordini**

Nel SQL Editor di Supabase:

```sql
-- Aggiungi un nuovo ordine
INSERT INTO orders (
    id, marketplace, customer_name, order_date,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage
) VALUES (
    'ORD-006', 'Amazon', 'Test User', NOW(),
    100.00, 10.00, 0.00, 110.00,
    70.00, 8.00, 11.00, 89.00,
    21.00, 19.09
);

-- Aggiungi la spedizione
INSERT INTO shipments (
    id, order_id, tracking_number, marketplace, customer_name,
    product_value, shipping_value, discounts, revenue_total,
    product_cost, shipping_cost, commissions, costs_total,
    margin_value, margin_percentage
) VALUES (
    'ORD-006-1', 'ORD-006', 'TRK006', 'Amazon', 'Test User',
    100.00, 10.00, 0.00, 110.00,
    70.00, 8.00, 11.00, 89.00,
    21.00, 19.09
);
```

Ricarica l'app e vedrai il nuovo ordine!

---

## 🔒 Sicurezza

**⚠️ Per la demo, il database è pubblico in lettura.**

Per produzione:
1. Vai su **Authentication** → **Policies**
2. Modifica le policy per richiedere autenticazione
3. Implementa login con Supabase Auth

---

## 🐛 Troubleshooting

### **"Missing Supabase credentials"**
- Verifica di aver configurato `.env` correttamente
- Controlla che `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` siano corretti
- Riavvia il dev server: `npm run dev`

### **"No data returned"**
- Verifica che le tabelle esistano in Supabase (Table Editor)
- Controlla che i dati seed siano stati inseriti (dovresti vedere 5 ordini)
- Verifica le RLS policies (devono permettere SELECT)

### **I filtri non funzionano**
- Apri la Console del browser (F12)
- Guarda la tab Network per vedere le query Supabase
- Controlla eventuali errori nella Console

---

## ✅ Checklist Completa

- [ ] Account Supabase creato
- [ ] Progetto Supabase creato
- [ ] Schema SQL eseguito (`schema.sql`)
- [ ] Dati seed inseriti (`seed.sql`)
- [ ] 5 ordini visibili nel Table Editor
- [ ] Credenziali copiate (URL + API Key)
- [ ] File `.env` configurato
- [ ] `npm install` eseguito
- [ ] App avviata con `npm run dev`
- [ ] Ordini visualizzati nell'interfaccia
- [ ] Filtri testati e funzionanti

---

## 🎉 Complimenti!

Hai configurato con successo il database Supabase! Ora puoi:
- ✅ Testare tutti i filtri con dati reali
- ✅ Aggiungere nuovi ordini via SQL
- ✅ Vedere le statistiche aggiornarsi in tempo reale
- ✅ Integrare con un backend vero quando pronto

**Prossimi passi:**
- Aggiungi più ordini per testare la paginazione
- Implementa l'autenticazione
- Crea API per inserimento/modifica ordini
