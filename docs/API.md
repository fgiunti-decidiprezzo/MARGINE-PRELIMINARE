# API Documentation - Sistema Analisi Margine Operativo

Documentazione completa delle API REST per il sistema di analisi del margine operativo preliminare.

**Base URL:** `http://localhost:8000/api/v1`

---

## Indice

1. [Autenticazione](#autenticazione)
2. [Ordini](#ordini)
   - [GET /orders](#get-orders) - Lista ordini con filtri
   - [GET /orders/:id](#get-ordersid) - Dettaglio ordine
   - [GET /orders/statistics](#get-ordersstatistics) - Statistiche aggregate
3. [Opzioni Filtri](#opzioni-filtri)
   - [GET /filter-options](#get-filter-options) - Opzioni per i filtri
4. [Esportazione](#esportazione)
   - [POST /orders/export](#post-ordersexport) - Esporta dati in CSV/Excel
5. [Errori](#gestione-errori)

---

## Autenticazione

Tutte le richieste API richiedono un token JWT nell'header `Authorization`.

```http
Authorization: Bearer {token}
```

### Ottenere un token

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-123",
    "email": "user@example.com",
    "name": "Mario Rossi"
  }
}
```

---

## Ordini

### GET /orders

Recupera la lista degli ordini con filtri e paginazione.

**Endpoint:** `GET /api/v1/orders`

#### Query Parameters

| Parametro | Tipo | Obbligatorio | Descrizione |
|-----------|------|--------------|-------------|
| `page` | integer | No | Numero di pagina (default: 1) |
| `pageSize` | integer | No | Elementi per pagina (default: 50, max: 200) |
| `searchQuery` | string | No | Ricerca in ordine, cliente, tracking |
| `dateFrom` | string | No | Data inizio (formato: YYYY-MM-DD) |
| `dateTo` | string | No | Data fine (formato: YYYY-MM-DD) |
| `supplier` | string | No | Nome fornitore |
| `fulfillmentDate` | string | No | Data di evasione (formato: YYYY-MM-DD) |
| `warehouse` | string | No | Nome magazzino/centro logistico |
| `courier` | string | No | Nome corriere |
| `productCostStatus` | string | No | Stato costi prodotto: `ok` o `ko` |
| `shippingCostStatus` | string | No | Stato costi spedizione: `ok` o `ko` |
| `marketplace` | string | No | Marketplace (Amazon, eBay, Sito Web, ecc.) |

#### Esempio Request

```http
GET /api/v1/orders?page=1&pageSize=20&dateFrom=2024-01-01&dateTo=2024-01-31&productCostStatus=ok
Authorization: Bearer {token}
```

#### Response (200 OK)

```json
{
  "orders": [
    {
      "id": "ORD-001",
      "marketplace": "Amazon",
      "customerName": "Mario Rossi",
      "orderDate": "2024-01-15T10:30:00Z",
      "fulfillmentDate": "2024-01-16T14:20:00Z",
      "supplier": "Fornitore A",
      "warehouse": "Magazzino A",
      "courier": "DHL",
      "revenue": {
        "productValue": 250.00,
        "shippingValue": 15.00,
        "discounts": 0.00,
        "total": 265.00
      },
      "costs": {
        "productCost": 180.00,
        "shippingCost": 12.00,
        "commissions": 26.50,
        "total": 218.50
      },
      "margin": {
        "value": 46.50,
        "percentage": 17.55
      },
      "shipments": [
        {
          "id": "ORD-001-1",
          "orderId": "ORD-001",
          "trackingNumber": "TRK001234567",
          "marketplace": "Amazon",
          "customerName": "Mario Rossi",
          "quantity": 1,
          "revenue": {
            "productValue": 120.00,
            "shippingValue": 8.00,
            "discounts": 0.00,
            "total": 128.00
          },
          "costs": {
            "productCost": 85.00,
            "shippingCost": 6.00,
            "commissions": 12.80,
            "total": 103.80
          },
          "margin": {
            "value": 24.20,
            "percentage": 18.91
          },
          "hasValidProductCost": true,
          "hasValidShippingCost": true
        },
        {
          "id": "ORD-001-2",
          "orderId": "ORD-001",
          "trackingNumber": "TRK001234568",
          "marketplace": "Amazon",
          "customerName": "Mario Rossi",
          "quantity": 1,
          "revenue": {
            "productValue": 130.00,
            "shippingValue": 7.00,
            "discounts": 0.00,
            "total": 137.00
          },
          "costs": {
            "productCost": 95.00,
            "shippingCost": 6.00,
            "commissions": 13.70,
            "total": 114.70
          },
          "margin": {
            "value": 22.30,
            "percentage": 16.28
          },
          "hasValidProductCost": true,
          "hasValidShippingCost": true
        }
      ],
      "hasValidProductCosts": true,
      "hasValidShippingCosts": true
    }
  ],
  "statistics": {
    "totalOrders": 150,
    "profitableOrders": 120,
    "profitablePercentage": 80.0,
    "losingOrders": 30,
    "losingPercentage": 20.0,
    "totalMargin": 15678.50,
    "totalRevenue": 125430.00,
    "totalCosts": 109751.50,
    "averageMarginPercentage": 12.5
  },
  "pagination": {
    "total": 150,
    "page": 1,
    "pageSize": 20,
    "totalPages": 8
  }
}
```

#### Campi Response

**Order Object:**
- `id`: ID univoco dell'ordine
- `marketplace`: Piattaforma di vendita
- `customerName`: Nome del cliente
- `orderDate`: Data e ora di creazione dell'ordine (ISO 8601)
- `fulfillmentDate`: Data e ora di evasione (ISO 8601, può essere null)
- `supplier`: Nome del fornitore
- `warehouse`: Magazzino/centro logistico
- `courier`: Corriere utilizzato
- `revenue`: Oggetto con i valori incassati
  - `productValue`: Valore prodotti venduti
  - `shippingValue`: Valore spedizione addebitata
  - `discounts`: Sconti applicati
  - `total`: Totale incassato (productValue + shippingValue - discounts)
- `costs`: Oggetto con i costi sostenuti
  - `productCost`: Costo di acquisto prodotti
  - `shippingCost`: Costo effettivo spedizione
  - `commissions`: Commissioni totali (marketplace + payment gateway)
  - `total`: Totale costi
- `margin`: Margine operativo
  - `value`: Margine in euro (revenue.total - costs.total)
  - `percentage`: Margine percentuale ((margin.value / revenue.total) * 100)
- `shipments`: Array di spedizioni (struttura simile a Order)
- `hasValidProductCosts`: Indica se tutti i costi prodotto sono validi
- `hasValidShippingCosts`: Indica se tutti i costi spedizione sono validi

**Statistics Object:**
- `totalOrders`: Numero totale ordini
- `profitableOrders`: Numero ordini in profitto (margin.value > 0)
- `profitablePercentage`: Percentuale ordini in profitto
- `losingOrders`: Numero ordini in perdita (margin.value < 0)
- `losingPercentage`: Percentuale ordini in perdita
- `totalMargin`: Somma di tutti i margini
- `totalRevenue`: Somma di tutti i ricavi
- `totalCosts`: Somma di tutti i costi
- `averageMarginPercentage`: Media delle percentuali di margine

---

### GET /orders/:id

Recupera il dettaglio di un singolo ordine.

**Endpoint:** `GET /api/v1/orders/:id`

#### Path Parameters

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `id` | string | ID dell'ordine |

#### Esempio Request

```http
GET /api/v1/orders/ORD-001
Authorization: Bearer {token}
```

#### Response (200 OK)

Restituisce un singolo oggetto Order (stessa struttura di GET /orders).

```json
{
  "id": "ORD-001",
  "marketplace": "Amazon",
  "customerName": "Mario Rossi",
  ...
}
```

#### Errori

- `404 Not Found`: Ordine non trovato

---

### GET /orders/statistics

Recupera solo le statistiche aggregate senza la lista degli ordini.

**Endpoint:** `GET /api/v1/orders/statistics`

#### Query Parameters

Accetta gli stessi filtri di `GET /orders` (esclusi page e pageSize).

#### Esempio Request

```http
GET /api/v1/orders/statistics?dateFrom=2024-01-01&dateTo=2024-01-31
Authorization: Bearer {token}
```

#### Response (200 OK)

```json
{
  "totalOrders": 150,
  "profitableOrders": 120,
  "profitablePercentage": 80.0,
  "losingOrders": 30,
  "losingPercentage": 20.0,
  "totalMargin": 15678.50,
  "totalRevenue": 125430.00,
  "totalCosts": 109751.50,
  "averageMarginPercentage": 12.5
}
```

---

## Opzioni Filtri

### GET /filter-options

Recupera le opzioni disponibili per i filtri (fornitori, magazzini, corrieri, marketplace).

**Endpoint:** `GET /api/v1/filter-options`

#### Esempio Request

```http
GET /api/v1/filter-options
Authorization: Bearer {token}
```

#### Response (200 OK)

```json
{
  "suppliers": [
    "Fornitore A",
    "Fornitore B",
    "Fornitore C"
  ],
  "warehouses": [
    "Magazzino A",
    "Magazzino B",
    "Magazzino C"
  ],
  "couriers": [
    "DHL",
    "UPS",
    "GLS",
    "BRT",
    "SDA"
  ],
  "marketplaces": [
    "Amazon",
    "eBay",
    "Sito Web",
    "Shopify"
  ]
}
```

---

## Esportazione

### POST /orders/export

Esporta i dati degli ordini in formato CSV o Excel.

**Endpoint:** `POST /api/v1/orders/export`

#### Request Body

```json
{
  "format": "csv",
  "filters": {
    "dateFrom": "2024-01-01",
    "dateTo": "2024-01-31",
    "productCostStatus": "ok"
  },
  "includeShipments": true
}
```

#### Parametri

- `format`: Formato di esportazione (`csv` o `xlsx`)
- `filters`: Oggetto con gli stessi filtri di GET /orders
- `includeShipments`: Se true, include le righe delle spedizioni

#### Response (200 OK)

Restituisce un file binario con gli header appropriati:

```http
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="ordini_2024-01-01_2024-01-31.csv"
```

**Struttura CSV:**

```csv
ID Ordine,Marketplace,Cliente,Data Ordine,Val. Prodotto,Val. Spedizione,Sconti,Tot. Incassato,Costo Prod.,Costo Sped.,Commissioni,Tot. Costi,Margine,Margine %
ORD-001,Amazon,Mario Rossi,2024-01-15,250.00,15.00,0.00,265.00,180.00,12.00,26.50,218.50,46.50,17.55
```

---

## Gestione Errori

Tutte le API restituiscono errori nel seguente formato:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Descrizione dell'errore",
    "details": {
      "field": "Campo che ha causato l'errore"
    }
  }
}
```

### Codici di Errore Comuni

| Codice HTTP | Error Code | Descrizione |
|-------------|------------|-------------|
| 400 | INVALID_REQUEST | Parametri request non validi |
| 401 | UNAUTHORIZED | Token mancante o non valido |
| 403 | FORBIDDEN | Accesso negato alla risorsa |
| 404 | NOT_FOUND | Risorsa non trovata |
| 422 | VALIDATION_ERROR | Errore di validazione dati |
| 429 | RATE_LIMIT_EXCEEDED | Troppo richieste |
| 500 | INTERNAL_ERROR | Errore interno del server |
| 503 | SERVICE_UNAVAILABLE | Servizio temporaneamente non disponibile |

### Esempi di Errori

**401 Unauthorized:**
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Token JWT non valido o scaduto"
  }
}
```

**400 Invalid Request:**
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Parametri di ricerca non validi",
    "details": {
      "dateFrom": "Il formato della data deve essere YYYY-MM-DD"
    }
  }
}
```

**422 Validation Error:**
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validazione fallita",
    "details": {
      "pageSize": "Il valore deve essere tra 1 e 200"
    }
  }
}
```

---

## Rate Limiting

Le API implementano rate limiting per prevenire abusi:

- **Limite:** 100 richieste per minuto per utente
- **Header di risposta:**
  - `X-RateLimit-Limit`: Limite totale
  - `X-RateLimit-Remaining`: Richieste rimanenti
  - `X-RateLimit-Reset`: Timestamp Unix di reset

Quando il limite viene superato, viene restituito errore `429 Too Many Requests`.

---

## Note Implementative

### Calcolo Commissioni

Le commissioni includono:
1. **Commissioni Marketplace:** Percentuale sul valore del prodotto (es. Amazon ~15%, eBay ~10%)
2. **Commissioni Payment Gateway:** Percentuale sulla transazione (es. PayPal ~3%)
3. **Commissioni Fixed:** Fee fisse per transazione

**Formula esempio:**
```
commissions = (productValue * marketplaceRate) + (total * paymentGatewayRate) + fixedFee
```

### Calcolo Margine

**Margine in valore:**
```
margin.value = revenue.total - costs.total
```

**Margine percentuale:**
```
margin.percentage = (margin.value / revenue.total) * 100
```

### Aggregazione Ordini

Quando un ordine ha più spedizioni:
- I valori di `revenue`, `costs` e `margin` dell'ordine padre sono la somma dei valori delle spedizioni
- `hasValidProductCosts` è true solo se TUTTE le spedizioni hanno costi prodotto validi
- `hasValidShippingCosts` è true solo se TUTTE le spedizioni hanno costi spedizione validi

---

## Webhook (Opzionale)

Il sistema può inviare webhook quando vengono aggiornati i dati degli ordini.

**Endpoint configurabile dall'utente**

**Payload:**
```json
{
  "event": "order.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "orderId": "ORD-001",
    "changes": ["costs.productCost", "costs.commissions"]
  }
}
```

**Eventi disponibili:**
- `order.created`: Nuovo ordine creato
- `order.updated`: Ordine aggiornato
- `order.deleted`: Ordine eliminato
- `costs.updated`: Costi aggiornati

---

## Changelog API

### v1.0.0 (Corrente)
- Release iniziale
- Endpoint ordini con filtri completi
- Statistiche aggregate
- Esportazione CSV/Excel
- Campo commissioni aggiunto a tutti gli oggetti costi
