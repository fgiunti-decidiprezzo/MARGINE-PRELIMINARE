# Analisi Margine Preliminare Ordini - .NET 9 + Blazor Server

Sistema completo di analisi del margine preliminare degli ordini con **Backend ASP.NET Core** e **Frontend Blazor Server**, tutto in .NET 9.

## 🚀 Caratteristiche

### Backend (ASP.NET Core Web API)
- **RESTful API** con Swagger/OpenAPI
- **Mock Data Service** con 5 ordini di esempio
- **Filtri avanzati** via query parameters
- **Endpoint completi** per ordini, statistiche, e opzioni filtri

### Frontend (Blazor Server)
- **Blazor InteractiveServer** per UI reattiva
- **Componenti riutilizzabili** in C# + Razor
- **Real-time updates** senza JavaScript
- **Interfaccia responsiva** con CSS moderno

### Funzionalità
- ✅ Filtri dinamici (ricerca, date, marketplace, fornitore, etc.)
- ✅ Tabella gerarchica con expand/collapse
- ✅ Statistiche in tempo reale
- ✅ Colori intuitivi (verde/rosso/grigio per margini)
- ✅ Validazione costi (OK/KO badges)
- ✅ Campo **Commissioni** incluso nei costi
- ✅ Tutto in C#/.NET - nessun JavaScript necessario!

## 📋 Requisiti

### Software Necessario

1. **.NET 9 SDK**
   - Download: https://dotnet.microsoft.com/download/dotnet/9.0
   - Verificare installazione: `dotnet --version` (dovrebbe mostrare 9.x.x)

2. **IDE (scegli uno):**
   - **Visual Studio 2022** (v17.8+) con workload "ASP.NET and web development"
   - **Visual Studio Code** + C# Dev Kit extension
   - **JetBrains Rider** 2023.3+

3. **Browser moderno:**
   - Chrome, Edge, Firefox, Safari (ultimi 2 versioni)

## 📦 Setup e Installazione

### Opzione 1: Visual Studio 2022

1. **Apri la solution:**
   ```
   Doppio click su: dotnet-blazor/OrderMarginAnalysis.csproj
   ```

2. **Restore NuGet packages** (automatico al primo caricamento)

3. **Esegui l'applicazione:**
   - Premi `F5` (con debugging)
   - Oppure `Ctrl+F5` (senza debugging)

4. **Il browser si aprirà automaticamente** su `https://localhost:5001`

### Opzione 2: Visual Studio Code

1. **Apri la cartella:**
   ```bash
   cd dotnet-blazor
   code .
   ```

2. **Restore dependencies:**
   ```bash
   dotnet restore
   ```

3. **Esegui l'applicazione:**
   ```bash
   dotnet run
   ```

4. **Apri il browser** su `https://localhost:5001`

### Opzione 3: Command Line

```bash
# Naviga nella cartella del progetto
cd dotnet-blazor

# Restore packages
dotnet restore

# Build del progetto
dotnet build

# Esegui l'applicazione
dotnet run

# Output mostrerà: Now listening on: https://localhost:5001
# Apri browser su quell'indirizzo
```

## 🎯 Utilizzo dell'Applicazione

### Interfaccia Principale

L'applicazione si divide in 3 sezioni:

#### 1. **Pannello Filtri (In alto)**

Tutti i filtri sono dinamici e applicati in tempo reale:

- **Ricerca**: Cerca per ID ordine, nome cliente, o tracking number
- **Date**: Filtra per intervallo di date ordine (Da/A)
- **Marketplace**: Amazon, eBay, Sito Web
- **Fornitore**: Filtra per fornitore
- **Magazzino**: Filtra per magazzino
- **Corriere**: DHL, UPS, FedEx, BRT
- **Costo Prodotto**: OK (valido) o KO (non valido)
- **Costo Spedizione**: OK (valido) o KO (non valido)

Pulsanti:
- **🔍 Cerca**: Applica i filtri selezionati
- **↺ Reset**: Resetta tutti i filtri e ricarica dati originali

#### 2. **Tabella Ordini (Centro)**

- **Colori Righe**:
  - 🟢 **Verde chiaro**: Ordine in profitto (margine > 0)
  - 🔴 **Rosso chiaro**: Ordine in perdita (margine < 0)
  - ⚪ **Grigio**: Ordine a pareggio (margine = 0)

- **Expand/Collapse**: Click sulla freccia ▶/▼ per vedere spedizioni multiple

- **Badges OK/KO**: Colonne finali mostrano validazione costi:
  - 🟢 **OK**: Costo validato
  - 🟠 **KO**: Costo non validato

- **Formatazione**:
  - Valori monetari in Euro (€)
  - Percentuali con 2 decimali
  - Date in formato italiano (gg/mm/aaaa)

#### 3. **Pannello Statistiche (Destra)**

