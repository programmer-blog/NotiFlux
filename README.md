# NotiFlux — Notifications App

A lightweight notifications UI built with **React + TypeScript**, **Redux Toolkit**, **react-redux typed hooks**, and **Tailwind CSS** (UI library optional: shadcn/ui).
It renders a **Header** with a bell and **unread counter**, and a **Notifications** list where items can be marked **read**.

---

## ✨ Features (current)

* **Header**: app name + bell icon + unread badge (counter comes from Redux).
* **Notifications list**: each item shows text and a **Read** toggle (implemented as `markAsRead(id)`).
* **Redux Toolkit store**: `notifications` slice with initial seed data.
* **Typed React-Redux hooks**: `useAppDispatch`, `useAppSelector`, `useAppStore`.
* **Selectors**:

  * `selectNotifications(state)` → array of items
  * `selectUnreadNotificationsCount(state)` → number of unread items

> More actions/selectors can be added later (e.g., mark all read, toggle read, remove).

---

## 🧱 Tech Stack

* React 18 + TypeScript
* Redux Toolkit (`@reduxjs/toolkit`)
* React Redux (`react-redux`) with **typed hooks**
* Tailwind CSS (recommended; optional shadcn/ui components)
* Bundler: Vite (or your chosen tool)

---

## 🗂 Project Structure

```
src/
  components/
    Header.tsx
    Notifications.tsx
  store/
    hooks.ts                 # typed react-redux hooks
    notificationsSlice.ts    # slice + initial state + selectors
    store.ts                 # Redux store configuration
  App.tsx
  main.tsx                   # DOM mount & <Provider>
  index.css                  # Tailwind entry (if used)
  App.css                    # local styles (optional)
```

---

## 🚀 Getting Started

1. **Install dependencies**

```bash
pnpm add @reduxjs/toolkit react-redux
# or: npm i @reduxjs/toolkit react-redux
```

2. **(If using Tailwind)** install & configure Tailwind per the official docs.
   Ensure `index.css` imports Tailwind layers:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

3. **Run the app**

```bash
pnpm dev
# or: npm run dev
```

---

## 🧠 Domain Model

```ts
export type NotificationItem = {
  text: string;
  read: boolean;
  id: string;
};
```

Slice state:

```ts
interface NotificationsState {
  notificationsList: NotificationItem[];
}
```

Initial data (example):

```ts
notificationsList: [
  { text: "Notofication First",  id: "abc123", read: false },
  { text: "Notofication Second", id: "abc456", read: true  },
  { text: "Notofication Third",  id: "abc789", read: false },
]
```

---

## 🧩 Redux Setup (as implemented)

### `src/store/hooks.ts`

Typed hooks using `withTypes`:

```ts
import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
```

### `src/store/notificationsSlice.ts`

Slice, action, and selectors:

```ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { NotificationItem } from "@/types";

interface NotificationsState {
  notificationsList: NotificationItem[];
}

const initialState: NotificationsState = {
  notificationsList: [
    { text: "Notofication First",  id: "abc123", read: false },
    { text: "Notofication Second", id: "abc456", read: true  },
    { text: "Notofication Third",  id: "abc789", read: false },
  ],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAsRead: (state, action: PayloadAction<string>) => {
      state.notificationsList.forEach((item) => {
        const targetId = action.payload;
        if (item.id === targetId) {
          item.read = true;
        }
      });
    },
  },
});

export const { markAsRead } = notificationsSlice.actions;

// Selectors
export const selectNotifications = (state: RootState) =>
  state.notifications.notificationsList;

export const selectUnreadNotificationsCount = (state: RootState) => {
  const unReadItems = state.notifications.notificationsList.filter((item) => !item.read);
  return unReadItems.length;
};

export default notificationsSlice.reducer;
```

### `src/store/store.ts`

Store configuration and exported types:

```ts
import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
```

---

## 🔌 App Wiring

### `src/main.tsx`

Provider mounts the Redux store:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

### `src/App.tsx`

Render Header + Notifications:

```tsx
import "./App.css";
import Header from "./components/Header";
import Notifications from "./components/Notifications";

function App() {
  return (
    <>
      <Header />
      <Notifications />
    </>
  );
}

export default App;
```

