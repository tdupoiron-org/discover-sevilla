# Color System Update - AXA Brand Guidelines

## Overview / Descripción general

This document details the color system changes made to align the Discover Sevilla application with AXA's corporate brand guidelines.

Este documento detalla los cambios en el sistema de colores realizados para alinear la aplicación Discover Sevilla con las directrices de marca corporativa de AXA.

## Changes Summary / Resumen de cambios

### Before: Mediterranean Terracotta Theme
**Theme:** Warm, Spanish-inspired colors evoking Sevilla's architecture
- Primary: Rich Terracotta `oklch(0.62 0.15 35)` 🟤
- Accent: Vibrant Amber `oklch(0.75 0.18 60)` 🟠
- Background: Warm Cream `oklch(0.96 0.02 85)` 🟡

### After: AXA Professional Blue & White
**Theme:** Clean, professional, trustworthy corporate identity
- Primary: AXA Professional Blue `oklch(0.45 0.15 250)` 🔵
- Accent: Bright Blue `oklch(0.55 0.18 240)` 🔵
- Background: Clean White with subtle blue tint `oklch(0.98 0.005 240)` ⚪

## Detailed Color Changes / Cambios detallados de color

### Light Theme / Tema claro

| Element | Before (Terracotta) | After (AXA Blue) |
|---------|---------------------|------------------|
| **Primary** | `oklch(0.62 0.15 35)` | `oklch(0.45 0.15 250)` |
| **Primary Foreground** | `oklch(0.99 0 0)` | `oklch(1 0 0)` |
| **Accent** | `oklch(0.75 0.18 60)` | `oklch(0.55 0.18 240)` |
| **Accent Foreground** | `oklch(0.15 0 0)` | `oklch(1 0 0)` |
| **Background** | `oklch(0.96 0.02 85)` | `oklch(0.98 0.005 240)` |
| **Foreground** | `oklch(0.25 0.01 35)` | `oklch(0.25 0.02 240)` |
| **Secondary** | `oklch(0.90 0.05 35)` | `oklch(0.92 0.02 240)` |
| **Muted** | `oklch(0.92 0.02 85)` | `oklch(0.95 0.01 240)` |
| **Border** | `oklch(0.88 0.02 85)` | `oklch(0.90 0.01 240)` |
| **Ring (Focus)** | `oklch(0.62 0.15 35)` | `oklch(0.45 0.15 250)` |

### Dark Theme / Tema oscuro

| Element | Before (Grayscale) | After (Blue-tinted) |
|---------|-------------------|---------------------|
| **Background** | `oklch(0.145 0 0)` | `oklch(0.15 0.02 240)` |
| **Primary** | `oklch(0.922 0 0)` | `oklch(0.60 0.15 250)` |
| **Accent** | `oklch(0.269 0 0)` | `oklch(0.55 0.18 240)` |
| **Card** | `oklch(0.205 0 0)` | `oklch(0.20 0.02 240)` |

## AXA Brand Compliance / Cumplimiento de marca AXA

✅ **Primary colors**: Blue and white
✅ **Design philosophy**: Professional, clean, and minimalist
✅ **Visual consistency**: All UI elements use AXA brand colors
✅ **Accessibility**: WCAG contrast ratios maintained
✅ **Dark mode**: Adapted to blue-tinted dark theme

## Files Modified / Archivos modificados

- `src/index.css` - Main color variable definitions
- `src/main.css` - Root and dark theme color definitions
- `PRD.md` - Updated color documentation

## Technical Details / Detalles técnicos

### Color Space
All colors are defined using the OKLCH color space, which provides:
- Perceptual uniformity
- Better interpolation
- Wide gamut support
- Predictable lightness

### Implementation
Colors are defined as CSS custom properties (variables) in `:root` for light theme and `.dark` for dark theme, allowing consistent application across all components.

Los colores se definen como propiedades personalizadas de CSS (variables) en `:root` para el tema claro y `.dark` para el tema oscuro, lo que permite una aplicación consistente en todos los componentes.

## Visual Impact / Impacto visual

### UI Elements Affected:
- **Navigation buttons**: Now use AXA blue instead of terracotta
- **Interactive elements**: Bright blue accents replace amber
- **Background**: Clean white replaces warm cream
- **Cards**: Pure white with blue-gray borders
- **Focus states**: Blue ring instead of terracotta
- **Progress indicators**: Blue theme
- **Badges**: Adapted to blue color scheme

### User Experience:
- More professional appearance aligned with corporate event context
- Increased trust signals through AXA brand colors
- Maintained excellent readability and contrast
- Consistent brand experience throughout application

---

**Date / Fecha**: 2025-11-06
**Version**: 1.0
**Status / Estado**: ✅ Completed / Completado
