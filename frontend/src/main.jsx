import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// {
//   "name": "frontend",
//   "private": true,
//   "version": "0.0.0",
//   "type": "module",
//   "scripts": {
//     "dev": "vite",
//     "build": "vite build",
//     "lint": "eslint .",
//     "preview": "vite preview"
//   },
//   "dependencies": {
//     "axios": "^1.7.9",
//     "dayjs": "^1.11.13",
//     "js-cookie": "^3.0.5",
//     "jwt-decode": "^4.0.0",
//     "react": "^18.3.1",
//     "react-dom": "^18.3.1",
//     "react-router-dom": "^7.1.1",
//     "simple-zustand-devtools": "^1.1.0",
//     "zustand": "^5.0.2"
//   },
//   "devDependencies": {
//     "@eslint/js": "^9.17.0",
//     "@types/react": "^18.3.18",
//     "@types/react-dom": "^18.3.5",
//     "@vitejs/plugin-react": "^4.3.4",
//     "eslint": "^9.17.0",
//     "eslint-plugin-react": "^7.37.2",
//     "eslint-plugin-react-hooks": "^5.0.0",
//     "eslint-plugin-react-refresh": "^0.4.16",
//     "globals": "^15.14.0",
//     "vite": "^6.0.5"
//   }
// }