---

## 🧑‍💻 Using the Store in Components

### Read values

```tsx
import { useAppSelector } from "@/store/hooks";
import { selectUnreadNotificationsCount, selectNotifications } from "@/store/notificationsSlice";

const unread = useAppSelector(selectUnreadNotificationsCount);
const notifications = useAppSelector(selectNotifications);
```

### Dispatch actions

```tsx
import { useAppDispatch } from "@/store/hooks";
import { markAsRead } from "@/store/notificationsSlice";

const dispatch = useAppDispatch();
dispatch(markAsRead("abc123"));
```

---

## 🎨 UI/UX Notes

* Buttons, badges, and layout use **Tailwind** classes (and can be paired with **shadcn/ui** primitives).
* Recommended hover/focus patterns:

  * `cursor-pointer transition duration-300`
  * text/bg pairs, e.g. `bg-black text-white hover:bg-white hover:text-black`
* Keep the unread badge **hidden** when count is `0`, or show `0`—team preference.

---

## ♿ Accessibility

* Unread count should be in an `aria-live="polite"` region so screen readers announce changes.
* Read/Unread toggles should use `aria-pressed` (true/false) to communicate state.
* Ensure visible focus rings (`focus-visible:` utilities).

---

## 🧪 Testing Ideas (optional)

* Slice unit tests: `markAsRead` sets `read = true` for the given ID.
* Selector tests: `selectUnreadNotificationsCount` returns expected count.
* Component tests:

  * Badge updates when toggling an item.
  * Empty state renders when list is empty.

---

## 🧭 Conventions

* **Conventional Commits** (e.g., `feat(redux): ...`, `feat(ui): ...`, `refactor: ...`, `docs: ...`).
* Keep **pure logic** in slices/selectors; keep **rendering** in components.
* Prefer **typed hooks** over raw `useDispatch`/`useSelector`.

---

## 🔮 Next Steps (future work)

* Actions: `toggleRead`, `markAllRead`, `clearAll`, `removeById`, `addNotification`.
* Memoized selectors (e.g., `createSelector`) for unread lists, grouping by date/type.
* Persistence: localStorage or server sync.
* Additional UI: filters (All/Unread), sort by recency, per-item actions menu.
* Theming: dark mode, shadcn/ui tokens.

---

Perfect — here’s a **Markdown section** you can drop straight into your existing `README.md`.
It fits naturally **after your current "Next Steps" or "Future Work" section**, written in the same clean format.

---

````markdown

## 🧭 Future Work & Developer Hints

Below are practical hints for extending **NotiFlux** beyond the current hardcoded setup.  
Each feature builds naturally on your existing Redux + Tailwind foundation.

---

### 🔁 Mark as Unread
- Extend the reducer to **toggle** the `read` flag instead of only marking as read.
- Update the UI button to display “Mark as Unread” when a notification is already read.
- Keep both `markAsRead` and `toggleRead` actions for flexibility.

---

### 📩 Mark All as Read
- Add a header button labeled **“Mark All Read”**.
- New reducer: `markAllRead(state)` → loops through all notifications and sets `read = true`.
- Disable the button when all notifications are already read (use Tailwind `opacity-50 cursor-not-allowed`).

---

### ➕ Add Notification
- Add a small input + button to create new notifications.
- Reducer: `addNotification({ id, text, read: false })`.
- Generate IDs with `crypto.randomUUID()` or `nanoid()`.
- Optionally show a toast (“Notification added!”) using shadcn/ui.

---

### ❌ Remove Notification
- Add a ❌ delete icon/button next to each notification.
- Reducer: `removeNotification(id)` → filters it out.
- Optional: confirm deletion via modal or toast.

---

### 🔄 Load More / Pagination
- Simulate pagination locally first:
  - Track `visibleCount` in component state.
  - Render `notifications.slice(0, visibleCount)`.
  - “Load More” button increases the count by +5.
- Later, fetch from an API and replace with real pagination.

---

