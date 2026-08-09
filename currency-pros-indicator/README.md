# Currency Pros — Smart Money Concepts Indicator

A TradingView Pine Script v6 indicator for currency-pair chart analysis. Plots:

- **Market structure** — automatic BOS (break of structure) and CHoCH (change of character) labels from swing-based higher-high/lower-low detection.
- **Liquidity sweeps** — wicks that run past a prior swing high/low and close back on the other side (stop hunts), marked with an "LQ" label.
- **Equal highs / equal lows** — clusters of swing points within a tolerance %, connected with a line and labeled EQH/EQL.
- **Fibonacci retracement** — auto-drawn from the structure of a separate, configurable **Fibonacci Timeframe** (default 15m) regardless of what timeframe the chart itself is on, with the **0.71–0.75 zone highlighted** as the entry/"sniper" zone. Colors for the zone, the level lines, and the level labels are all configurable.
- **Volume profile** — a right-side horizontal histogram over a rolling lookback window, with the POC (point of control) row/line highlighted.
- **Checklist dashboard** — an on-chart, fully recolorable table (title, current timeframe, bias) plus a 3-item confluence checklist (HTF Alignment, Break of Structure, Liquidity Sweep) and a computed **Trade Score** (% of checklist items currently satisfied).

## Install

1. Open TradingView → any chart → **Pine Editor** (bottom panel).
2. Create a new blank indicator, delete the boilerplate.
3. Paste the contents of [`currency_pros_smc.pine`](./currency_pros_smc.pine).
4. Click **Add to chart**.

## Settings

All features can be toggled independently from the indicator's settings panel, grouped as:
Market Structure, Liquidity Sweeps, Equal Highs/Lows, Fibonacci Retracement, Volume Profile, and Checklist Dashboard. Key tunables:

- `Swing Length` — sensitivity of the structure/pivot detection (lower = more signals).
- `Tolerance (% of price)` — how close two swing points must be to count as equal highs/lows.
- `Fibonacci Timeframe` — the timeframe whose swing structure drives the auto fib (default `15`, i.e. 15 minutes), independent of the chart's own timeframe.
- Volume profile `Lookback Bars` / `Number of Rows` — resolution of the histogram (recomputed on the last bar only, for performance).
- `Higher Timeframe (HTF Alignment)` — the timeframe checked against the current chart's bias for the dashboard's HTF Alignment row (default Daily).
- `Checklist Recency (bars)` — how many bars back a Liquidity Sweep must have occurred (in the direction of the current bias) to still count as satisfied.
- `Dashboard Position` — corner the checklist table is drawn in.
- Dashboard `Header Background` / `Text Color` / `Label Color` / `Checklist Pass Color` / `Checklist Fail Color` / `Trade Score Color` — full color control over the table.

### Checklist Dashboard

Once a BOS/CHoCH establishes a bias (BUY/SELL), the dashboard scores three confluences:

1. **HTF Alignment** — the higher timeframe's own structure bias matches the current chart's bias.
2. **Break of Structure** — a directional bias is currently established.
3. **Liquidity Sweep** — a sweep in the bias direction happened within the recency window.

`Trade Score` = (checks passed ÷ 3) × 100.

## Notes

- Works on any symbol/timeframe TradingView supports, including forex pairs.
- The volume profile uses each bar's midpoint price weighted by that bar's reported volume; for FX symbols without real volume, TradingView substitutes tick volume, which is a reasonable proxy but not true traded volume.
- The HTF Alignment check, and the Fibonacci Timeframe fib, both use `request.security` and can shift slightly until the underlying higher/lower-timeframe bar closes — normal behavior for any multi-timeframe confluence check, not a bug.
- The fib box/lines are anchored at the current chart's bar when a new Fibonacci-Timeframe leg is detected (a lower-timeframe bar index can't be mapped exactly onto the chart's own bar series), so they read as a forward-projected zone rather than a historical overlay spanning the original leg.
- Alerts are wired for bullish/bearish BOS/CHoCH — set them up via TradingView's Alert dialog referencing "Currency Pros - Smart Money Concepts".
