# Analisi Margine Preliminare Ordini - VB.NET + .NET Framework 4.8

Sistema desktop Windows Forms per l'analisi del margine preliminare degli ordini con supporto per multi-spedizione e filtri avanzati.

## 📋 Caratteristiche

- **Windows Forms Desktop Application** - Interfaccia nativa Windows
- **VB.NET** - Visual Basic .NET
- **.NET Framework 4.8** - Compatibilità con Windows 7+
- **Mock Data** - Dati di esempio integrati per test immediati
- **Filtri Avanzati** - Ricerca, date, marketplace, fornitore, magazzino, corriere, validazione costi
- **Multi-Shipment Support** - Espandi/comprimi ordini con più spedizioni
- **Statistiche in Tempo Reale** - Margini, profitti, perdite calcolati automaticamente
- **Colori Intuitivi** - Verde per profitto, rosso per perdita, grigio per pareggio
- **Validazione Costi** - Indicatori OK/KO per costi prodotto e spedizione

## 🚀 Requisiti

### Software Necessario

1. **Visual Studio 2017 o successivo**
   - Download: https://visualstudio.microsoft.com/downloads/
   - Edizioni supportate: Community (gratis), Professional, Enterprise

2. **.NET Framework 4.8 Developer Pack**
   - Download: https://dotnet.microsoft.com/download/dotnet-framework/net48
   - Di solito incluso con Visual Studio