### 🧠 Filters (All / Read / Unread)
- Add simple filter buttons or tabs in the UI.
- Filter locally in component:
  ```js
  notifications.filter(n => 
    filter === "all" ? true : filter === "read" ? n.read : !n.read
  )
````

* Memoize with `createSelector` later for performance.

---

### 🕓 Sorting

* Add a `createdAt` timestamp when adding a notification.
* Allow sorting by **Newest First / Oldest First**.
* Add a dropdown or toggle in the header.

---

### 💾 Persistence (LocalStorage)

* Use `store.subscribe()` to save notifications to `localStorage`.
* Load from storage in `initialState` if data exists.
* Example key: `"notiflux_notifications"`.

---

### 🌐 API Integration (Optional)

If you want to move beyond hardcoded data:

* Use **RTK Query** to fetch notifications from a mock or real API.
* Define endpoints like:

  * `getNotifications`
  * `markNotificationRead`
  * `addNotification`
* Handle loading, error, and refetch states.

> 🧩 You can easily mock an API using [JSON Server](https://github.com/typicode/json-server) or [MockAPI.io](https://mockapi.io/).

---

### 🎨 UI / UX Enhancements

* Add **animations** with Tailwind (`transition-all`, `duration-300`).
* Support **Dark Mode** via Tailwind theme toggle.
* Add **Toast feedback** (e.g., “Marked as read”) with shadcn/ui.
* Use **Skeleton loaders** while data loads.
* Group notifications by date or type (e.g., “Today”, “Earlier”).

---

### ♿ Accessibility Improvements

* Announce changes to unread count using `aria-live="polite"`.
* Add `aria-pressed` for toggle buttons.
* Use `role="status"` for unread badge.
* Ensure visible focus outlines (`focus-visible:ring` utilities).

---

### 🧹 Structural & Code Refactors

* Move logic into `src/features/notifications/` (feature folder pattern).
* Create subcomponents:

  * `NotificationItem.tsx`
  * `NotificationBell.tsx`
* Consider `createEntityAdapter` for normalized Redux state when scaling.
* Add unit tests for reducers and selectors.

---

### 🚀 Optional: Mock API Integration

If you’re ready to test with a fake backend:

1. Install [JSON Server](https://github.com/typicode/json-server):

   ```bash
   npm install -g json-server
   ```
2. Create a `db.json` file:

   ```json
   {
     "notifications": [
       { "id": "1", "text": "API Notification 1", "read": false },
       { "id": "2", "text": "API Notification 2", "read": true }
     ]
   }
   ```
3. Run:

   ```bash
   json-server --watch db.json --port 4000
   ```
4. Fetch from `http://localhost:4000/notifications` using `fetch` or RTK Query.

```
````markdown
## 🌐 Mock API Integration — Examples (RTK Query & Fetch)

This section shows two ways to connect **NotiFlux** to a mock backend:
1) **RTK Query** (recommended)  
2) **Plain `fetch`** (quick and minimal)

You can use either approach. Both work with a local **JSON Server**.

---

### 📦 Spin up a Mock API (JSON Server)

1. Install JSON Server:
   ```bash
   npm install -g json-server
````

2. Create a `db.json` file at the project root:

   ```json
   {
     "notifications": [
       { "id": "1", "text": "API Notification 1", "read": false },
       { "id": "2", "text": "API Notification 2", "read": true }
     ]
   }
   ```
3. Run the server:

   ```bash
   json-server --watch db.json --port 4000
   ```
4. Endpoints will be available at:

   * `GET    http://localhost:4000/notifications`
   * `POST   http://localhost:4000/notifications`
   * `PATCH  http://localhost:4000/notifications/:id`
   * `DELETE http://localhost:4000/notifications/:id`

> ℹ️ If you run into CORS issues, ensure the app and JSON Server are on compatible ports or use a proxy.

---

## ✅ Option A — RTK Query (Recommended)

RTK Query handles caching, loading states, and invalidation for you.

### 1) Add an API slice

