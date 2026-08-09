# Currency Pros — Smart Money Concepts Indicator

A TradingView Pine Script v5 indicator for currency-pair chart analysis. Plots:

- **Market structure** — automatic BOS (break of structure) and CHoCH (change of character) labels from swing-based higher-high/lower-low detection.
- **Order blocks** — the last opposing candle before an impulsive move that broke structure; boxes gray out once mitigated (price trades back through them).
- **Fair value gaps (imbalance)** — classic 3-candle FVGs, filtered by a minimum size (× ATR14) to skip noise; boxes fade once filled.
- **Liquidity sweeps** — wicks that run past a prior swing high/low and close back on the other side (stop hunts), marked with a "Sweep" label.
- **Equal highs / equal lows** — clusters of swing points within a tolerance %, connected with a line and labeled EQH/EQL.
- **Fibonacci retracement** — auto-drawn on the impulse leg behind each new BOS/CHoCH, with the **0.71–0.75 zone highlighted** as the entry/"sniper" zone.
- **Volume profile** — a right-side horizontal histogram over a rolling lookback window, with the POC (point of control) row/line highlighted.

## Install

1. Open TradingView → any chart → **Pine Editor** (bottom panel).
2. Create a new blank indicator, delete the boilerplate.
3. Paste the contents of [`currency_pros_smc.pine`](./currency_pros_smc.pine).
4. Click **Add to chart**.

## Settings

All features can be toggled independently from the indicator's settings panel, grouped as:
Market Structure, Order Blocks, Fair Value Gaps, Liquidity Sweeps, Equal Highs/Lows, Fibonacci Retracement, and Volume Profile. Key tunables:

- `Swing Length` — sensitivity of the structure/pivot detection (lower = more signals).
- `OB Search Range` — how far back to look for the opposing candle that forms an order block.
- `Min Gap Size (x ATR14)` — filters out insignificant FVGs.
- `Tolerance (% of price)` — how close two swing points must be to count as equal highs/lows.
- Volume profile `Lookback Bars` / `Number of Rows` — resolution of the histogram (recomputed on the last bar only, for performance).

## Notes

- Works on any symbol/timeframe TradingView supports, including forex pairs.
- The volume profile uses each bar's midpoint price weighted by that bar's reported volume; for FX symbols without real volume, TradingView substitutes tick volume, which is a reasonable proxy but not true traded volume.
- Alerts are wired for bullish/bearish BOS/CHoCH — set them up via TradingView's Alert dialog referencing "Currency Pros - Smart Money Concepts".