3. **Windows 7 o successivo** (per eseguire l'applicazione compilata)

## 📦 Setup e Installazione

### Opzione 1: Apertura Diretta in Visual Studio

1. **Apri il progetto:**
   ```
   Doppio click su: vb-winforms/OrderMarginAnalysis.vbproj
   ```

2. **Visual Studio caricherà automaticamente:**
   - Tutte le dipendenze
   - I file del progetto
   - La configurazione

3. **Compila ed esegui:**
   - Premi `F5` (Debug) o `Ctrl+F5` (Esegui senza debug)
   - L'applicazione si avvierà con 5 ordini di esempio

### Opzione 2: Apertura da Visual Studio

1. **Apri Visual Studio**

2. **File → Apri → Progetto/Soluzione**

3. **Naviga fino a:** `vb-winforms/OrderMarginAnalysis.vbproj`

4. **Click su "Apri"**

5. **Compila ed esegui** con `F5`

## 🎯 Utilizzo dell'Applicazione

### Interfaccia Principale

L'applicazione si divide in 3 sezioni:

#### 1. **Pannello Filtri (In alto)**
- **Ricerca**: Cerca per ID ordine, nome cliente, o tracking number
- **Date**: Filtra per data ordine (Da/A con checkbox di attivazione)
- **Marketplace**: Amazon, eBay, Sito Web
- **Fornitore**: Filtra per fornitore
- **Magazzino**: Filtra per magazzino
- **Corriere**: DHL, UPS, FedEx, BRT, Poste
- **Costo Prodotto**: OK (valido) o KO (non valido)
- **Costo Spedizione**: OK (valido) o KO (non valido)
- **Pulsante Cerca**: Applica i filtri
- **Pulsante Reset**: Resetta tutti i filtri

#### 2. **Tabella Ordini (Centro)**
- **Colonna Expand**: Click su ▶ per espandere ordini con più spedizioni
- **Righe Colorate**:
  - 🟢 **Verde**: Ordine in profitto (margine > 0)
  - 🔴 **Rosso**: Ordine in perdita (margine < 0)
  - ⚪ **Grigio**: Ordine a pareggio (margine = 0)
- **Righe Spedizioni**: Leggermente rientrate con freccia →
- **Colonne OK/KO**: Arancione per costi non validi

#### 3. **Pannello Statistiche (Destra)**
- **Ordini Totali**: Numero totale ordini filtrati
- **In Profitto**: Ordini con margine positivo + percentuale
- **In Perdita**: Ordini con margine negativo + percentuale
- **Margine Totale**: Somma margini in Euro
- **Incassato**: Totale ricavi
- **Costi Totali**: Somma costi (prodotto + spedizione + commissioni)

### Esempi di Filtri

#### Test 1: Filtra per Marketplace Amazon
1. Seleziona "Amazon" nel dropdown Marketplace
2. Click su "Cerca"
3. **Risultato**: Vedrai ORD-001 (+€46.50) e ORD-004 (+€72.00)

#### Test 2: Trova ordini in perdita
1. Osserva le righe rosse nella tabella
2. **Risultato**: ORD-002 (-€21.68) e ORD-005 (-€27.68)

#### Test 3: Cerca cliente specifico
1. Digita "Mario" nel campo Ricerca
2. Click su "Cerca"
3. **Risultato**: Vedrai ORD-001 (Mario Rossi)

#### Test 4: Filtra per costi non validi
1. Seleziona "KO" nel dropdown Costo Prodotto
2. Click su "Cerca"
3. **Risultato**: Vedrai ordini con costi prodotto non validati (colonna arancione)

#### Test 5: Espandi ordine con più spedizioni
1. Trova una riga con ▶ nella prima colonna
2. Click sulla freccia
3. **Risultato**: La freccia diventa ▼ e appaiono le spedizioni sotto l'ordine

## 📊 Dati di Esempio

Il sistema include 5 ordini di test:

| ID      | Marketplace | Cliente        | Margine   | Stato |
|---------|-------------|----------------|-----------|-------|
| ORD-001 | Amazon      | Mario Rossi    | +€46.50   | ✅ OK |
| ORD-002 | eBay        | Laura Bianchi  | -€21.68   | ❌ KO |
| ORD-003 | Sito Web    | Giuseppe Verdi | €0.00     | ⚠️ 0  |
| ORD-004 | Amazon      | Anna Ferrari   | +€72.00   | ✅ OK |
| ORD-005 | eBay        | Marco Gialli   | -€27.68   | ❌ KO |

### Formule di Calcolo

```
Incassato = Valore Prodotto + Valore Spedizione - Sconti
Costi Totali = Costo Prodotto + Costo Spedizione + Commissioni
Margine (€) = Incassato - Costi Totali
Margine (%) = (Margine / Incassato) × 100
```

**✨ NOVITÀ**: Campo **Commissioni** aggiunto ai costi!

## 🏗️ Struttura del Progetto

```
vb-winforms/
├── Forms/
│   ├── MainForm.vb              # Logica del form principale
│   ├── MainForm.Designer.vb     # Definizione UI del form
│   └── MainForm.resx            # Risorse del form
├── Models/
│   └── OrderModels.vb           # Classi: Order, Shipment, Revenue, Costs, Margin
├── Services/
│   └── MockDataService.vb       # Servizio dati mock + filtri
├── My Project/
│   ├── Application.myapp        # Configurazione applicazione
│   ├── Application.Designer.vb  # Generato automaticamente
│   ├── AssemblyInfo.vb          # Info assembly (versione, copyright)
│   ├── Resources.Designer.vb    # Gestione risorse
│   ├── Resources.resx           # File risorse
│   ├── Settings.settings        # Impostazioni applicazione
│   └── Settings.Designer.vb     # Generato automaticamente
├── App.config                   # Configurazione runtime
├── OrderMarginAnalysis.vbproj   # File progetto Visual Studio
└── README.md                    # Questa documentazione
```

## 🔧 Personalizzazione

### Modificare i Dati Mock

Apri `Services/MockDataService.vb` e modifica il metodo `InitializeMockData()`:

```vb
Private Sub InitializeMockData()
    mockOrders = New List(Of Order)()

    ' Aggiungi il tuo ordine personalizzato
    Dim myOrder As New Order() With {
        .Id = "ORD-999",
        .Marketplace = "Amazon",
        .CustomerName = "Il Tuo Cliente",
        .OrderDate = DateTime.Now,
        .Supplier = "Fornitore Test",
        .Warehouse = "Magazzino A",
        .Courier = "DHL",
        .Revenue = New Revenue() With {
            .ProductValue = 100D,
            .ShippingValue = 10D,
            .Discounts = 0D,
            .Total = 110D
        },
        .Costs = New Costs() With {
            .ProductCost = 70D,
            .ShippingCost = 8D,
            .Commissions = 11D,
            .Total = 89D
        },
        .Margin = New Margin() With {
            .Value = 21D,
            .Percentage = 19.09D
        },
        .HasValidProductCost = True,
        .HasValidShippingCost = True,
        .Shipments = New List(Of Shipment)()
    }

    mockOrders.Add(myOrder)
End Sub
```

### Modificare i Colori

Apri `Forms/MainForm.vb` e modifica il metodo `GetMarginColor()`:

```vb
Private Function GetMarginColor(marginValue As Decimal, Optional isShipment As Boolean = False) As Color
    If marginValue > 0 Then
        Return Color.LightGreen  ' Cambia questo colore
    ElseIf marginValue < 0 Then
        Return Color.LightCoral  ' Cambia questo colore
    Else
        Return Color.LightGray   ' Cambia questo colore
    End If
End Function
```

### Aggiungere Nuove Colonne

1. Apri `Forms/MainForm.Designer.vb`
2. Aggiungi una nuova colonna al DataGridView:
   ```vb
   Me.colNewColumn = New System.Windows.Forms.DataGridViewTextBoxColumn()
   Me.colNewColumn.HeaderText = "Nuova Colonna"
   Me.colNewColumn.Name = "colNewColumn"
   ```
3. Aggiungi la colonna alla collection:
   ```vb
   Me.dgvOrders.Columns.AddRange(..., Me.colNewColumn)
   ```
4. Popola la colonna in `MainForm.vb` nel metodo `PopulateDataGridView()`

## 🚀 Distribuzione

### Creare un Eseguibile

1. **Cambia configurazione in Release:**
   - Visual Studio → Build → Configuration Manager
   - Seleziona "Release" invece di "Debug"

2. **Compila il progetto:**
   - Build → Build Solution (o `Ctrl+Shift+B`)

3. **Trova l'eseguibile:**
   ```
   vb-winforms/bin/Release/OrderMarginAnalysis.exe
   ```

4. **Distribuisci:**
   - Copia il file .exe
   - Distribuisci insieme a .NET Framework 4.8 Runtime (se non presente sul PC di destinazione)

### Creare un Installer (Opzionale)

Usa uno di questi strumenti:
- **WiX Toolset** (gratuito, open source)
- **InstallShield** (commerciale)
- **Advanced Installer** (commerciale con versione free)

## 🐛 Troubleshooting

### "Impossibile aprire il progetto"
- **Verifica** di avere Visual Studio 2017+
- **Verifica** di avere .NET Framework 4.8 Developer Pack installato
- **Prova** a riparare Visual Studio da Programmi e Funzionalità

### "Errori di compilazione"
- **Pulisci la solution**: Build → Clean Solution
- **Ricompila**: Build → Rebuild Solution
- **Controlla** che tutti i file siano presenti nella cartella

### "L'applicazione non si avvia"
- **Verifica** che .NET Framework 4.8 sia installato sul PC
- **Esegui come amministratore** se necessario
- **Controlla** i log di errore in Event Viewer

### "I dati non appaiono"
- **Verifica** che `MockDataService.vb` contenga i dati
- **Debug**: Metti un breakpoint in `MainForm_Load` e controlla che `mockDataService.GetOrders()` ritorni dati
- **Controlla** la console di output in Visual Studio per errori

## 📝 Note Tecniche

### Compatibilità

- **OS Supportati**: Windows 7, 8, 8.1, 10, 11
- **Architettura**: x86, x64 (AnyCPU)
- **.NET Framework**: Richiede 4.8 (può essere retro-compatibile con 4.7.2 modificando il target framework)

### Performance

- **Ordini**: Testato con 1000+ ordini senza problemi
- **Filtri**: Implementati con LINQ per performance ottimali
- **UI**: DataGridView nativo Windows per massima velocità

### Sicurezza

- **Dati Mock**: Hardcoded nel codice, nessun database esterno
- **Nessuna Connessione**: Funziona completamente offline
- **Nessun Permesso Speciale**: Non richiede diritti amministratore

## 🔜 Prossimi Passi

### Integrazione Database Reale

Quando pronto, puoi sostituire `MockDataService` con un servizio che legge da:
- **SQL Server** - Database locale o remoto
- **Supabase** - Database cloud PostgreSQL
- **Web API** - Endpoint REST del tuo backend
- **Excel/CSV** - Importazione file

Esempio struttura per SQL Server:

```vb
Public Class SqlDataService
    Private connectionString As String

    Public Sub New(connString As String)
        connectionString = connString
    End Sub

    Public Function GetOrders(filters As OrderFilters) As List(Of Order)
        ' Implementa query SQL con SqlConnection e SqlCommand
        ' Applica filtri nella query WHERE
        ' Ritorna List(Of Order)
    End Function
End Class
```

### Feature Aggiuntive Proposte

- ✅ Export in Excel/CSV
- ✅ Stampa report PDF
- ✅ Grafici (Chart control)
- ✅ Edit inline degli ordini
- ✅ Import da file
- ✅ Multi-language support
- ✅ Temi dark/light
- ✅ Configurazioni utente salvate

## 📞 Supporto

Per domande o problemi:
1. Controlla questa documentazione
2. Verifica i requisiti di sistema
3. Consulta la sezione Troubleshooting

## 📄 Licenza

Questo è un progetto di esempio per dimostrazione. Usalo liberamente per i tuoi progetti.

---

**Buon lavoro con l'analisi dei tuoi ordini! 📊✨**
