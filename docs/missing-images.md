# Missing Images — placeholder usage

All 28 reworked products (ups / inverter / solar / accessories) currently use:

`/images/products/placeholder.svg`

## Why placeholders?

Direct downloads from official brand pages were attempted and are not allowed / fail:

- `se.com` product pages return **403 Forbidden** for direct fetch (tested BX600C-IN).
- `zebronics.com` returns **429 Too Many Requests** for automated fetch (tested ZEB-U725).
- `luminousindia.com` pages render as HTML app shells; product photos are JS-loaded CDN assets without a redistributable license.
- Brand product photos are copyrighted; hotlinking them into `public/` without permission would violate terms.

Per the task, the navy (`#0B1D3A`) + gold (`#F5C518`) placeholder at
`public/images/products/placeholder.svg` is used instead.

## Products using the placeholder (28/28)

### ups (7)
- ups-001 — APC Back-UPS BX600C-IN 600VA
- ups-002 — APC Back-UPS BX1100C-IN 1100VA
- ups-003 — Luminous LB600 Pro 600VA UPS
- ups-004 — Microtek Legend 650 650VA UPS
- ups-005 — V-Guard Sesto 600 600VA UPS
- ups-006 — Zebronics ZEB-U725 600VA UPS
- ups-007 — Numeric Digital 600 EX-V 600VA UPS

### inverter (7)
- inv-001 — Luminous Zelio+ 1100 900VA Pure Sine Wave Inverter
- inv-002 — Luminous Optimus 1250 1100VA Pure Sine Wave Inverter
- inv-003 — Microtek UPS SEBz 1100 1100VA Pure Sine Wave UPS
- inv-004 — V-Guard Prime 1150 1000VA Pure Sine Wave Inverter
- inv-005 — Exide Inverterz GQP 1050VA Pure Sine Wave Inverter
- inv-006 — Luminous Power Sine M 1100 900VA Pure Sine Wave Inverter
- inv-007 — Microtek Super Power New 1100 950VA Pure Sine Wave Inverter

### solar (7)
- sol-001 — Tata Power Solar TP540HG10B 550W Mono PERC Bifacial Panel
- sol-002 — Luminous LUM 24550M 550W Mono PERC Half-Cut DCR Panel
- sol-003 — Loom Solar Shark 575W N-Type TOPCon Bifacial Panel
- sol-004 — Luminous Solar Inverter NXG 1450e 1100VA / 12V
- sol-005 — UTL Gamma+ 1kVA / 12V rMPPT Solar PCU
- sol-006 — Exide SolarTubular 6L150 150Ah Solar Battery
- sol-007 — Luminous NXG PRO 1kVA / 12V Solar Combo (Inverter + Panels)

### accessories (7)
- acc-001 — Exide InvaTubular IT500 150Ah Tall Tubular Battery
- acc-002 — Luminous Inverlast ILTTEX150 150Ah Tall Tubular Battery
- acc-003 — V-Guard VGSD 100 Refrigerator Stabilizer (1000VA)
- acc-004 — Aulten 5KVA Mainline Voltage Stabilizer (90–300V)
- acc-005 — Belkin Economy 6-Socket Surge Protector (420J, 2m)
- acc-006 — V-Guard Inverter Battery Trolley with Wheels
- acc-007 — APC Replacement Battery Cartridge APCRBC110

Batteries (`bat-001`–`bat-006`) and refurbished (`ref-001`–`ref-006`) keep their existing Unsplash images and are not listed here.

Total placeholders: **28**.
Downloaded product JPGs in `public/images/products/<category>/`: **0**.
