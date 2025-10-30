# Sistema Analisi Margine Operativo - VB.NET

Versione **VB.NET + ASP.NET MVC** con **.NET Framework 4.8** e **dati mock**.

## 🎯 Caratteristiche

- **Linguaggio**: Visual Basic .NET
- **Framework**: .NET Framework 4.8
- **Architettura**: ASP.NET MVC 5
- **Dati**: Mock data (hardcoded) - nessun database necessario
- **UI**: Razor Views + jQuery
- **Stessa funzionalità** della versione React

## 📁 Struttura Progetto

```
vb-net/
├── Controllers/
│   └── OrdersController.vb          # Controller MVC con azioni per API
├── Models/
│   └── OrderModels.vb                # Classi Order, Shipment, Revenue, Costs, Margin
├── Services/
│   └── MockDataService.vb            # Servizio con 5 ordini mock + filtri
├── Views/
│   └── Orders/
│       └── Index.vbhtml              # View Razor con HTML/CSS/JavaScript
├── Global.asax.vb                    # Configurazione routing MVC
├── Web.config                        # Configurazione ASP.NET
├── OrderMarginAnalysis.vbproj        # File progetto Visual Studio
└── README.md                         # Questo file
```

## 🚀 Come Avviare

### **Requisiti**

- **Visual Studio 2017 o successivo**
- **.NET Framework 4.8** (installato con VS)
- **IIS Express** (incluso in VS)

### **Passo 1: Apri in Visual Studio**

1. Apri **Visual Studio**
2. File → **Open** → **Project/Solution**
3. Seleziona il file `OrderMarginAnalysis.vbproj`
4. Visual Studio caricherà il progetto

### **Passo 2: Ripristina Pacchetti NuGet**

1. Tasto destro sul progetto → **Manage NuGet Packages**
2. Click su **Restore** (se richiesto)
3. Pacchetti necessari:
   - Microsoft.AspNet.Mvc 5.2.7
   - Microsoft.AspNet.WebPages 3.2.7
   - Microsoft.AspNet.Razor 3.2.7
   - Newtonsoft.Json 12.0.2

### **Passo 3: Avvia l'Applicazione**

1. Premi **F5** o click su **Start** (freccia verde)
2. IIS Express si avvierà automaticamente
3. Il browser si aprirà su `http://localhost:57923/`
4. Vedrai l'interfaccia con i 5 ordini mock

### **Passo 4: Testa i Filtri**

Nell'interfaccia web:
- **Marketplace**: Seleziona "Amazon" → vedrai 2 ordini
- **Corriere**: Seleziona "DHL" → vedrai 1 ordine
- **Costo KO**: Seleziona "Costo Prodotto = KO" → vedrai 1 ordine
- **Ricerca**: Scrivi "Mario" → vedrai 1 ordine

## 📊 Funzionalità Implementate

### ✅ **Ordini e Spedizioni**
- 5 ordini mock con dati realistici
- Ordini multi-spedizione (1-3 spedizioni per ordine)
- Espansione/collasso spedizioni (click su ▶)

### ✅ **Calcoli Margini**
- Ricavi: Prodotto + Spedizione - Sconti
- Costi: Prodotto + Spedizione + **Commissioni** ⭐
- Margine: Ricavi - Costi (valore + percentuale)
- Colori automatici: verde/rosso/grigio

### ✅ **Filtri Funzionanti**
- Ricerca testuale (ordine, cliente, tracking)
- Marketplace (Amazon, eBay, Sito Web)
- Fornitore, Magazzino, Corriere
- Date (da/a)
- Stato costi (OK/KO)

### ✅ **Statistiche Real-Time**
- Ordini totali
- Ordini in profitto/perdita (numero + %)
- Margine totale
- Valore ordini totale
- **Si aggiorna in base ai filtri!**

## 🗂️ Dati Mock Disponibili

### **Ordine 1: ORD-001**
- Marketplace: Amazon
- Cliente: Mario Rossi
- Spedizioni: 2
- Margine: **+€46.50 (17.55%)** ✅

### **Ordine 2: ORD-002**
- Marketplace: eBay
- Cliente: Giulia Bianchi
- Spedizioni: 1
- Margine: **-€21.68 (-22.87%)** ❌
- Costi: KO (invalidi)

### **Ordine 3: ORD-003**
- Marketplace: Sito Web
- Cliente: Luca Verdi
- Spedizioni: 1
- Margine: **€0.00 (0%)** ⚪

### **Ordine 4: ORD-004**
- Marketplace: Amazon
- Cliente: Anna Neri
- Spedizioni: 3
- Margine: **+€72.00 (15.65%)** ✅

### **Ordine 5: ORD-005**
- Marketplace: eBay
- Cliente: Paolo Gialli
- Spedizioni: 2
- Margine: **-€27.68 (-14.21%)** ❌
- Costi spedizione: KO

## 🔧 Architettura Tecnica

### **Models (OrderModels.vb)**
```vb
Public Class Order
    Public Property Id As String
    Public Property Marketplace As String
    Public Property CustomerName As String
    Public Property Revenue As Revenue
    Public Property Costs As Costs
    Public Property Margin As Margin
    Public Property Shipments As List(Of Shipment)
End Class
```