Aggiornato automaticamente quando applichi filtri:

- **Ordini Totali**: Numero ordini filtrati
- **In Profitto**: Ordini con margine positivo + percentuale
- **In Perdita**: Ordini con margine negativo + percentuale
- **Margine Totale**: Somma margini in Euro (evidenziato)
- **Incassato**: Totale ricavi
- **Costi Totali**: Somma costi (prodotto + spedizione + commissioni)

### Esempi di Test

#### Test 1: Visualizza tutti gli ordini
1. Apri l'applicazione (nessun filtro applicato)
2. **Risultato**: Vedrai tutti i 5 ordini mock
3. **Statistiche**: Margine totale €69.14, 2 profittevoli, 2 in perdita

#### Test 2: Filtra per marketplace Amazon
1. Seleziona "Amazon" nel dropdown Marketplace
2. Click su "🔍 Cerca"
3. **Risultato**: ORD-001 (+€46.50) e ORD-004 (+€72.00)
4. **Statistiche**: Margine totale €118.50, 100% profittevoli

#### Test 3: Trova ordini in perdita
1. Osserva le righe rosse: ORD-002 e ORD-005
2. Nessun filtro necessario, il colore indica la perdita

#### Test 4: Cerca cliente specifico
1. Digita "Mario" nel campo Ricerca
2. Click su "🔍 Cerca"
3. **Risultato**: ORD-001 (Mario Rossi) con €46.50 profitto

#### Test 5: Filtra per costi non validi
1. Seleziona "KO" nel dropdown "Costo Prodotto"
2. Click su "🔍 Cerca"
3. **Risultato**: ORD-002 (badge arancione KO)

## 📊 Dati di Esempio (Mock Data)

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

**✨ NOVITÀ**: Campo **Commissioni** aggiunto ai costi in questa versione!

## 🏗️ Struttura del Progetto

```
dotnet-blazor/
├── OrderMarginAnalysis.csproj       # Project file .NET 9
├── Program.cs                       # Entry point + Dependency Injection
├── appsettings.json                 # Configuration
│
├── Models/
│   └── OrderModels.cs               # Data models (Order, Shipment, Revenue, Costs, Margin)
│
├── Services/
│   └── MockDataService.cs           # Mock data + business logic
│
├── Controllers/
│   └── OrdersController.cs          # REST API endpoints
│
├── Components/
│   ├── App.razor                    # Root component
│   ├── Routes.razor                 # Routing configuration
│   ├── _Imports.razor               # Global using directives
│   │
│   ├── Layout/
│   │   └── MainLayout.razor         # Main layout
│   │
│   └── Pages/
│       └── Home.razor               # Main page (filters + table + stats)
│
└── wwwroot/
    └── css/
        └── app.css                  # Custom styles
```

## 🔌 API Endpoints

L'applicazione espone una REST API completa:

### Base URL: `https://localhost:5001/api`

#### 1. **GET** `/orders`
Ottieni ordini con filtri opzionali

**Query Parameters:**
- `searchQuery` (string): Ricerca in ID, cliente, tracking
- `dateFrom` (datetime): Data ordine da
- `dateTo` (datetime): Data ordine a
- `marketplace` (string): Filtra per marketplace
- `supplier` (string): Filtra per fornitore
- `warehouse` (string): Filtra per magazzino
- `courier` (string): Filtra per corriere
- `productCostStatus` (string): OK o KO
- `shippingCostStatus` (string): OK o KO

**Esempio:**
```bash
curl "https://localhost:5001/api/orders?marketplace=Amazon"
```

#### 2. **GET** `/orders/{id}`
Ottieni ordine specifico per ID

**Esempio:**
```bash
curl "https://localhost:5001/api/orders/ORD-001"
```

#### 3. **GET** `/orders/statistics`
Ottieni statistiche (stessi query parameters di `/orders`)

**Esempio:**
```bash
curl "https://localhost:5001/api/orders/statistics"
```

#### 4. **GET** `/orders/suppliers`
Ottieni lista fornitori

#### 5. **GET** `/orders/warehouses`
Ottieni lista magazzini

#### 6. **GET** `/orders/couriers`
Ottieni lista corrieri

#### 7. **GET** `/orders/marketplaces`
Ottieni lista marketplaces

### Swagger UI

Documentazione API interattiva disponibile su:
```
https://localhost:5001/swagger
```

## 🔧 Personalizzazione

### Modificare i Dati Mock

Apri `Services/MockDataService.cs` e modifica `InitializeMockData()`:

```csharp
private void InitializeMockData()
{
    _mockOrders.Add(new Order
    {
        Id = "ORD-999",
        Marketplace = "Amazon",
        CustomerName = "Il Tuo Cliente",
        OrderDate = new DateTime(2024, 2, 1),
        // ... altri campi
        Revenue = new Revenue
        {
            ProductValue = 300.00m,
            ShippingValue = 20.00m,
            Discounts = 0.00m,
            Total = 320.00m
        },
        Costs = new Costs
        {
            ProductCost = 200.00m,
            ShippingCost = 15.00m,
            Commissions = 32.00m,
            Total = 247.00m
        },
        Margin = new Margin
        {
            Value = 73.00m,
            Percentage = 22.81m
        },
        HasValidProductCost = true,
        HasValidShippingCost = true,
        Shipments = new List<Shipment>()
    });
}
```

### Modificare gli Stili

Apri `wwwroot/css/app.css` e modifica i colori:

```css
.row-profit {
    background: #c8e6c9; /* Cambia il colore profitto */
}

.row-loss {
    background: #ffcdd2; /* Cambia il colore perdita */
}

.stat-highlight {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Cambia il gradiente statistiche */
}
```

### Aggiungere Nuove Colonne alla Tabella

1. Apri `Components/Pages/Home.razor`
2. Aggiungi header in `<thead>`:
   ```razor
   <th>Nuova Colonna</th>
   ```
3. Aggiungi celle in `<tbody>`:
   ```razor
   <td>@order.NuovoCampo</td>
   ```

### Connettere a Database Reale

Sostituisci `MockDataService` con un servizio che usa Entity Framework Core:

```csharp
// Installa pacchetto
// dotnet add package Microsoft.EntityFrameworkCore.SqlServer

public class OrderDbContext : DbContext
{
    public DbSet<Order> Orders { get; set; }
    // ... configurazione
}

public class OrderRepository
{
    private readonly OrderDbContext _context;

    public List<Order> GetOrders(OrderFilters filters)
    {
        var query = _context.Orders.AsQueryable();

        if (!string.IsNullOrWhiteSpace(filters.Marketplace))
            query = query.Where(o => o.Marketplace == filters.Marketplace);

        // ... altri filtri

        return query.ToList();
    }
}
```

Aggiorna `Program.cs`:
```csharp
builder.Services.AddDbContext<OrderDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<OrderRepository>();
```

## 🚀 Distribuzione (Deployment)

### Opzione 1: Publish per IIS (Windows Server)

```bash
dotnet publish -c Release -o ./publish

# Copia la cartella ./publish sul server
# Configura IIS per puntare alla cartella publish
```

### Opzione 2: Deploy su Azure App Service

```bash
# Installa Azure CLI
# az login

# Crea App Service
az webapp up --name order-margin-analysis --runtime "DOTNET|9.0"

# Deploy automatico
dotnet publish -c Release
# Segui le istruzioni di Azure
```

### Opzione 3: Docker Container

Crea `Dockerfile`:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["OrderMarginAnalysis.csproj", "./"]
RUN dotnet restore
COPY . .
RUN dotnet build -c Release -o /app/build

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "OrderMarginAnalysis.dll"]
```

Build e run:
```bash
docker build -t order-margin-analysis .
docker run -p 8080:80 order-margin-analysis
```

## 🐛 Troubleshooting

### ".NET 9 SDK not found"
- **Verifica**: `dotnet --version`
- **Soluzione**: Scarica e installa .NET 9 SDK da https://dotnet.microsoft.com

### "Cannot restore NuGet packages"
- **Soluzione**: `dotnet nuget locals all --clear && dotnet restore`

### "Port 5001 already in use"
- **Soluzione**: Modifica porta in `Program.cs`:
  ```csharp
  builder.WebHost.UseUrls("https://localhost:5002");
  ```

### "Blazor component not rendering"
- **Verifica**: Controlla che `@rendermode InteractiveServer` sia presente in `Home.razor`
- **Soluzione**: Rebuild: `dotnet clean && dotnet build`

### "API returns 404"
- **Verifica**: Swagger UI funziona? → `https://localhost:5001/swagger`
- **Soluzione**: Controlla che `app.MapControllers()` sia in `Program.cs`

## 📚 Documentazione .NET

- **Blazor**: https://learn.microsoft.com/aspnet/core/blazor/
- **.NET 9**: https://learn.microsoft.com/dotnet/core/whats-new/dotnet-9
- **ASP.NET Core**: https://learn.microsoft.com/aspnet/core/
- **Entity Framework Core**: https://learn.microsoft.com/ef/core/

## ✨ Novità in questa Versione

- ✅ **.NET 9** - Ultima versione con performance migliorate
- ✅ **Blazor Server** - UI reattiva senza JavaScript
- ✅ **REST API completa** con Swagger
- ✅ **Mock Data Service** per testing immediato
- ✅ **Campo Commissioni** aggiunto ai costi
- ✅ **Statistiche real-time** con calcoli automatici
- ✅ **Design responsivo** per mobile/tablet/desktop

---

**Buon lavoro con l'analisi dei tuoi ordini! 📊✨**
