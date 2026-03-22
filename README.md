# 🚐 Expedice — Camper Trip Planner

Plánovač road tripů v obytném autě. Funguje jako PWA (Progressive Web App) — lze přidat na plochu telefonu.

## Funkce
- AI generování itineráře (Claude API)
- Interaktivní mapa s reálnou trasou (Leaflet + OSRM)
- Budget s evidencí skutečných nákladů
- Checklist přípravy
- Fotky z etap + expediční kniha (HTML export)
- Stavy výprav: Plánovaný / Probíhající / Archivovaný
- AI chat průvodce výpravou

## Technologie
- Vanilla JS, žádný framework
- Leaflet.js 1.9.4 + OpenStreetMap
- OSRM pro výpočet reálných vzdáleností
- Anthropic Claude API (streaming SSE)
- localStorage pro persistenci dat
- Service Worker (PWA offline)

## Verze
- v6.6 — aktuální stabilní verze
