# Currency Pros — Smart Money Concepts Indicator

A TradingView Pine Script v6 indicator for currency-pair chart analysis. Plots:

- **Market structure** — automatic BOS (break of structure) and CHoCH (change of character) labels from swing-based higher-high/lower-low detection.
- **Order blocks** — the last opposing candle before an impulsive move that broke structure; boxes gray out once mitigated (price trades back through them).
- **Fair value gaps (imbalance)** — classic 3-candle FVGs, filtered by a minimum size (× ATR14) to skip noise; boxes fade once filled.
- **Liquidity sweeps** — wicks that run past a prior swing high/low and close back on the other side (stop hunts), marked with an "LQ" label.
- **Equal highs / equal lows** — clusters of swing points within a tolerance %, connected with a line and labeled EQH/EQL.
- **Fibonacci retracement** — auto-drawn on the impulse leg behind each new BOS/CHoCH, with the **0.71–0.75 zone highlighted** as the entry/"sniper" zone.
- **Volume profile** — a right-side horizontal histogram over a rolling lookback window, with the POC (point of control) row/line highlighted.
- **Discount / Premium zone** — shades whichever half of the active leg (relative to its 50% equilibrium) price currently sits in, and labels it "Discount" or "Premium".
- **Checklist dashboard** — an on-chart table (title, current timeframe, Discount/Premium + bias) plus a 4-item confluence checklist (HTF Alignment, Break of Structure, Liquidity Sweep, Imbalance) and a computed **Trade Score** (% of checklist items currently satisfied).

## Install

1. Open TradingView → any chart → **Pine Editor** (bottom panel).
2. Create a new blank indicator, delete the boilerplate.
3. Paste the contents of [`currency_pros_smc.pine`](./currency_pros_smc.pine).
4. Click **Add to chart**.

## Settings

All features can be toggled independently from the indicator's settings panel, grouped as:
Market Structure, Order Blocks, Fair Value Gaps, Liquidity Sweeps, Equal Highs/Lows, Fibonacci Retracement, Volume Profile, Discount/Premium, and Checklist Dashboard. Key tunables:

- `Swing Length` — sensitivity of the structure/pivot detection (lower = more signals).
- `OB Search Range` — how far back to look for the opposing candle that forms an order block.
- `Min Gap Size (x ATR14)` — filters out insignificant FVGs.
- `Tolerance (% of price)` — how close two swing points must be to count as equal highs/lows.
- Volume profile `Lookback Bars` / `Number of Rows` — resolution of the histogram (recomputed on the last bar only, for performance).
- `Higher Timeframe (HTF Alignment)` — the timeframe checked against the current chart's bias for the dashboard's HTF Alignment row (default Daily).
- `Checklist Recency (bars)` — how many bars back a Liquidity Sweep or Imbalance must have occurred (in the direction of the current bias) to still count as satisfied.
- `Dashboard Position` — corner the checklist table is drawn in.

### Checklist Dashboard

Once a BOS/CHoCH establishes a bias (BUY/SELL), the dashboard scores four confluences:

1. **HTF Alignment** — the higher timeframe's own structure bias matches the current chart's bias.
2. **Break of Structure** — a directional bias is currently established.
3. **Liquidity Sweep** — a sweep in the bias direction happened within the recency window.
4. **Imbalance** — an FVG in the bias direction formed within the recency window.

`Trade Score` = (checks passed ÷ 4) × 100.

## Notes

- Works on any symbol/timeframe TradingView supports, including forex pairs.
- The volume profile uses each bar's midpoint price weighted by that bar's reported volume; for FX symbols without real volume, TradingView substitutes tick volume, which is a reasonable proxy but not true traded volume.
- The HTF Alignment check uses `request.security` on an unclosed higher-timeframe bar, so it can shift until that HTF bar closes — normal behavior for any HTF confluence check, not a bug.
- Alerts are wired for bullish/bearish BOS/CHoCH — set them up via TradingView's Alert dialog referencing "Currency Pros - Smart Money Concepts".
