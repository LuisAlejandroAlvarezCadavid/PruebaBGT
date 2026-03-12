# BTG Pactual — Gestión de Fondos de Inversión

Aplicación web desarrollada en **Angular** para la gestión de fondos de inversión de BTG Pactual. Permite a un usuario visualizar fondos disponibles, suscribirse, cancelar participación y consultar el historial de transacciones.

---

## Tabla de Contenido

- [Requisitos Funcionales](#requisitos-funcionales)
- [Consideraciones](#consideraciones)
- [Requisitos Técnicos](#requisitos-técnicos)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Componentes Reutilizables](#componentes-reutilizables)
- [Flujo de Suscripción](#flujo-de-suscripción)
- [Fondos Disponibles](#fondos-disponibles)
- [Manejo de Estado](#manejo-de-estado)
- [Stack Tecnológico](#stack-tecnológico)
- [Instalación y Ejecución](#instalación-y-ejecución)

---

## Requisitos Funcionales

| # | Requisito | Descripción |
|---|-----------|-------------|
| RF1 | Listar fondos disponibles | Visualizar todos los fondos con nombre, monto mínimo y categoría |
| RF2 | Suscribirse a un fondo | Suscripción si el saldo del usuario es >= al monto mínimo del fondo |
| RF3 | Cancelar suscripción | Cancelar participación en un fondo y devolver el monto al saldo |
| RF4 | Historial de transacciones | Visualizar todas las suscripciones y cancelaciones realizadas |
| RF5 | Método de notificación | Seleccionar Email o SMS al momento de suscribirse a un fondo |
| RF6 | Mensajes de error | Mostrar error claro cuando el saldo es insuficiente |

---

## Consideraciones

- No se implementa lógica de backend, autenticación ni despliegue.
- Se asume un **usuario único** con saldo inicial de **COP $500.000**.
- La suscripción a un fondo es **única** (no se permite suscribirse dos veces al mismo fondo).
- El método de notificación (Email/SMS) se registra como preferencia, no se realiza envío real.
- Los datos se consumen desde una **API REST simulada** (json-server o mocks locales).

---

## Requisitos Técnicos

| Aspecto | Implementación |
|---------|---------------|
| Framework | Angular 21 con NgModules |
| UI/UX | Angular Material 21 |
| Manejo de estado | Servicios + RxJS (BehaviorSubject, Observables) |
| Validaciones | Reactive Forms con validadores |
| Diseño responsivo | Angular Material + CSS Flexbox/Grid |
| Datos | Datos mock en servicios (sin backend) |
| Errores y feedback | Mensajes de error, snackbars |
| Código | Limpio, estructurado y comentado |
| Inyección de dependencias | Constructor injection |
| Detección de cambios | OnPush en todos los componentes |

---

## Arquitectura del Proyecto

La aplicación usa **NgModules** con lazy loading para los feature modules. Cada componente tiene archivos separados para TypeScript, HTML y SCSS.

```
src/
├── app/
│   ├── core/                           # Capa central (singleton)
│   │   ├── models/                     # Interfaces y tipos
│   │   │   ├── fund.model.ts           # Interface Fund, FundCategory
│   │   │   ├── transaction.model.ts    # Interface Transaction, TransactionType, NotificationMethod
│   │   │   ├── user.model.ts           # Interface User, Subscription
│   │   │   └── index.ts               # Barrel export
│   │   └── services/                   # Servicios de negocio (providedIn: 'root')
│   │       ├── fund.service.ts         # Lista de fondos (BehaviorSubject)
│   │       ├── transaction.service.ts  # Registro de transacciones
│   │       ├── user.service.ts         # Saldo, suscripciones del usuario
│   │       └── index.ts               # Barrel export
│   │
│   ├── shared/                         # Módulo compartido (SharedModule)
│   │   ├── shared.module.ts            # Declara/exporta componentes, pipes y módulos Material
│   │   ├── components/
│   │   │   ├── balance-card/           # Tarjeta de saldo actual (.ts, .html, .scss)
│   │   │   ├── fund-card/             # Tarjeta de fondo individual (.ts, .html, .scss)
│   │   │   └── transaction-table/     # Tabla genérica de transacciones (.ts, .html, .scss)
│   │   ├── pipes/
│   │   │   └── cop-currency.pipe.ts   # Pipe para formato COP ($XX.XXX)
│   │   └── index.ts                   # Barrel export
│   │
│   ├── features/                       # Feature modules (lazy loaded)
│   │   ├── funds/                     # FundsModule
│   │   │   ├── funds.module.ts        # NgModule del feature
│   │   │   ├── funds-routing.module.ts # Rutas del módulo
│   │   │   ├── fund-list/             # Lista de fondos (.ts, .html, .scss)
│   │   │   └── fund-subscribe-dialog/ # Diálogo de suscripción (.ts, .html, .scss)
│   │   ├── subscriptions/            # SubscriptionsModule
│   │   │   ├── subscriptions.module.ts
│   │   │   ├── subscriptions-routing.module.ts
│   │   │   └── subscription-list/     # Lista de suscripciones (.ts, .html, .scss)
│   │   └── transactions/             # TransactionsModule
│   │       ├── transactions.module.ts
│   │       ├── transactions-routing.module.ts
│   │       └── transaction-history/   # Historial de transacciones (.ts, .html, .scss)
│   │
│   ├── layout/                         # LayoutModule
│   │   ├── layout.module.ts           # NgModule del layout
│   │   └── header/                    # Barra superior con navegación y saldo (.ts, .html, .scss)
│   │
│   ├── app.module.ts                  # Módulo raíz (AppModule)
│   ├── app.routes.ts                  # Rutas principales con lazy loading
│   ├── app.ts                         # Componente raíz
│   ├── app.html                       # Template del componente raíz
│   └── app.scss                       # Estilos del componente raíz
│
└── styles.scss                        # Estilos globales (tema Angular Material)
```

### Módulos

| Módulo | Tipo | Descripción |
|--------|------|-------------|
| `AppModule` | Root | Módulo raíz, importa RouterModule.forRoot, SharedModule, LayoutModule |
| `SharedModule` | Shared | Componentes reutilizables, pipes, módulos de Angular Material |
| `LayoutModule` | Layout | Header y estructura visual de la aplicación |
| `FundsModule` | Feature (lazy) | Vista de fondos disponibles y diálogo de suscripción |
| `SubscriptionsModule` | Feature (lazy) | Vista de suscripciones activas |
| `TransactionsModule` | Feature (lazy) | Vista de historial de transacciones |

---

## Componentes Reutilizables

| Componente | Descripción | Reutilización |
|-----------|-------------|---------------|
| `BalanceCardComponent` | Muestra el saldo actual del usuario en formato COP | Header, vista de fondos |
| `FundCardComponent` | Tarjeta visual de un fondo (nombre, monto, categoría, estado) | Lista de fondos |
| `TransactionTableComponent` | Tabla para mostrar transacciones con tipo, fondo, monto y fecha | Historial de transacciones |
| `CopCurrencyPipe` | Pipe para formatear valores en COP ($XX.XXX) | Cualquier lugar que muestre montos |

---

## Flujo de Suscripción

```
┌─────────────────┐     ┌──────────────────────────────────────┐
│ Lista de Fondos  │────▶│     Diálogo de Suscripción           │
│                  │     │                                      │
│ [Suscribirse]    │     │  Fondo: FPV_BTG_PACTUAL_RECAUDADORA │
│                  │     │  Monto mínimo: COP $75.000           │
│                  │     │  Su saldo actual: COP $500.000       │
│                  │     │                                      │
│                  │     │  Método de notificación: *            │
│                  │     │  ○ Email    ○ SMS                    │
│                  │     │                                      │
│                  │     │        [Cancelar]  [Confirmar]       │
└─────────────────┘     └──────────────────────────────────────┘
                                        │
                        ┌───────────────┴───────────────┐
                        ▼                               ▼
                ┌──────────────┐               ┌──────────────────┐
                │ Saldo >= Min │               │  Saldo < Min     │
                │              │               │                  │
                │ ✔ Suscripción│               │ ✖ Error:         │
                │   exitosa    │               │   "No tiene      │
                │ ✔ Descuenta  │               │    saldo         │
                │   saldo      │               │    disponible"   │
                │ ✔ Registra   │               │                  │
                │   transacción│               │                  │
                └──────────────┘               └──────────────────┘
```

### Validaciones en la suscripción:
1. **Saldo suficiente**: saldo del usuario >= monto mínimo del fondo.
2. **No duplicidad**: el usuario no debe estar ya suscrito al fondo.
3. **Método de notificación**: campo obligatorio (Email o SMS).

---

## Fondos Disponibles

| ID | Nombre | Monto Mínimo (COP) | Categoría |
|----|--------|-------------------|-----------|
| 1 | FPV_BTG_PACTUAL_RECAUDADORA | $75.000 | FPV |
| 2 | FPV_BTG_PACTUAL_ECOPETROL | $125.000 | FPV |
| 3 | DEUDAPRIVADA | $50.000 | FIC |
| 4 | FDO-ACCIONES | $250.000 | FIC |
| 5 | FPV_BTG_PACTUAL_DINAMICA | $100.000 | FPV |

**Categorías:**
- **FPV**: Fondo de Pensiones Voluntarias
- **FIC**: Fondo de Inversión Colectiva

---

## Manejo de Estado

El estado de la aplicación se gestiona mediante **servicios Angular + RxJS**:

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────────────┐
│ UserService  │     │  FundService     │     │ TransactionService   │
│              │     │                  │     │                      │
│ - saldo$     │     │ - funds$         │     │ - transactions$      │
│ - user$      │     │ - subscribedFunds│     │ - addTransaction()   │
│ - updateBal()│     │ - subscribe()    │     │ - getHistory()       │
│              │     │ - cancel()       │     │                      │
└─────────────┘     └──────────────────┘     └─────────────────────┘
        │                    │                          │
        └────────────────────┴──────────────────────────┘
                             │
                    BehaviorSubject / Observable
                             │
                    Componentes se suscriben
                    y reaccionan a cambios
```

---

## Stack Tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Angular | 21 | Framework principal |
| Angular Material | 21 | Componentes UI |
| RxJS | 7+ | Programación reactiva |
| TypeScript | 5.8+ | Lenguaje |
| Node.js | 18+ | Runtime |

---

## Instalación y Ejecución

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd PruebaBTG

# Instalar dependencias
npm install

# Ejecutar la aplicación
ng serve

# Abrir en el navegador
http://localhost:4200
```

---

## Rutas de la Aplicación

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/fondos` | Fondos Disponibles | Lista de fondos con opción de suscripción |
| `/suscripciones` | Mis Suscripciones | Fondos suscritos con opción de cancelar |
| `/transacciones` | Historial | Registro de todas las operaciones |


## Video de la aplicacion

![alt text](<Recording 2026-03-12 140041.gif>)
---