**`src/store/notificationsApi.ts`**

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { NotificationItem } from '@/types';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Notifications'],
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationItem[], void>({
      query: () => '/notifications',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Notifications' as const, id })),
              { type: 'Notifications', id: 'LIST' },
            ]
          : [{ type: 'Notifications', id: 'LIST' }],
    }),
    addNotification: builder.mutation<NotificationItem, Pick<NotificationItem, 'text'>>({
      query: (body) => ({
        url: '/notifications',
        method: 'POST',
        body: { ...body, read: false, id: crypto.randomUUID?.() ?? String(Date.now()) },
      }),
      invalidatesTags: [{ type: 'Notifications', id: 'LIST' }],
    }),
    markNotificationRead: builder.mutation<NotificationItem, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
        body: { read: true },
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Notifications', id },
        { type: 'Notifications', id: 'LIST' },
      ],
    }),
    toggleNotificationRead: builder.mutation<NotificationItem, { id: string; read: boolean }>({
      query: ({ id, read }) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
        body: { read },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Notifications', id },
        { type: 'Notifications', id: 'LIST' },
      ],
    }),
    removeNotification: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Notifications', id },
        { type: 'Notifications', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useAddNotificationMutation,
  useMarkNotificationReadMutation,
  useToggleNotificationReadMutation,
  useRemoveNotificationMutation,
} = notificationsApi;
```

### 2) Register the API slice in the store

**`src/store/store.ts`** (add the reducer + middleware)

```ts
import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from './notificationsSlice';
import { notificationsApi } from './notificationsApi';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(notificationsApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
```

### 3) Use in components

**Read + loading states**

```tsx
import { useGetNotificationsQuery } from '@/store/notificationsApi';

function Notifications() {
  const { data: items, isLoading, isError } = useGetNotificationsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError)   return <div>Failed to load notifications.</div>;

  return (
    <ul>
      {items?.map(n => <li key={n.id}>{n.text}</li>)}
    </ul>
  );
}
```

**Mutations**

```tsx
import {
  useAddNotificationMutation,
  useMarkNotificationReadMutation,
  useRemoveNotificationMutation,
} from '@/store/notificationsApi';

function ActionsExample() {
  const [addNotification] = useAddNotificationMutation();
  const [markRead] = useMarkNotificationReadMutation();
  const [removeNotification] = useRemoveNotificationMutation();

  return (
    <div className="flex gap-2">
      <button onClick={() => addNotification({ text: 'New API notification' })}>
        Add
      </button>
      <button onClick={() => markRead('1')}>
        Mark #1 Read
      </button>
      <button onClick={() => removeNotification('2')}>
        Remove #2
      </button>
    </div>
  );
}
```

> 💡 **Optimistic updates**: RTK Query supports them via `onQueryStarted` if you want instant UI updates before the server responds.

---

## 🟡 Option B — Plain `fetch` (Minimal)

This approach keeps your current slice and adds **one small reducer** to load server data.

### 1) Add a `setNotifications` reducer (one-liner)

**`src/store/notificationsSlice.ts`** — add this to `reducers`

```ts
setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
  state.notificationsList = action.payload;
},
```

Export it:

```ts
export const { markAsRead, setNotifications } = notificationsSlice.actions;
```

### 2) Fetch in a component and hydrate Redux

```tsx
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setNotifications } from '@/store/notificationsSlice';

function BootstrapNotifications() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelled = false;

    fetch('http://localhost:4000/notifications')
      .then(res => res.json())
      .then((data) => {
        if (!cancelled) {
          dispatch(setNotifications(data));
        }
      })
      .catch(() => {
        // handle error (toast/log)
      });

    return () => { cancelled = true; };
  }, [dispatch]);

  return null; // just bootstraps data on mount
}
```

Mount it once (e.g., in `App.tsx`):

```tsx
function App() {
  return (
    <>
      <BootstrapNotifications />
      <Header />
      <Notifications />
    </>
  );
}
```

### 3) Update actions to use the API (optional)

* **Mark as read** (server): call `fetch(PATCH ...)` then dispatch `markAsRead(id)` on success.
* **Add notification**: `fetch(POST ...)` then `setNotifications([...list, created])`.
* **Remove notification**: `fetch(DELETE ...)` then filter from state.

> Tip: Wrap these in small helpers or custom hooks (e.g., `useNotificationsApi()`) to keep components clean.

---

## 🔍 Choosing Between A & B

* **RTK Query**: best for real APIs; handles caching, invalidation, and loading states with very little code.
* **Plain fetch**: keep it minimal now; easy to migrate to RTK Query later.

---

```
```