### **Service (MockDataService.vb)**
```vb
Public Class MockDataService
    Public Function GetOrders(filters As OrderFilters) As List(Of Order)
        ' Applica filtri e restituisce ordini
    End Function

    Public Function GetStatistics(filters As OrderFilters) As OrderStatistics
        ' Calcola statistiche aggregate
    End Function
End Class
```

### **Controller (OrdersController.vb)**
```vb
Public Class OrdersController
    Inherits Controller

    ' GET: /Orders - View principale
    Public Function Index() As ActionResult

    ' GET: /Orders/GetOrders - API JSON per ordini
    Public Function GetOrders(...) As JsonResult

    ' GET: /Orders/GetFilterOptions - API JSON per opzioni filtri
    Public Function GetFilterOptions() As JsonResult
End Class
```

### **View (Index.vbhtml)**
- HTML/CSS per layout e stile
- jQuery per chiamate AJAX alle API
- JavaScript per interattività (expand/collapse, filtri)

## 🎨 Personalizzazione

### **Modificare i Dati Mock**

Apri `Services/MockDataService.vb` e modifica il metodo `InitializeMockData()`:

```vb
' Aggiungi un nuovo ordine
Dim order6 As New Order() With {
    .Id = "ORD-006",
    .Marketplace = "Amazon",
    .CustomerName = "Tuo Nome",
    .OrderDate = DateTime.Now,
    .Revenue = New Revenue() With {.Total = 100D},
    .Costs = New Costs() With {.Total = 80D},
    .Margin = New Margin() With {.Value = 20D, .Percentage = 20D}
}
_mockOrders.Add(order6)
```

### **Modificare lo Stile**

Apri `Views/Orders/Index.vbhtml` e modifica il tag `<style>`:

```css
/* Cambia colore primario */
.btn-search {
    background-color: #ff0000; /* Rosso invece di blu */
}
```

### **Aggiungere Campi**

1. Modifica `Models/OrderModels.vb` per aggiungere proprietà
2. Aggiorna `MockDataService.vb` per popolare i dati
3. Modifica `Index.vbhtml` per visualizzare il nuovo campo

## 📡 API Endpoints

### **GET /Orders**
Restituisce la view principale HTML

### **GET /Orders/GetOrders**
Restituisce ordini filtrati in JSON

**Query Parameters:**
- searchQuery
- dateFrom, dateTo
- marketplace, supplier, warehouse, courier
- productCostStatus, shippingCostStatus

**Response:**
```json
{
  "orders": [...],
  "statistics": {...}
}
```

### **GET /Orders/GetFilterOptions**
Restituisce opzioni per i filtri in JSON

**Response:**
```json
{
  "Suppliers": ["Fornitore A", "Fornitore B"],
  "Warehouses": ["Magazzino A", "Magazzino B"],
  "Couriers": ["DHL", "UPS", "GLS"],
  "Marketplaces": ["Amazon", "eBay", "Sito Web"]
}
```

## 🔄 Migrazione a Database

Per usare SQL Server invece dei mock:

1. Installa Entity Framework 6:
   ```
   Install-Package EntityFramework
   ```

2. Crea DbContext:
   ```vb
   Public Class OrderContext
       Inherits DbContext
       Public Property Orders As DbSet(Of Order)
       Public Property Shipments As DbSet(Of Shipment)
   End Class
   ```

3. Aggiorna OrdersController per usare DbContext invece di MockDataService

4. Run Migrations:
   ```
   Enable-Migrations
   Add-Migration Initial
   Update-Database
   ```

## 🐛 Troubleshooting

### **"Build failed"**
- Verifica che .NET Framework 4.8 sia installato
- Ripristina pacchetti NuGet
- Pulisci e ricompila: Build → Clean → Build

### **"Controller not found"**
- Verifica routing in `Global.asax.vb`
- Controller deve ereditare da `System.Web.Mvc.Controller`

### **"View not found"**
- View deve essere in `Views/Orders/Index.vbhtml`
- Nome view deve corrispondere all'action

### **"Data not loading"**
- Apri Developer Tools (F12)
- Controlla tab Network per errori AJAX
- Verifica che MockDataService sia inizializzato

## 📚 Documentazione

- **ASP.NET MVC**: https://docs.microsoft.com/aspnet/mvc
- **VB.NET**: https://docs.microsoft.com/dotnet/visual-basic
- **.NET Framework 4.8**: https://dotnet.microsoft.com/download/dotnet-framework/net48

## ✅ Checklist Verifica

- [ ] Progetto aperto in Visual Studio
- [ ] NuGet packages ripristinati
- [ ] Build completato con successo
- [ ] IIS Express avviato (F5)
- [ ] Browser aperto su localhost
- [ ] 5 ordini visibili
- [ ] Filtri funzionanti
- [ ] Espandi/collassa spedizioni funziona
- [ ] Statistiche si aggiornano con i filtri

## 🎉 Prossimi Passi

1. **Testare tutti i filtri** - Prova ogni combinazione
2. **Aggiungere ordini mock** - Modifica MockDataService
3. **Personalizzare UI** - Cambia colori/layout
4. **Migrare a SQL Server** - Quando pronto per produzione
5. **Aggiungere autenticazione** - ASP.NET Identity

---

**Versione**: 1.0.0
**Data**: 2025-01-29
**Linguaggio**: Visual Basic .NET
**Framework**: .NET Framework 4.8
**Pattern**: ASP.NET MVC 5
